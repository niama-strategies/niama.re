/// <reference lib="webworker" />

import {build, files, timestamp} from '$service-worker';

const worker = self as unknown as ServiceWorkerGlobalScope;
const FILES = `cache${timestamp}`;
const to_cache = [...build, ...files];
const staticAssets = new Set(to_cache);

worker.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(FILES)
      .then((cache) => cache.addAll(to_cache))
      .then(worker.skipWaiting)
  );
});

worker.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(async (keys) => {
      // eslint-disable-next-line promise/always-return
      for (const key of keys) if (key !== FILES) await caches.delete(key);
      worker.clients.claim();
    })
  );
});

async function fetchAndCache(request: Request) {
  const cache = await caches.open(`offline${timestamp}`);

  try {
    const response = await fetch(request);
    cache.put(request, response.clone());
    return response;
  } catch (error) {
    const response = await cache.match(request);
    if (response) return response;
    throw error;
  }
}

worker.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET' || event.request.headers.has('range')) return;

  const url = new URL(event.request.url);

  const isHttp = url.protocol.startsWith('http');
  const isDevServerRequest = url.hostname === self.location.hostname && url.port !== self.location.port;
  const isStaticAsset = url.host === self.location.host && staticAssets.has(url.pathname);
  const skipBecauseUncached = event.request.cache === 'only-if-cached' && !isStaticAsset;

  if (isHttp && !isDevServerRequest && !skipBecauseUncached) {
    event.respondWith(
      (async () => {
        const cachedAsset = isStaticAsset && (await caches.match(event.request));
        return cachedAsset || fetchAndCache(event.request);
      })()
    );
  }
});
