const V="agenda-v1";
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png"])).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
// primero la red (asi llegan las versiones nuevas); sin conexion, la copia guardada
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!="GET"||new URL(r.url).origin!=location.origin)return;
 e.respondWith(fetch(r).then(x=>{const c=x.clone();caches.open(V).then(ch=>ch.put(r,c));return x}).catch(()=>caches.match(r).then(m=>m||caches.match("index.html"))))});
