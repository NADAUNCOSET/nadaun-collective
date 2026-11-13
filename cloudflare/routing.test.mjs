import test from 'node:test';
import assert from 'node:assert/strict';
import worker, { publicAdsResponse } from './worker.mjs';
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
    // Static Assets normalizes /index.html to /; fetching / internally avoids
    // redirecting the visitor away from their original application route.
    if (path === '/index.html') return new Response(null, { status: 307, headers: { Location: '/' } });
    return new Response(path === '/' ? 'current SPA' : 'missing', { status: path === '/' ? 200 : 404 });
  } } };
  const response = await worker.fetch(new Request('https://example.test/about'), env);
  assert.equal(response.status, 200);
  assert.equal(await response.text(), 'current SPA');
  assert.deepEqual(visited, ['/about', '/']);
  assert.equal((await worker.fetch(new Request('https://example.test/missing.js'), env)).status, 404);
});

test('approved public hosts receive one async loader and account meta without changing content', async () => {
  const original = '<html><head><title>Approved</title></head><body><main>Original motion and media</main></body></html>';
  for (const host of ['collective.nadaun.co', 'nadaun.co']) for (const path of ['/', '/index.html', '/services-guide', '/services-guide.html']) {
    const response = await publicAdsResponse(new Response(original, { headers: { 'Content-Type': 'text/html', 'ETag': 'old' } }), new Request('https://' + host + path));
    const html = await response.text();
    assert.equal((html.match(/pagead\/js\/adsbygoogle\.js/g) || []).length, 1);
    assert.equal((html.match(/name="google-adsense-account"/g) || []).length, 1);
    assert.match(html, /<script async src="https:\/\/pagead2\.googlesyndication\.com/);
    assert.match(html, /<main>Original motion and media<\/main>/);
    assert.equal(response.status, 200); assert.equal(response.headers.get('ETag'), null);
  }
});
test('unapproved hosts, sensitive paths, redirects and assets remain byte-identical', async () => {
  const original = '<html><head></head><body>Unchanged</body></html>';
  for (const url of ['https://collective.nadaun.co/login', 'https://collective.nadaun.co/account', 'https://collective.nadaun.co/checkout', 'https://collective.nadaun.co/about', 'https://unapproved.invalid/']) {
    const response = await publicAdsResponse(new Response(original, { headers: { 'Content-Type': 'text/html' } }), new Request(url));
    assert.equal(await response.text(), original);
  }
  for (const [status,type] of [[404,'text/html'],[200,'application/json']]) {
    const response = await publicAdsResponse(new Response(original,{status,headers:{'Content-Type':type}}),new Request('https://collective.nadaun.co/'));
    assert.equal(await response.text(),original);assert.equal(response.status,status);
  }
});
test('existing valid AdSense tags are never duplicated', async () => {
  const once = await publicAdsResponse(new Response('<html><head></head><body>content</body></html>', { headers: { 'Content-Type': 'text/html' } }), new Request('https://collective.nadaun.co/'));
  const html = await once.text();
  const twice = await publicAdsResponse(new Response(html, { headers: { 'Content-Type': 'text/html' } }), new Request('https://collective.nadaun.co/'));
  assert.equal(await twice.text(),html);
});
