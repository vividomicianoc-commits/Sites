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

  if (!hasGSAP || reduce) { document.documentElement.classList.add('no-gsap'); }
  if (!hasGSAP) {
    var pf = document.getElementById('portal'); if (pf) pf.style.display = 'none';
    /* JoyPower: sem GSAP a seção pina não roda — cicla os estados por tempo (preview) */
    var jpf = document.getElementById('joypower');
    if (jpf) { jpf.classList.add('jp-flat'); }
  }

  /* ---------- Entradas via IntersectionObserver (animam com OU sem GSAP) ---------- */
  if ('IntersectionObserver' in window) {
    var seenIO = new IntersectionObserver(function (es) {
      es.forEach(function (x) {
        if (x.isIntersecting) { x.target.classList.add('seen'); seenIO.unobserve(x.target); }
      });
    }, { threshold: 0.2, rootMargin: '0px 0px -6% 0px' });
    document.querySelectorAll('[data-seen]').forEach(function (e) { seenIO.observe(e); });

    /* .reveal: quando NÃO há GSAP, anima no scroll (preview) em vez de aparecer tudo de uma vez */
    if (!hasGSAP) {
      var revIO = new IntersectionObserver(function (es) {
        es.forEach(function (x) {
          if (x.isIntersecting) { var el = x.target; el.style.transitionDelay = '.05s'; el.classList.add('in'); revIO.unobserve(el); }
        });
      }, { threshold: 0.14, rootMargin: '0px 0px -5% 0px' });
      document.querySelectorAll('.reveal').forEach(function (e) { revIO.observe(e); });
    }
  } else if (!hasGSAP) {
    document.querySelectorAll('.reveal').forEach(function (e) { e.classList.add('in'); });
    document.querySelectorAll('[data-seen]').forEach(function (e) { e.classList.add('seen'); });
  }

  /* ---------- Navegação: rolagem suave + seção ativa (scrollspy) ---------- */
  (function () {
    var links = Array.prototype.slice.call(document.querySelectorAll('.nav-links a[href*="#"]'));
    var map = {}; // id -> link (apenas âncoras desta página)
    links.forEach(function (a) {
      var href = a.getAttribute('href') || '';
      var i = href.indexOf('#');
      var id = i >= 0 ? href.slice(i + 1) : '';
      var samePage = href.charAt(0) === '#' || href.indexOf('index.html#') === 0;
      if (id && samePage && document.getElementById(id)) map[id] = a;
    });
    // rolagem suave ao clicar numa âncora da própria página
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var id = a.getAttribute('href').slice(1);
        var t = id && document.getElementById(id);
        if (!t) return;
        e.preventDefault();
        if (lenis) lenis.scrollTo(t, { offset: -70, duration: 1.1 });
        else t.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
        history.replaceState(null, '', '#' + id);
      });
    });
    // destaca a seção ativa
    var ids = Object.keys(map);
    if (ids.length && 'IntersectionObserver' in window) {
      var spy = new IntersectionObserver(function (es) {
        es.forEach(function (x) {
          if (x.isIntersecting) {
            ids.forEach(function (k) { map[k].classList.toggle('on', k === x.target.id); });
          }
        });
      }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
      ids.forEach(function (k) { spy.observe(document.getElementById(k)); });
    }
  })();

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

    /* ---------- PORTAL: atravessar o rostinho para a próxima seção ---------- */
    var portal = document.getElementById('portal');
    if (portal) {
      var pFace = portal.querySelector('.p-face');
      var pVeil = portal.querySelector('.p-veil');
      var pWord = portal.querySelector('.p-word');
      var pD1 = portal.querySelector('.p-d1');
      var pD2 = portal.querySelector('.p-d2');
      ScrollTrigger.create({
        trigger: portal, start: 'top top', end: 'bottom bottom', scrub: 1,
        onUpdate: function (self) {
          var p = self.progress;
          // rostinho cresce e "engole" a tela (profundidade acelerada)
          var s = 1 + p * p * 26;
          gsap.set(pFace, { scale: s, rotation: p * 34, opacity: p < 0.72 ? 1 : Math.max(0, 1 - (p - 0.72) / 0.2) });
          // palavra ao fundo aproxima (camada de profundidade)
          if (pWord) gsap.set(pWord, { scale: 1 + p * 2.4, opacity: p < 0.5 ? p * 0.9 : Math.max(0, 0.45 - (p - 0.5)) , y: (0.5 - p) * 60 });
          // blobs de cor em velocidades diferentes = profundidade
          if (pD1) gsap.set(pD1, { scale: 1 + p * 7, opacity: 1 - p });
          if (pD2) gsap.set(pD2, { scale: 1 + p * 11, opacity: Math.max(0, 0.7 - p * 0.7) });
          // véu musgo assume no fim -> funde com a seção História
          if (pVeil) gsap.set(pVeil, { opacity: Math.max(0, (p - 0.62) / 0.38) });
        }
      });
    }

    /* ---------- Foto das fundadoras: Ken Burns + parallax sutil ---------- */
    var fpImg = document.querySelector('.fp-img');
    if (fpImg) {
      gsap.fromTo(fpImg, { scale: 1.16, yPercent: -3 }, {
        scale: 1.08, yPercent: 3, ease: 'none',
        scrollTrigger: { trigger: '.founders-photo', start: 'top bottom', end: 'bottom top', scrub: true }
      });
    }

    /* ---------- LOJA: produto flutuante atravessa a seção com o scroll ---------- */
    var floatProd = document.getElementById('floatProd');
    if (floatProd) {
      gsap.fromTo(floatProd,
        { yPercent: -34, rotation: -8, scale: 0.92 },
        { yPercent: 40, rotation: 10, scale: 1.04, ease: 'none',
          scrollTrigger: { trigger: '.loja-sec', start: 'top bottom', end: 'bottom top', scrub: 1 } });
    }

    /* ---------- JOYPOWER: seção pinada, produto gira em 3D e revela cada linha ---------- */
    var jp = document.getElementById('joypower');
    if (jp) {
      var jpBottles = jp.querySelectorAll('.jp-bottle');
      var jpSteps = jp.querySelectorAll('.jp-step');
      var jpDots = jp.querySelectorAll('.jp-dots span');
      var jpGlow = document.getElementById('jpGlow');
      var jpColors = ['var(--amarelo)', 'var(--petroleo)', 'var(--verde)'];
      var n = jpSteps.length;
      function jpSet(idx, local) {
        jpBottles.forEach(function (b, i) { b.classList.toggle('on', i === idx); });
        jpSteps.forEach(function (s, i) { s.classList.toggle('on', i === idx); });
        jpDots.forEach(function (d, i) { d.classList.toggle('on', i === idx); });
        if (jpGlow) jpGlow.style.background = 'radial-gradient(circle,' + jpColors[idx] + ' 0%,transparent 68%)';
        // rotação 3D contínua do palco durante toda a progressão
        var scene = document.getElementById('jpScene');
        if (scene) gsap.set(scene, { rotationY: (idx + local) * 120 - 60 });
      }
      jpSet(0, 0);
      ScrollTrigger.create({
        trigger: jp, start: 'top top', end: '+=' + (n * 90) + '%', scrub: 0.7, pin: '.jp-stage', anticipatePin: 1,
        onUpdate: function (s) {
          var raw = s.progress * n;                 // 0..n
          var idx = Math.min(n - 1, Math.floor(raw));
          var local = raw - idx;                    // 0..1 dentro do passo
          jpSet(idx, local);
        }
      });
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

  /* ---------- Hero: texto aparece no fim do vídeo (não polui) ---------- */
  (function () {
    var hc = document.querySelector('.hero-copy');
    var hv = document.querySelector('.hero-video video');
    var hint = document.getElementById('scrollHint');
    if (!hc) return;
    var shown = false;
    function showHero() {
      if (shown) return; shown = true;
      hc.classList.add('show');
      if (hint) hint.style.opacity = '0';
    }
    if (reduce) { showHero(); return; }
    if (hv) {
      hv.addEventListener('timeupdate', function () {
        if (hv.duration && hv.currentTime / hv.duration > 0.6) showHero();
      });
    }
    // fallbacks: se o vídeo não tocar, ou se o usuário rolar
    setTimeout(showHero, 8500);
    window.addEventListener('scroll', function () {
      if (window.scrollY > window.innerHeight * 0.22) showHero();
    }, { passive: true });
  })();

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

  /* ---------- HISTÓRIA: fundadoras — auto-cicla (vivo) + hover/foco ---------- */
  (function () {
    var f = document.getElementById('founders');
    if (!f) return;
    var tags = Array.prototype.slice.call(f.querySelectorAll('.ptag'));
    var panels = f.querySelectorAll('.fpn');
    var cur = 0, timer = null, paused = false;
    function act(n) {
      cur = n;
      tags.forEach(function (t) { t.classList.toggle('on', +t.getAttribute('data-f') === n); });
      panels.forEach(function (p) { p.classList.toggle('on', +p.getAttribute('data-f') === n); });
    }
    function advance() { if (!paused) act((cur + 1) % tags.length); }
    function start() { if (!reduce) { stop(); timer = setInterval(advance, 3200); } }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }
    tags.forEach(function (t) {
      var n = +t.getAttribute('data-f');
      t.addEventListener('pointerenter', function () { paused = true; act(n); });
      t.addEventListener('focus', function () { paused = true; act(n); });
      t.addEventListener('pointerleave', function () { paused = false; });
      t.addEventListener('click', function () { act(n); });
    });
    // só anima quando a seção está visível
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        es.forEach(function (x) { if (x.isIntersecting) start(); else stop(); });
      }, { threshold: 0.25 }).observe(f);
    } else { start(); }
  })();

  /* ---------- TEMPO: palavra dinâmica (Em tempo de …) ---------- */
  (function () {
    var wrap = document.getElementById('tempoWord');
    if (!wrap || reduce) return;
    var words = wrap.querySelectorAll('.tw');
    var i = 0;
    setInterval(function () {
      var prev = i; i = (i + 1) % words.length;
      words[prev].classList.remove('on'); words[prev].classList.add('out');
      words[i].classList.remove('out'); words[i].classList.add('on');
      setTimeout(function () { words[prev].classList.remove('out'); }, 850);
    }, 2600);
  })();

  /* ---------- JOYEAT: atributo dinâmico (Existe um Joy para …) ---------- */
  (function () {
    var wrap = document.getElementById('jeWord');
    if (!wrap || reduce) return;
    var words = wrap.querySelectorAll('.jw');
    var visual = document.getElementById('jeVisual');
    var i = 0;
    setInterval(function () {
      var prev = i; i = (i + 1) % words.length;
      words[prev].classList.remove('on'); words[prev].classList.add('out');
      words[i].classList.remove('out'); words[i].classList.add('on');
      if (visual) visual.style.setProperty('--c', words[i].style.getPropertyValue('--c') || 'var(--laranja)');
      setTimeout(function () { words[prev].classList.remove('out'); }, 820);
    }, 2400);
  })();

  /* ---------- JOYPOWER (sem GSAP): cicla os estados por tempo quando visível ---------- */
  (function () {
    var jp = document.getElementById('joypower');
    if (!jp || !jp.classList.contains('jp-flat')) return;
    var bottles = jp.querySelectorAll('.jp-bottle');
    var steps = jp.querySelectorAll('.jp-step');
    var dots = jp.querySelectorAll('.jp-dots span');
    var i = 0, timer = null;
    function set(n) {
      bottles.forEach(function (b, k) { b.classList.toggle('on', k === n); });
      steps.forEach(function (s, k) { s.classList.toggle('on', k === n); });
      dots.forEach(function (d, k) { d.classList.toggle('on', k === n); });
    }
    set(0);
    function tick() { i = (i + 1) % steps.length; set(i); }
    if (reduce) return;
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        es.forEach(function (x) {
          if (x.isIntersecting) { if (!timer) timer = setInterval(tick, 2600); }
          else if (timer) { clearInterval(timer); timer = null; }
        });
      }, { threshold: 0.3 }).observe(jp);
    } else { timer = setInterval(tick, 2600); }
  })();

  /* ---------- SABOR: pilares interativos (hover/click ativa o visual) ---------- */
  (function () {
    var flavor = document.getElementById('flavor');
    if (!flavor) return;
    var items = flavor.querySelectorAll('.fv-item');
    var stage = flavor.querySelector('.fv-stage');
    var num = flavor.querySelector('.fv-num');
    var cap = flavor.querySelector('.fv-cap');
    function activate(el) {
      items.forEach(function (i) { i.classList.remove('on'); });
      el.classList.add('on');
      var c = el.style.getPropertyValue('--c') || 'var(--laranja)';
      flavor.style.setProperty('--c', c);
      if (num) num.textContent = el.getAttribute('data-n');
      if (cap) cap.textContent = el.getAttribute('data-cap');
    }
    items.forEach(function (el) {
      el.addEventListener('pointerenter', function () { activate(el); });
      el.addEventListener('focus', function () { activate(el); });
      el.addEventListener('click', function () { activate(el); });
    });
  })();

  /* filtros do cardápio */
  document.querySelectorAll('.filters').forEach(function (f) {
    f.addEventListener('click', function (e) {
      var t = e.target.closest('.f'); if (!t) return;
      f.querySelectorAll('.f').forEach(function (x) { x.classList.remove('on'); });
      t.classList.add('on');
    });
  });
})();
