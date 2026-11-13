const manifests = {
  '/livernovo-videos.json': 'https://media.nadaun.co/website/video-manifest.json',
  '/video-portfolio.json': 'https://media.nadaun.co/video/manifest.json',
};
// Only these approved public hosts and content URLs receive third-party ads.
const adsenseHosts = new Set(['collective.nadaun.co', 'nadaun.co']);
const adsensePaths = new Set(['/', '/index.html', '/services-guide', '/services-guide.html']);
const adsenseMeta = '<meta name="google-adsense-account" content="ca-pub-9416492869063856">';
const adsenseLoader = '<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9416492869063856" crossorigin="anonymous"></script>';
export async function publicAdsResponse(response, request) {
  const url = new URL(request.url);
  if (request.method !== 'GET' || !adsenseHosts.has(url.hostname) || !adsensePaths.has(url.pathname) || response.status !== 200 || !/^text\/html(?:;|$)/i.test(response.headers.get('Content-Type') || '')) return response;
  const original = await response.text();
  let insertion = '';
  if (!/<meta\b[^>]*\bname\s*=\s*["']google-adsense-account["']/i.test(original)) insertion += adsenseMeta + '\n';
  if (!/<script\b[^>]*\bsrc\s*=\s*["'][^"']*pagead\/js\/adsbygoogle\.js(?:[?"'])/i.test(original)) insertion += adsenseLoader + '\n';
  const html = insertion ? original.replace(/<\/head\s*>/i, insertion + '</head>') : original;
  const headers = new Headers(response.headers);
  // Materialized UTF-8 text must not retain a compressed-body transport header.
  headers.delete('Content-Encoding');
  if (html !== original) {
    headers.delete('Content-Length');
    headers.delete('ETag');
    headers.delete('Content-MD5');
  }
  return new Response(html, { status: response.status, statusText: response.statusText, headers });
}
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (!['GET', 'HEAD'].includes(request.method)) return new Response('Method not allowed', { status: 405 });
    if (url.pathname.startsWith('/api/') || url.pathname.split('/').some(part => part.startsWith('.'))) return new Response('Not found', { status: 404 });
    let response;
    if (manifests[url.pathname]) {
      response = await fetch(manifests[url.pathname], { method: request.method, headers: { Accept: 'application/json' } });
    } else {
      response = await env.ASSETS.fetch(request);
      if (response.status === 404 && !url.pathname.split('/').at(-1).includes('.')) {
        response = await env.ASSETS.fetch(new Request(new URL('/', url), request));
      }
    }
    const headers = new Headers(response.headers);
    headers.set('X-Content-Type-Options', 'nosniff');
    headers.set('X-Frame-Options', 'DENY');
    if (url.pathname.startsWith('/assets/') || url.pathname.endsWith('.webp')) headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    return publicAdsResponse(new Response(response.body, { status: response.status, headers }), request);
  },
};
