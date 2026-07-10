/* JoyEat — motion system (GSAP + ScrollTrigger + Lenis)
   Continuidade cinematográfica: smooth scroll, hero com scrub, parallax,
   rostinho-personagem viajando, reveals direcionais e microinterações. */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasGSAP = !!(window.gsap && window.ScrollTrigger);
  if (hasGSAP) gsap.registerPlugin(ScrollTrigger);

  /* ---------- Lenis smooth scroll ---------- */
  var lenis = null;
  if (!reduce && window.Lenis) {
    lenis = new Lenis({ lerp: 0.09, smoothWheel: true, wheelMultiplier: 1 });
    document.documentElement.classList.add('lenis');
    if (hasGSAP) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
      gsap.ticker.lagSmoothing(0);
    } else {
      var raf = function (t) { lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }
  }

  /* fallback: se GSAP não carregar, mostra tudo */
  if (!hasGSAP) {
    document.querySelectorAll('.reveal').forEach(function (e) { e.classList.add('in'); });
  }

  /* ---------- Nav sólido + barra de progresso ---------- */
  var nav = document.getElementById('nav');
  var prog = document.getElementById('prog');
  function navState() {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > window.innerHeight * 0.7);
    if (prog) {
      var h = document.documentElement;
      var max = (h.scrollHeight - h.clientHeight) || 1;
      prog.style.width = (Math.min(1, window.scrollY / max) * 100) + '%';
    }
  }
  window.addEventListener('scroll', navState, { passive: true });
  navState();

  /* ---------- Contadores (stats) ---------- */
  function runCount(el) {
    if (el.dataset.done) return; el.dataset.done = '1';
    var target = parseFloat(el.getAttribute('data-count')) || 0;
    var suf = el.getAttribute('data-suffix') || '';
    var t0 = null, dur = 1400;
    function step(ts) {
      if (t0 === null) t0 = ts;
      var p = Math.min(1, (ts - t0) / dur);
      var e = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * e) + suf;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var counters = document.querySelectorAll('[data-count]');
  if (counters.length && 'IntersectionObserver' in window) {
    var co = new IntersectionObserver(function (es) {
      es.forEach(function (x) { if (x.isIntersecting) { runCount(x.target); co.unobserve(x.target); } });
    }, { threshold: 0.5 });
    counters.forEach(function (c) { co.observe(c); });
  } else { counters.forEach(runCount); }

  /* ---------- Botões magnéticos ---------- */
  if (!reduce && window.matchMedia('(hover:hover)').matches) {
    document.querySelectorAll('.mag').forEach(function (m) {
      m.addEventListener('pointermove', function (e) {
        var r = m.getBoundingClientRect();
        var x = (e.clientX - r.left - r.width / 2) * 0.28;
        var y = (e.clientY - r.top - r.height / 2) * 0.4;
        m.style.transform = 'translate(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px)';
      });
      m.addEventListener('pointerleave', function () { m.style.transform = ''; });
    });
  }

  if (hasGSAP) {
    /* ---------- HERO: timeline com scrub (vídeo full-screen) ---------- */
    var beats = gsap.utils.toArray('.stext');
    var heroScroll = document.querySelector('.hero-scroll');
    var heroVideo = document.getElementById('heroVideo');
    var heroRing = document.getElementById('heroRing');
    var hint = document.getElementById('scrollHint');
    if (heroScroll) {
      ScrollTrigger.create({
        trigger: heroScroll, start: 'top top', end: 'bottom bottom', scrub: true,
        onUpdate: function (self) {
          var p = self.progress;
          if (heroVideo) gsap.set(heroVideo, { scale: 1 + p * 0.16, transformOrigin: 'center center' });
          if (heroRing) gsap.set(heroRing, { y: p * 150, rotation: p * 130 });
          var active = Math.round(p * (beats.length - 1));
          beats.forEach(function (b, i) { b.classList.toggle('on', i === active); });
          if (hint) hint.style.opacity = p > 0.05 ? 0 : 1;
        }
      });
    }

    /* ---------- Reveals direcionais (classe .in dispara o easing do CSS) ---------- */
    ScrollTrigger.batch('.reveal', {
      start: 'top 86%',
      onEnter: function (batch) {
        batch.forEach(function (el, i) { el.style.transitionDelay = (i * 0.06) + 's'; el.classList.add('in'); });
      }
    });

    /* ---------- Rotação lenta e contínua nos anéis originais ---------- */
    gsap.utils.toArray('[data-spin]').forEach(function (el, i) {
      gsap.to(el, { rotation: '+=360', duration: 22 + i * 2.5, ease: 'none', repeat: -1 });
    });

    /* ---------- Parallax nas camadas (assets originais) ---------- */
    gsap.utils.toArray('[data-par]').forEach(function (el) {
      var sp = parseFloat(el.getAttribute('data-par')) || 0;
      var host = el.closest('section, .gstrip, .band, footer') || el.parentElement;
      gsap.to(el, {
        yPercent: sp * 60, ease: 'none',
        scrollTrigger: { trigger: host, start: 'top bottom', end: 'bottom top', scrub: true }
      });
    });

    /* ---------- Rostinho-personagem: atravessa a página inteira ---------- */
    var character = document.getElementById('character');
    if (character) {
      gsap.fromTo(character,
        { yPercent: -14, rotation: -10 },
        { yPercent: 54, rotation: 150, ease: 'none',
          scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 1 } });
    }
    var bgflow = document.getElementById('bgflow');
    if (bgflow) {
      gsap.to(bgflow, { yPercent: -6, ease: 'none',
        scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: true } });
    }

    window.addEventListener('load', function () { ScrollTrigger.refresh(); });
  }

  /* ---------- Microinterações (independem do GSAP) ---------- */
  /* dot que segue o cursor */
  var dot = document.getElementById('cursorDot');
  if (dot && !reduce && window.matchMedia('(hover:hover)').matches) {
    var dx = 0, dy = 0, tx = 0, ty = 0;
    window.addEventListener('pointermove', function (e) { tx = e.clientX; ty = e.clientY; dot.style.opacity = .85; });
    document.querySelectorAll('a,button,summary,.f').forEach(function (el) {
      el.addEventListener('pointerenter', function () { dot.classList.add('big'); });
      el.addEventListener('pointerleave', function () { dot.classList.remove('big'); });
    });
    (function loop() {
      dx += (tx - dx) * 0.18; dy += (ty - dy) * 0.18;
      dot.style.transform = 'translate(' + dx.toFixed(1) + 'px,' + dy.toFixed(1) + 'px) translate(-50%,-50%)';
      requestAnimationFrame(loop);
    })();
  }

  /* cards inclinam levemente seguindo o mouse */
  if (!reduce) {
    document.querySelectorAll('.tl,.value,.prod,.scard,.pill2,.pw2,.quote').forEach(function (c) {
      c.style.transition = 'transform .35s cubic-bezier(.16,1,.3,1), box-shadow .35s';
      c.addEventListener('pointermove', function (e) {
        var r = c.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        c.style.transform = 'perspective(760px) rotateY(' + (x * 7).toFixed(2) + 'deg) rotateX(' + (-y * 7).toFixed(2) + 'deg) translateY(-5px)';
      });
      c.addEventListener('pointerleave', function () { c.style.transform = ''; });
    });
  }

  /* ---------- Faixas inclinam com a velocidade do scroll ---------- */
  if (!reduce) {
    var skewEls = document.querySelectorAll('[data-skew]');
    if (skewEls.length) {
      var lastY = window.scrollY, sk = 0, tsk = 0;
      window.addEventListener('scroll', function () {
        var y = window.scrollY;
        tsk = Math.max(-7, Math.min(7, (y - lastY) * 0.35));
        lastY = y;
      }, { passive: true });
      (function skewLoop() {
        sk += (tsk - sk) * 0.12; tsk += (0 - tsk) * 0.08;
        skewEls.forEach(function (el) { el.style.setProperty('--sk', sk.toFixed(2) + 'deg'); });
        requestAnimationFrame(skewLoop);
      })();
    }
  }

  /* filtros do cardápio */
  document.querySelectorAll('.filters').forEach(function (f) {
    f.addEventListener('click', function (e) {
      var t = e.target.closest('.f'); if (!t) return;
      f.querySelectorAll('.f').forEach(function (x) { x.classList.remove('on'); });
      t.classList.add('on');
    });
  });
})();
