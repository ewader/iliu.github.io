const cacheName = self.location.pathname
const pages = [

  "/hugo-book/docs/example/",
  "/hugo-book/docs/example/table-of-contents/with-toc/",
  "/hugo-book/docs/example/table-of-contents/without-toc/",
  "/hugo-book/posts/creating-a-new-theme/",
  "/hugo-book/posts/migrate-from-jekyll/",
  "/hugo-book/docs/example/table-of-contents/",
  "/hugo-book/docs/example/collapsed/",
  "/hugo-book/",
  "/hugo-book/posts/",
  "/hugo-book/posts/goisforlovers/",
  "/hugo-book/categories/",
  "/hugo-book/categories/Development/",
  "/hugo-book/tags/development/",
  "/hugo-book/posts/hugoisforlovers/",
  "/hugo-book/tags/go/",
  "/hugo-book/categories/golang/",
  "/hugo-book/tags/golang/",
  "/hugo-book/tags/hugo/",
  "/hugo-book/tags/",
  "/hugo-book/tags/templates/",
  "/hugo-book/tags/themes/",
  "/hugo-book/docs/example/collapsed/3rd-level/4th-level/",
  "/hugo-book/docs/example/collapsed/3rd-level/",
  "/hugo-book/docs/example/hidden/",
  "/hugo-book/docs/shortcodes/",
  "/hugo-book/docs/shortcodes/buttons/",
  "/hugo-book/docs/shortcodes/columns/",
  "/hugo-book/docs/shortcodes/details/",
  "/hugo-book/docs/shortcodes/experimental/",
  "/hugo-book/docs/shortcodes/experimental/asciinema/",
  "/hugo-book/docs/shortcodes/experimental/badges/",
  "/hugo-book/docs/shortcodes/experimental/cards/",
  "/hugo-book/docs/shortcodes/experimental/images/",
  "/hugo-book/docs/shortcodes/hints/",
  "/hugo-book/docs/shortcodes/mermaid/",
  "/hugo-book/docs/shortcodes/section/",
  "/hugo-book/docs/shortcodes/section/first-page/",
  "/hugo-book/docs/shortcodes/section/second-page/",
  "/hugo-book/docs/shortcodes/steps/",
  "/hugo-book/docs/shortcodes/tabs/",
  "/hugo-book/zh/categories/",
  "/hugo-book/he/categories/",
  "/hugo-book/docs/",
  "/hugo-book/he/",
  "/hugo-book/docs/shortcodes/katex/",
  "/hugo-book/showcases/",
  "/hugo-book/zh/tags/",
  "/hugo-book/he/tags/",
  "/hugo-book/zh/",
  "/hugo-book/book.min.cc2c524ed250aac81b23d1f4af87344917b325208841feca0968fe450f570575.css",
  "/hugo-book/en.search-data.min.0445b185da7d0417c1c7ec7a052f483d79f0d56841d700f6888c75aae058489f.json",
  "/hugo-book/en.search.min.56b276f3d14c27756e22ba4b6bcd88e0150e3bcaf4ed0249ae46082c6d734196.js",
  
];

self.addEventListener("install", function (event) {
  self.skipWaiting();

  caches.open(cacheName).then((cache) => {
    return cache.addAll(pages);
  });
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") {
    return;
  }

  /**
   * @param {Response} response
   * @returns {Promise<Response>}
   */
  function saveToCache(response) {
    if (cacheable(response)) {
      return caches
        .open(cacheName)
        .then((cache) => cache.put(request, response.clone()))
        .then(() => response);
    } else {
      return response;
    }
  }

  /**
   * @param {Error} error
   */
  function serveFromCache(error) {
    return caches.open(cacheName).then((cache) => cache.match(request.url));
  }

  /**
   * @param {Response} response
   * @returns {Boolean}
   */
  function cacheable(response) {
    return response.type === "basic" && response.ok && !response.headers.has("Content-Disposition")
  }

  event.respondWith(fetch(request).then(saveToCache).catch(serveFromCache));
});
