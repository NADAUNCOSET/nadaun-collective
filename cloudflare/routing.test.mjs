import test from 'node:test';
import assert from 'node:assert/strict';
import worker from './worker.mjs';
test('private implementation paths and API routes are never SPA fallback', async () => {
  const env = { ASSETS: { fetch() { assert.fail('assets requested'); } } };
  for (const path of ['/.env', '/.git/config', '/api/unknown']) assert.equal((await worker.fetch(new Request(`https://example.test${path}`), env)).status, 404);
});
test('write requests are refused by the public portfolio', async () => {
  assert.equal((await worker.fetch(new Request('https://example.test/', { method: 'POST' }), {})).status, 405);
});
test('compiled assets retain public cache and security headers', async () => {
  const response = await worker.fetch(new Request('https://example.test/assets/app.js'), { ASSETS: { fetch: async () => new Response('public') } });
  assert.equal(await response.text(), 'public');
  assert.equal(response.headers.get('x-frame-options'), 'DENY');
  assert.equal(response.headers.get('cache-control'), 'public, max-age=31536000, immutable');
});
test('extensionless application navigation falls back to compiled index, missing files stay 404', async () => {
  const visited = [];
  const env = { ASSETS: { fetch: async request => {
    const path = new URL(request.url).pathname;
    visited.push(path);
    return new Response(path === '/index.html' ? 'current SPA' : 'missing', { status: path === '/index.html' ? 200 : 404 });
  } } };
  assert.equal(await (await worker.fetch(new Request('https://example.test/about'), env)).text(), 'current SPA');
  assert.deepEqual(visited, ['/about', '/index.html']);
  assert.equal((await worker.fetch(new Request('https://example.test/missing.js'), env)).status, 404);
});
