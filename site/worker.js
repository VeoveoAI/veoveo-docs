// Serves the published docs under /docs/ on the installation's host. Cloudflare routes
// only {host}/docs/* here; every other path goes through the installation's tunnel.
const SOURCE = 'https://github.com/VeoveoAI/veoveo-docs/blob/main';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;
    if (path === '/docs' || path === '/docs/') {
      return Response.redirect(new URL('/docs/architecture/', url).toString(), 302);
    }
    if (!path.startsWith('/docs/')) {
      return new Response('Not found', { status: 404 });
    }
    // The diagram links to the repository's Markdown with relative paths; GitHub renders it.
    if (path.endsWith('.md')) {
      return Response.redirect(SOURCE + path.slice('/docs'.length), 302);
    }
    return env.ASSETS.fetch(request);
  },
};
