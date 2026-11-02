import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const own = path.dirname(fileURLToPath(import.meta.url));
const root = path.dirname(own);
const stage = path.join(own, '.build/source');
const output = path.join(own, '.build/public');
const sha = bytes => createHash('sha256').update(bytes).digest('hex');
const sources = [];
async function copy(relative) {
  if (relative.split(/[\\/]/).some(x => x.startsWith('.'))) return;
  const src = path.join(root, relative);
  const stat = await fs.lstat(src);
  if (stat.isSymbolicLink()) throw new Error(`Source symlink rejected: ${relative}`);
  if (stat.isDirectory()) {
    for (const entry of await fs.readdir(src)) await copy(path.join(relative, entry));
    return;
  }
  const bytes = await fs.readFile(src);
  const dst = path.join(stage, relative);
  await fs.mkdir(path.dirname(dst), { recursive: true });
  await fs.writeFile(dst, bytes);
  sources.push({ path: relative.replaceAll('\\', '/'), bytes: bytes.length, sha256: sha(bytes) });
}
for (const entry of await fs.readdir(root, { withFileTypes: true })) {
  if (entry.isFile() && (/\.(tsx?|html|css)$/.test(entry.name) || ['package.json', 'package-lock.json', 'tsconfig.json', 'tailwind.config.js', 'postcss.config.js'].includes(entry.name))) await copy(entry.name);
}
for (const dir of ['components', 'services', 'public']) await copy(dir);
if (process.argv.includes('--prepare')) {
  console.log('Current source staged; install locked dependencies under cloudflare/.build/source.');
  process.exit(0);
}
const config = await fs.readFile(path.join(stage, 'vite.config.ts'), 'utf8');
if (/JSON\.stringify\(\s*env\./.test(config) || config.includes('loadEnv(')) throw new Error('Credential injection must be absent from this public build');
const taskTmp = path.join(own, '.build/tmp');
await fs.mkdir(taskTmp, { recursive: true });
const build = spawnSync(process.execPath, [path.join(stage, 'node_modules/vite/bin/vite.js'), 'build', stage, '--config', path.join(stage, 'vite.config.ts'), '--outDir', output, '--emptyOutDir', 'false'], {
  cwd: stage, stdio: 'inherit', env: { ...process.env, TMP: taskTmp, TEMP: taskTmp },
});
if (build.status !== 0) throw new Error(`Vite build failed: ${build.status}`);
await fs.writeFile(path.join(output, '_headers'), '/*\n  X-Content-Type-Options: nosniff\n  X-Frame-Options: DENY\n/assets/*\n  Cache-Control: public, max-age=31536000, immutable\n/*.webp\n  Cache-Control: public, max-age=31536000, immutable\n');
const files = [];
async function inspect(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) await inspect(file);
    else {
      const bytes = await fs.readFile(file);
      const relative = path.relative(output, file).replaceAll('\\', '/');
      if (relative.startsWith('api/') || relative.split('/').some(part => part.startsWith('.')) || /\.(ts|tsx|map|env)$/.test(relative)) throw new Error(`Nonpublic output rejected: ${relative}`);
      if (/AIza[A-Za-z0-9_-]{30,}/.test(bytes.toString('utf8'))) throw new Error(`Google credential found in public output: ${relative}`);
      files.push({ path: relative, bytes: bytes.length, sha256: sha(bytes) });
    }
  }
}
await inspect(output);
const html = await fs.readFile(path.join(output, 'index.html'), 'utf8');
const entry = html.match(/<script\b[^>]*\bsrc="(\/assets\/[^\"]+)"/);
if (!entry || !entry[1].startsWith('/assets/')) throw new Error('Compiled browser entry is missing');
await fs.access(path.join(output, entry[1]));
const proof = { builtAt: new Date().toISOString(), project: 'nadaun-collective', currentSource: true, sourceFiles: sources, publicFiles: files, publicBytes: files.reduce((n, x) => n + x.bytes, 0), privateCredentialMatches: 0, geminiCredentialInjection: false, originalNoKeyFallbackRetained: true, deployed: false };
await fs.writeFile(path.join(own, 'preparation-proof.json'), JSON.stringify(proof, null, 2));
console.log(JSON.stringify({ project: proof.project, publicFiles: files.length, publicBytes: proof.publicBytes, privateCredentialMatches: 0, deployed: false }));
