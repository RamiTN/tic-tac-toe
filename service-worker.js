self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open("tictactoe-cache-v1").then((cache) => {
      return cache.addAll([
        "./",
        "index.html",

        // Views
        "view/game.html",
        "view/multiplayer.html",
        "view/credit.html",

        // CSS
        "assets/css/style.css",

        // JS
        "assets/js/script.js",

        // Icons
        "assets/img/icon-192.png",
        "assets/img/icon-512.png"
      ]);
    })
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      // Serve from cache OR fetch normally
      return response || fetch(e.request);
    })
  );
});
