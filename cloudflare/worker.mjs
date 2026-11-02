const manifests = {
  '/livernovo-videos.json': 'https://media.nadaun.co/website/video-manifest.json',
  '/video-portfolio.json': 'https://media.nadaun.co/video/manifest.json',
};
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
    return new Response(response.body, { status: response.status, headers });
  },
};
