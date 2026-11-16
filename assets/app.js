// Help center behaviour: search (/ to focus, arrows + Enter), theme toggle, phone menu,
// "on this page" highlighting. No dependencies.
(function () {
  var cfg = window.CG_HELP || { lang: 'ar', noResults: '' };
  var root = document.documentElement;
  try { localStorage.setItem('cg-help-lang', cfg.lang); } catch (e) { /* private mode */ }

  // theme
  var themeBtn = document.querySelector('.theme-btn');
  if (themeBtn) themeBtn.addEventListener('click', function () {
    var dark = root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
    root.dataset.theme = dark ? 'light' : 'dark';
    try { localStorage.setItem('cg-help-theme', root.dataset.theme); } catch (e) { /* ignore */ }
  });

  // phone menu
  var menuBtn = document.querySelector('.menu-btn');
  if (menuBtn) menuBtn.addEventListener('click', function () {
    var open = document.body.classList.toggle('nav-open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  // search
  var input = document.getElementById('search');
  var list = document.getElementById('results');
  var index = null;
  var active = -1;
  // Arabic: ignore diacritics / tatweel and treat أ إ آ as ا, ة as ه, ى as ي; digits ٠-٩ as 0-9
  function norm(s) {
    return String(s).toLowerCase()
      .replace(/[ً-ْـ]/g, '')
      .replace(/[أإآ]/g, 'ا').replace(/ة/g, 'ه').replace(/ى/g, 'ي')
      .replace(/[٠-٩]/g, function (d) { return String(d.charCodeAt(0) - 0x0660); });
  }
  function load() {
    if (index) return Promise.resolve(index);
    return fetch('/' + cfg.lang + '/search.json').then(function (r) { return r.json(); }).then(function (data) {
      index = data.map(function (d) { return Object.assign({ nt: norm(d.t), nx: norm(d.x) }, d); });
      return index;
    });
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function search(q) {
    var words = norm(q).split(/\s+/).filter(Boolean);
    if (!words.length) { list.hidden = true; return; }
    load().then(function (items) {
      var scored = items.map(function (d) {
        var score = 0;
        for (var i = 0; i < words.length; i++) {
          var w = words[i];
          if (d.nt.indexOf(w) >= 0) score += 10;
          else if (d.nx.indexOf(w) >= 0) score += 2;
          else return null;
        }
        return { d: d, score: score };
      }).filter(Boolean).sort(function (a, b) { return b.score - a.score; }).slice(0, 8);
      active = -1;
      list.innerHTML = scored.length
        ? scored.map(function (r, i) {
            var at = r.d.nx.indexOf(words[0]);
            var snippet = at >= 0 ? r.d.x.slice(Math.max(0, at - 40), at + 90) : r.d.x.slice(0, 120);
            return '<li><a role="option" id="r' + i + '" href="' + r.d.u + '">' + esc(r.d.t) + '<small>' + esc(r.d.s) + ' · ' + esc(snippet) + '…</small></a></li>';
          }).join('')
        : '<li class="empty">' + esc(cfg.noResults) + '</li>';
      list.hidden = false;
    });
  }
  if (input) {
    input.addEventListener('input', function () { search(input.value); });
    input.addEventListener('focus', function () { load(); if (input.value) search(input.value); });
    input.addEventListener('keydown', function (e) {
      var links = list.querySelectorAll('a');
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        if (!links.length) return;
        active = (active + (e.key === 'ArrowDown' ? 1 : -1) + links.length) % links.length;
        links.forEach(function (a, i) { a.setAttribute('aria-selected', String(i === active)); });
      } else if (e.key === 'Enter' && links.length) {
        location.href = links[Math.max(0, active)].getAttribute('href');
      } else if (e.key === 'Escape') { list.hidden = true; input.blur(); }
    });
    document.addEventListener('click', function (e) { if (!e.target.closest('.search')) list.hidden = true; });
    document.addEventListener('keydown', function (e) {
      if (e.key === '/' && document.activeElement !== input && !/input|textarea/i.test(document.activeElement.tagName)) { e.preventDefault(); input.focus(); }
    });
    var heroBtn = document.querySelector('.hero-search');
    if (heroBtn) heroBtn.addEventListener('click', function () { input.focus(); });
  }

  // "on this page": highlight the section in view
  var tocLinks = Array.prototype.slice.call(document.querySelectorAll('.toc a'));
  if (tocLinks.length && 'IntersectionObserver' in window) {
    var byId = {};
    tocLinks.forEach(function (a) { byId[decodeURIComponent(a.getAttribute('href').slice(1))] = a; });
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        tocLinks.forEach(function (a) { a.classList.remove('active'); });
        var a = byId[en.target.id];
        if (a) a.classList.add('active');
      });
    }, { rootMargin: '-80px 0px -70% 0px' });
    document.querySelectorAll('.doc h2[id], .doc h3[id]').forEach(function (h) { obs.observe(h); });
  }
})();
