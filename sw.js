var V=(self.location.search.match(/v=([\d.]+)/)||[0,"0"])[1];
var CACHE="phone-prices-"+V;
var CORE=["./","index.html","config.js?v="+V,"app.js?v="+V,"manifest.json","logo.png","icons/icon-192.png","icons/icon-512.png","data/items.json"];
self.addEventListener("install",function(e){self.skipWaiting();e.waitUntil(caches.open(CACHE).then(function(c){return Promise.all(CORE.map(function(u){return c.add(u).catch(function(){})}))}))});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==CACHE}).map(function(k){return caches.delete(k)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener("fetch",function(e){var r=e.request;if(r.method!=="GET"||new URL(r.url).origin!==self.location.origin)return;
var img=/\.(png|jpg|jpeg|svg|webp)$/.test(new URL(r.url).pathname);
if(img){e.respondWith(caches.match(r).then(function(m){return m||fetch(r).then(function(n){if(n.ok){var c=n.clone();caches.open(CACHE).then(function(x){x.put(r,c)})}return n})}));return}
e.respondWith(fetch(r).then(function(n){if(n.ok){var c=n.clone();caches.open(CACHE).then(function(x){x.put(r,c)})}return n}).catch(function(){return caches.match(r).then(function(m){return m||caches.match("./")})}))});
