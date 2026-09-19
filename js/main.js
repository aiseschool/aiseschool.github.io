/* ==========================================================================
   AISE Winter School 2027 — behaviour
   Three things only: mobile nav, scroll-spy, reveal-on-scroll.
   No dependencies. The page is fully readable without this file.
   ========================================================================== */

(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------- mobile nav */

  var toggle = document.querySelector('.nav__toggle');
  var menu = document.getElementById('nav-menu');

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.querySelector('.nav__toggle-label').textContent = open ? 'Close' : 'Menu';
    });

    // Close after picking a section on small screens.
    menu.addEventListener('click', function (e) {
      if (e.target.tagName !== 'A') return;
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.querySelector('.nav__toggle-label').textContent = 'Menu';
    });

    // Escape closes it.
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape' || !menu.classList.contains('is-open')) return;
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.querySelector('.nav__toggle-label').textContent = 'Menu';
      toggle.focus();
    });
  }

  /* -------------------------------------------------------- scroll-spy */

  var links = Array.prototype.slice.call(document.querySelectorAll('.nav__menu a[href^="#"]'));
  var targets = links
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  if (targets.length && 'IntersectionObserver' in window) {
    var setActive = function (id) {
      links.forEach(function (a) {
        a.classList.toggle('is-active', a.getAttribute('href') === '#' + id);
      });
    };

    var spy = new IntersectionObserver(function (entries) {
      // Pick the visible section nearest the top of the viewport.
      var visible = entries
        .filter(function (e) { return e.isIntersecting; })
        .sort(function (a, b) { return a.boundingClientRect.top - b.boundingClientRect.top; });
      if (visible.length) setActive(visible[0].target.id);
    }, {
      rootMargin: '-25% 0px -65% 0px',
      threshold: 0
    });

    targets.forEach(function (t) { spy.observe(t); });
  }

  /* ---------------------------------------------------- reveal on scroll */

  var revealables = Array.prototype.slice.call(document.querySelectorAll('.reveal'));

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealables.forEach(function (el) { el.classList.add('is-in'); });
    return;
  }

  // A plain position check rather than IntersectionObserver: an observer misses
  // elements that a fast scroll or an anchor jump skips over entirely, and a
  // missed element would stay invisible for good.
  var pending = revealables.slice();
  var queued = false;

  function show(el, animate) {
    if (!animate) el.style.transition = 'none';
    el.classList.add('is-in');
  }

  function sweep() {
    queued = false;
    if (!pending.length) return;

    var limit = window.innerHeight * 0.92;
    var staggerSeen = 0;
    var next = [];

    for (var i = 0; i < pending.length; i++) {
      var el = pending[i];
      var box = el.getBoundingClientRect();

      if (box.top > limit) {            // still below the fold
        next.push(el);
      } else if (box.bottom < 0) {      // already scrolled past — no animation
        show(el, false);
      } else {
        el.style.transitionDelay = Math.min(staggerSeen++, 6) * 60 + 'ms';
        show(el, true);
      }
    }

    pending = next;
    if (!pending.length) {
      window.removeEventListener('scroll', request);
      window.removeEventListener('resize', request);
    }
  }

  // setTimeout rather than requestAnimationFrame: rAF never fires while the tab
  // is in the background, which would leave the page blank when it came forward.
  function request() {
    if (queued) return;
    queued = true;
    window.setTimeout(sweep, 16);
  }

  window.addEventListener('scroll', request, { passive: true });
  window.addEventListener('resize', request);
  window.addEventListener('load', request);
  window.addEventListener('pageshow', request);
  window.addEventListener('hashchange', request);
  document.addEventListener('visibilitychange', request);
  request();

  // Last resort: if not a single element ever revealed, the sweep is broken in
  // this browser — drop the effect entirely rather than show a blank page.
  window.setTimeout(function () {
    if (pending.length !== revealables.length) return;
    pending.forEach(function (el) { show(el, false); });
    pending = [];
  }, 3000);
})();
