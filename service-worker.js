var files = [
  "index.html",
  "loja-adidas.html",
  "loja-bacio-di-latte.html",
  "loja-brooksfield.html",
  "loja-burberry.html",
  "loja-cavalera.html",
  "loja-centauro.html",
  "loja-farm.html",
  "loja-forum.html",
  "loja-galetos.html",
  "loja-le-lis-blanc.html",
  "loja-ofner.html",
  "loja-pizza-hut.html",
  "loja-shoulder.html",
  "loja-so-sapatos.html",
  "loja-tip-top.html",
  "lojas.html",
  "manifest.json",
  "pagar-estacionamento.html",
  "css/main.css",
  "icons/MaterialIcons-Regular.ttf",
  "icons/material.css",
  "img/entrada.jpg",
  "img/icon.png",
  "js/main.js",
  "js/palestra.js",
  "js/vendor/jquery.min.js",
  "js/vendor/materialize-0.97.0.min.js",
  "img/loja/adidas.jpg",
  "img/loja/bacio-di-latte.jpg",
  "img/loja/brooksfield.jpg",
  "img/loja/burberry.jpg",
  "img/loja/cavalera.jpg",
  "img/loja/centauro.jpg",
  "img/loja/farm.jpg",
  "img/loja/forum.jpg",
  "img/loja/galetos.jpg",
  "img/loja/le-lis-blanc.jpg",
  "img/loja/ofner.jpg",
  "img/loja/pizza-hut.jpg",
  "img/loja/shoulder.jpg",
  "img/loja/so-sapatos.jpg",
  "img/loja/tip-top.jpg"
];
// dev only
files = files || ['index.html'];

// index as home
files.push('./');

var CACHE_NAME = 'shopping-v9';

self.addEventListener('activate', function(event) {
  console.log('[SW] Activate');
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (CACHE_NAME.indexOf(cacheName) == -1) {
            console.log('[SW] Delete cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('install', function(event){
  console.log('[SW] Install');
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return Promise.all(
      	files.map(function(file){
      		return cache.add(file);
      	})
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  console.log('[SW] fetch ' + event.request.url)
  event.respondWith(
    caches.match(event.request).then(function(response){
      return response || fetch(event.request.clone());
    })
  );
});