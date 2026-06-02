/* theme toggle — light / dark, persisted to localStorage */
(function() {
  var STORAGE_KEY = 'liutheme-theme';
  var html = document.documentElement;
  var body = document.body;

  function apply(theme) {
    body.classList.remove('theme-light', 'theme-dark');
    body.classList.add(theme);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'theme-dark' ? '#16140f' : '#faf7f1');
  }

  function init() {
    var saved = localStorage.getItem(STORAGE_KEY);
    var theme = saved || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'theme-dark' : 'theme-light');
    apply(theme);
  }

  function bind() {
    var btn = document.getElementById('theme-toggle');
    if (!btn) return;
    btn.addEventListener('click', function() {
      var next = body.classList.contains('theme-dark') ? 'theme-light' : 'theme-dark';
      apply(next);
      localStorage.setItem(STORAGE_KEY, next);
    });
  }

  init();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bind);
  } else {
    bind();
  }
})();
