/* 汉堡菜单切换 */
(function() {
  var burger = document.getElementById('hamburger');
  var nav = document.getElementById('mobile-nav');
  if (!burger || !nav) return;
  burger.addEventListener('click', function() {
    burger.classList.toggle('open');
    nav.classList.toggle('open');
    document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
  });
  // 点击链接后关闭菜单
  nav.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function() {
      burger.classList.remove('open');
      nav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
  // 窗口resize到桌面时自动关闭
  window.addEventListener('resize', function() {
    if (window.innerWidth > 1024 && nav.classList.contains('open')) {
      burger.classList.remove('open');
      nav.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
})();

/* 客户端搜索（用于 /search/） */
(function() {
  var input = document.getElementById('search-input');
  var out = document.getElementById('search-results');
  if (!input || !out) return;
  var url = window.SEARCH_INDEX_URL;
  if (!url) return;

  var index = null;
  function load() {
    if (index) return Promise.resolve(index);
    return fetch(url).then(function(r) { return r.json(); }).then(function(d) { index = d; });
  }

  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, function(c) {
      return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c];
    });
  }
  function escapeRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
  function highlight(text, q) {
    if (!q) return escapeHtml(text);
    var re = new RegExp('(' + q.split(/\s+/).filter(Boolean).map(escapeRe).join('|') + ')', 'gi');
    return escapeHtml(text).replace(re, '<mark>$1</mark>');
  }

  function snippet(content, q) {
    if (!q) return content.slice(0, 140);
    var terms = q.split(/\s+/).filter(Boolean);
    var pos = -1;
    for (var i = 0; i < terms.length; i++) {
      var p = content.toLowerCase().indexOf(terms[i].toLowerCase());
      if (p >= 0 && (pos === -1 || p < pos)) pos = p;
    }
    var start = Math.max(0, pos - 40);
    var end = Math.min(content.length, start + 160);
    var s = (start > 0 ? '…' : '') + content.slice(start, end) + (end < content.length ? '…' : '');
    return s;
  }

  function render(items, q) {
    if (!items.length) {
      out.innerHTML = '<div class="empty">没找到相关文章</div>';
      return;
    }
    out.innerHTML = '<div class="result-meta">共找到 <strong>' + items.length + '</strong> 篇</div>' +
    items.slice(0, 30).map(function(it) {
      var tags = (it.tags || []);
      var cats = (it.categories || []);
      return '<article class="result-item">' +
        '<h2 class="result-title"><a href="' + it.url + '">' + highlight(it.title, q) + '</a></h2>' +
        '<div class="result-snippet">' + highlight(snippet(it.content || it.summary || '', q), q) + '</div>' +
        '<div class="result-meta-bar">' +
          '<time>' + (it.date || '') + '</time>' +
          (cats.length ? '<span class="dot">·</span><a class="result-cat" href="/categories/' + encodeURIComponent(cats[0]) + '/">' + cats[0] + '</a>' : '') +
          (tags.length ? '<span class="dot">·</span>' + tags.map(function(t){return '<a class="result-tag" href="/tags/' + encodeURIComponent(t) + '/">#' + t + '</a>'}).join(' ') : '') +
        '</div>' +
        '</article>';
    }).join('');
  }

  var timer;
  input.addEventListener('input', function() {
    clearTimeout(timer);
    var q = input.value.trim();
    var clearBtn = document.getElementById('search-clear');
    if (clearBtn) clearBtn.style.display = input.value ? 'flex' : 'none';
    if (!q) { out.innerHTML = '<div class="search-idle">输入关键词开始搜索</div>'; return; }
    timer = setTimeout(function() {
      load().then(function(data) {
        var terms = q.toLowerCase().split(/\s+/).filter(Boolean);
        var hits = data.filter(function(it) {
          var hay = (it.title + ' ' + (it.content || '') + ' ' + (it.tags || []).join(' ') + ' ' + (it.categories || []).join(' ')).toLowerCase();
          return terms.every(function(t) { return hay.indexOf(t) >= 0; });
        });
        render(hits, q);
      });
    }, 150);
  });
  var clearBtn = document.getElementById('search-clear');
  if (clearBtn) {
    clearBtn.addEventListener('click', function() {
      input.value = '';
      clearBtn.style.display = 'none';
      out.innerHTML = '<div class="search-idle">输入关键词开始搜索</div>';
      input.focus();
    });
  }
})();

/* 实时 memos 片段（页头） */
(function() {
  var box = document.getElementById('brand-memos');
  if (!box) return;
  var api = box.getAttribute('data-api');
  var base = box.getAttribute('data-memos-base') || '';
  var textEl = box.querySelector('[data-memos-text]');
  var linkEl = box.querySelector('.brand-memos-inner');
  if (!api || !textEl || !linkEl) return;

  function stripMd(s) {
    return (s || '')
      .replace(/\r/g, '')
      .replace(/\n+/g, ' ')
      .replace(/\s+#\S+/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function loadMemos() {
    fetch(api, { headers: { 'Accept': 'application/json' } })
      .then(function(r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function(data) {
        var list = (data && data.memos) || [];
        if (!list.length) { textEl.textContent = '暂无 memos'; return; }
        var m = list[0];
        var snip = (m.snippet || stripMd(m.content) || '').slice(0, 80);
        textEl.textContent = snip;
        box.title = stripMd(m.content || snip) + '\n\n' + (m.createTime || '');
        if (m.name && base) linkEl.href = base.replace(/\/$/, '') + '/' + m.name;
      })
      .catch(function() { textEl.textContent = '加载失败'; });
  }
  loadMemos();
  setInterval(loadMemos, 5 * 60 * 1000);
})();

/* 实时 memos（首页 hero 卡片） */
(function() {
  var el = document.getElementById('home-memos');
  if (!el) return;
  var api = el.getAttribute('data-api');
  var base = el.getAttribute('data-memos-base') || '';
  if (!api) return;

  var textEl = el.querySelector('[data-memos-text]');
  var timeEl = el.querySelector('[data-memos-time]');
  var moreEl = el.querySelector('.memos-live-more');
  if (!textEl) return;

  function stripMd(s) {
    return (s || '')
      .replace(/\r/g, '')
      .replace(/\n+/g, ' ')
      .replace(/\s+#\S+/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }
  function fmtTime(iso) {
    if (!iso) return '';
    var d = new Date(iso);
    if (isNaN(d.getTime())) return '';
    var now = new Date();
    var diff = (now - d) / 1000;
    if (diff < 60) return '刚刚';
    if (diff < 3600) return Math.floor(diff / 60) + ' 分钟前';
    if (diff < 86400) return Math.floor(diff / 3600) + ' 小时前';
    if (diff < 86400 * 7) return Math.floor(diff / 86400) + ' 天前';
    var m = d.getMonth() + 1, day = d.getDate();
    return m + '月' + day + '日';
  }

  function load() {
    fetch(api, { headers: { 'Accept': 'application/json' } })
      .then(function(r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function(data) {
        var list = (data && data.memos) || [];
        if (!list.length) {
          textEl.textContent = '暂无 memos';
          return;
        }
        var m = list[0];
        var text = stripMd(m.snippet || m.content || '');
        if (text.length > 200) text = text.slice(0, 200) + '…';
        var href = m.name ? (base.replace(/\/$/, '') + '/' + m.name) : base;
        textEl.innerHTML =
          '<a class="memos-live-text-link" href="' + href + '" target="_blank" rel="noopener">' +
            text +
          '</a>';
        if (timeEl) timeEl.textContent = fmtTime(m.createTime);
        if (moreEl) moreEl.href = base;
      })
      .catch(function() { textEl.textContent = '加载失败'; });
  }
  load();
  setInterval(load, 5 * 60 * 1000);
})();

/* ====== 发布热力图（客户端渲染） ====== */
(function() {
  var container = document.getElementById('heatmap');
  var dataEl = document.getElementById('heatmap-data');
  if (!container || !dataEl) return;

  var byDay = JSON.parse(dataEl.textContent.trim());
  var today = new Date();
  today.setHours(0, 0, 0, 0);

  // 计算到本周日的天数
  var daysToSunday = (7 - today.getDay()) % 7;
  var end = new Date(today);
  end.setDate(end.getDate() + daysToSunday);
  var start = new Date(end);
  start.setDate(start.getDate() - 182); // 26 周 = 182 天

  var grid = document.createElement('div');
  grid.className = 'heatmap-grid';

  var cursor = new Date(start);
  for (var week = 0; week < 26; week++) {
    for (var day = 0; day < 7; day++) {
      var cell = document.createElement('div');
      cell.className = 'heatmap-cell';

      var iso = cursor.toISOString().split('T')[0];
      var cnt = byDay[iso] || 0;
      var isFuture = cursor > today;

      if (isFuture) {
        cell.classList.add('heat-future');
      } else {
        var level = 0;
        if (cnt > 0) {
          level = Math.min(cnt, 4);
        }
        cell.classList.add('heat-l' + level);
        if (cnt > 0) {
          cell.setAttribute('data-count', cnt);
          cell.setAttribute('data-title', iso + ' · ' + cnt + ' 篇');
        }
      }

      grid.appendChild(cell);
      cursor.setDate(cursor.getDate() + 1);
    }
  }

  container.appendChild(grid);
})();
