// Cloudflare Pages Function: /api/apps
// Shared store for applications added or re-outcomed on the dashboard, so every
// device shows the same list and the nightly task can read it.
//
// Setup, once, in the Cloudflare dashboard for this Pages project:
//   1. Workers & Pages > KV > Create a namespace (any name).
//   2. This project > Settings > Bindings > Add > KV namespace: variable name APPS.
//   3. This project > Settings > Variables and Secrets > add APPS_KEY (a passphrase).
//   4. Redeploy (push any commit, or Retry deployment).
// Until then GET answers 501 and the page keeps edits on the device.
//
// GET  /api/apps            -> { configured, writable, manual: [...], overrides: {...}, updated }
//                              open by default so the nightly task can read it; set the variable
//                              APPS_READ=key to require the same Bearer passphrase on reads.
// POST /api/apps            -> body { manual, overrides }, header Authorization: Bearer <APPS_KEY>
//                              merges newer-wins per id and returns the merged document.

const HEADERS = { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', 'x-robots-tag': 'noindex' };
const reply = (obj, status) => new Response(JSON.stringify(obj), { status: status || 200, headers: HEADERS });
const EMPTY = { manual: [], overrides: {} };

function merge(a, b) {
  const m = {}, o = {};
  for (const d of [a, b]) {
    if (!d) continue;
    for (const x of d.manual || []) {
      if (!x || !x.id) continue;
      if (!m[x.id] || String(x.updated || '') > String(m[x.id].updated || '')) m[x.id] = x;
    }
    for (const id of Object.keys(d.overrides || {})) {
      const x = d.overrides[id];
      if (!x) continue;
      if (!o[id] || String(x.updated || '') > String(o[id].updated || '')) o[id] = x;
    }
  }
  return { manual: Object.values(m), overrides: o, updated: new Date().toISOString() };
}

export async function onRequestGet({ request, env }) {
  if (!env.APPS) return reply({ configured: false, reason: 'No KV binding named APPS on this Pages project.' }, 501);
  if (env.APPS_READ === 'key' && (request.headers.get('authorization') || '') !== 'Bearer ' + env.APPS_KEY) {
    return reply({ configured: true, writable: !!env.APPS_KEY, locked: true, manual: [], overrides: {} }, 401);
  }
  const doc = (await env.APPS.get('apps', 'json')) || EMPTY;
  return reply(Object.assign({ configured: true, writable: !!env.APPS_KEY }, doc));
}

export async function onRequestPost({ request, env }) {
  if (!env.APPS || !env.APPS_KEY) return reply({ configured: false, reason: 'Need the KV binding APPS and the variable APPS_KEY.' }, 501);
  const auth = request.headers.get('authorization') || '';
  if (auth !== 'Bearer ' + env.APPS_KEY) return reply({ error: 'bad passphrase' }, 401);
  let body;
  try { body = await request.json(); } catch (e) { return reply({ error: 'bad json' }, 400); }
  const cur = (await env.APPS.get('apps', 'json')) || EMPTY;
  const merged = merge(cur, body || EMPTY);
  const text = JSON.stringify(merged);
  if (text.length > 900000) return reply({ error: 'too large' }, 413);
  await env.APPS.put('apps', text);
  return reply(Object.assign({ configured: true, writable: true }, merged));
}
