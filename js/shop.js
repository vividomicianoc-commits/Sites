/* JoyEat — Loja conectada à Shopify (headless em site estático)
   -------------------------------------------------------------------------
   CONEXÃO: o catálogo (JOY_SHOP.products) guarda o ID da variante real da
   Shopify "JOY EAT FAST CASUAL LTDA". "Finalizar compra" monta o permalink
   https://<domínio>/cart/<variantId>:<qtd>,... e leva ao checkout seguro da
   Shopify (pagamento/frete/pedido/estoque ficam 100% na Shopify).

   PROMOÇÕES aplicadas nesta loja (referências: pasta Drive "Ecommerce")
   - Preço de/por + selo "% OFF" ...... Sallve (R$69,90 → R$34,90 50%OFF), Essential (R$203 → R$88)
   - Selo de urgência "Últimas unidades" ... Insider ("envio imediato"), Essential ("sujeita a estoque")
   - Kits com desconto progressivo ......... Insider (1 un / Kit 3 / Kit 5)
   - Comprar pelo WhatsApp ................. Insider ("COMPRE PELO WHATSAPP")
   - Cross-sell "Você também vai gostar" ... Insider ("Sugestões"), Essential ("Produtos em alta"), Sallve ("complete sua rotina")
   - Barra de frete grátis / brinde ........ Insider ("Você ganhou FRETE GRÁTIS!!"), Sallve ("adicione R$80 p/ ganhar a Necessaire")
   - Campo de cupom no carrinho ............ Insider ("cupom TECHWEAR"), Sallve ("inserir código")

   Os valores de "de/por" e o cupom abaixo são DEMONSTRAÇÃO enquanto os preços
   reais não são definidos. Quando definir na Shopify o preço e o "Comparar em"
   (compare-at), é só refletir aqui em price/compareAt.
   ------------------------------------------------------------------------- */
(function () {
  'use strict';

  var JOY_SHOP = {
    domain: 'xssy2x-ts.myshopify.com',
    currency: 'BRL',
    products: [
      { id: 'shot-imunidade', title: 'Shot de Imunidade', cat: 'Shots', variant: '55599727608100',
        price: 9.00, color: '--amarelo', img: null,
        tagline: 'Gengibre, cúrcuma e limão',
        desc: 'Um reforço para a sua rotina. Gengibre, cúrcuma, limão e hortelã numa bebida fresca e cheia de sabor, adoçada com mel.',
        ingredients: ['Laranja', 'Gengibre', 'Cúrcuma', 'Limão', 'Hortelã', 'Casca de abacaxi', 'Canela', 'Mel'] },

      { id: 'shot-pre-treino', title: 'Shot de Pré-Treino', cat: 'Shots', variant: '55735962796324',
        price: 9.00, color: '--vermelho', img: null,
        tagline: 'Energia natural antes do treino',
        desc: 'Aquele gás natural antes do treino. Laranja, beterraba e gengibre — sem estimulantes pesados, adoçado com mel.',
        ingredients: ['Suco de laranja', 'Beterraba', 'Gengibre', 'Mel'] },

      { id: 'suco-detox', title: 'Suco Detox', cat: 'Sucos', variant: '55735963025700',
        price: 9.00, color: '--verde', img: null,
        tagline: 'Aquele verde que refresca',
        desc: 'Leveza de verdade. Pepino, couve e hortelã com abacaxi e limão, adoçado com mel. Refresca e limpa.',
        ingredients: ['Suco de limão', 'Pepino', 'Abacaxi', 'Couve', 'Hortelã', 'Mel'] },

      { id: 'pink-limonade', title: 'Pink Limonade', cat: 'Sucos', variant: '55735962927396',
        price: 9.00, color: '--teal', img: null,
        tagline: 'Refrescância rosa e tropical',
        desc: 'Limão e água de coco com pitaya, morango e manjericão. Leve, hidratante e adoçado com mel.',
        ingredients: ['Suco de limão', 'Água de coco', 'Pitaya', 'Morango', 'Manjericão', 'Mel'] },

      { id: 'pink-tropical', title: 'Pink Tropical', cat: 'Sucos', variant: '55735962992932',
        price: 9.00, color: '--petroleo', img: null,
        tagline: 'O tropical em estado puro',
        desc: 'Maracujá e água de coco com pitaya e morango. Doçura equilibrada, adoçado com mel e cheio de refrescância.',
        ingredients: ['Maracujá', 'Água de coco', 'Pitaya', 'Morango', 'Mel'] },

      { id: 'pure-abacaxi', title: 'Base de Abacaxi', cat: 'Bases', variant: '55735961223460',
        price: 9.00, color: '--laranja', img: null,
        tagline: 'Base para drinks e sobremesas',
        desc: 'Abacaxi no ponto certo, adoçado com mel e sem conservantes. Base para drinks, mocktails, sobremesas ou para adoçar do seu jeito.',
        ingredients: ['Abacaxi', 'Mel', 'Água'] },

      { id: 'pure-frutas-vermelhas', title: 'Base de Frutas Vermelhas', cat: 'Bases', variant: '55735962075428',
        price: 9.00, color: '--vermelho', img: null,
        tagline: 'Base para drinks e sobremesas',
        desc: 'O equilíbrio das frutas vermelhas, adoçado só com mel. Base para drinks, mocktails e sobremesas com sabor de verdade.',
        ingredients: ['Frutas vermelhas', 'Mel'] },

      { id: 'pure-maracuja', title: 'Base de Maracujá', cat: 'Bases', variant: '55735962763556',
        price: 9.00, color: '--amarelo', img: null,
        tagline: 'Base para drinks e sobremesas',
        desc: 'A intensidade tropical do maracujá, adoçada com mel e sem conservantes. Base para drinks, mocktails e sobremesas.',
        ingredients: ['Maracujá', 'Mel'] }
    ]
  };

  /* ---------- config de promoções (ajuste com os dados reais da Shopify) ---------- */
  var PROMO = window.JOY_PROMO || { freeShippingThreshold: 99, giftThreshold: 149, firstCoupon: 'JOY15', firstPercent: 15, whatsapp: '5562000000000' };
  var KITS = [ { q: 1, label: '1 unidade', off: 0 }, { q: 3, label: 'Kit 3', off: 0.10 }, { q: 6, label: 'Kit 6', off: 0.15 } ];
  // DEMONSTRAÇÃO de "de/por" e urgência (viria do "Comparar em" da Shopify):
  var SALE = { 'shot-imunidade': 11.90, 'suco-detox': 11.90, 'pink-limonade': 11.90, 'pure-abacaxi': 11.90 };
  var HOT = { 'shot-imunidade': true, 'pink-limonade': true, 'pure-maracuja': true };
  JOY_SHOP.products.forEach(function (p) { p.compareAt = SALE[p.id] || null; p.hot = !!HOT[p.id]; });

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var fmt = function (n) { return 'R$ ' + n.toFixed(2).replace('.', ','); };
  var byId = {}; JOY_SHOP.products.forEach(function (p) { byId[p.id] = p; });
  function offPct(p) { return p.compareAt ? Math.round((1 - p.price / p.compareAt) * 100) : 0; }

  /* ---------- estado ---------- */
  var state = { cat: 'all', q: '', sort: 'rel' };
  var CART_KEY = 'joy_cart_v1';
  function loadCart() { try { return JSON.parse(localStorage.getItem(CART_KEY)) || {}; } catch (e) { return {}; } }
  function saveCart(c) { localStorage.setItem(CART_KEY, JSON.stringify(c)); }
  var cart = loadCart();
  var coupon = ''; try { coupon = localStorage.getItem('joy_coupon') || ''; } catch (e) {}

  /* ---------- grafismo do produto (mock enquanto não há foto) ---------- */
  function productVisual(p) {
    if (p.img) return '<img class="pc-photo" src="' + p.img + '" alt="' + p.title + '">';
    var jar = p.cat === 'Bases';
    return '<div class="pc-mock ' + (jar ? 'is-jar' : 'is-bottle') + '" style="--c:var(' + p.color + ')">' +
             '<span class="pcm-cap"></span><span class="pcm-body"><i class="pcm-face">' +
             '<img src="assets/rostinho_' + (jar ? 'green' : 'orange') + '.png" alt=""></i></span>' +
           '</div>';
  }

  /* ---------- render grid ---------- */
  var grid = $('#shopGrid'), empty = $('#shopEmpty');
  function filtered() {
    var list = JOY_SHOP.products.filter(function (p) {
      if (state.cat !== 'all' && p.cat !== state.cat) return false;
      if (state.q) {
        var hay = (p.title + ' ' + p.tagline + ' ' + p.ingredients.join(' ')).toLowerCase();
        if (hay.indexOf(state.q.toLowerCase()) === -1) return false;
      }
      return true;
    });
    if (state.sort === 'az') list.sort(function (a, b) { return a.title.localeCompare(b.title); });
    if (state.sort === 'price-asc') list.sort(function (a, b) { return a.price - b.price; });
    if (state.sort === 'price-desc') list.sort(function (a, b) { return b.price - a.price; });
    return list;
  }
  function priceHtml(p) {
    return p.compareAt
      ? '<span class="pc-price"><span class="pc-was">' + fmt(p.compareAt) + '</span> ' + fmt(p.price) + '</span>'
      : '<span class="pc-price">' + fmt(p.price) + '</span>';
  }
  function renderGrid() {
    var list = filtered();
    empty.hidden = list.length > 0;
    grid.innerHTML = list.map(function (p, i) {
      var flags = (p.compareAt ? '<span class="pc-off">-' + offPct(p) + '%</span>' : '') +
                  (p.hot ? '<span class="pc-hot">Últimas unidades</span>' : '');
      return '<article class="pcard" data-id="' + p.id + '" style="--c:var(' + p.color + ');--d:' + (i * 0.05).toFixed(2) + 's">' +
        '<button class="pc-visual" data-open="' + p.id + '" aria-label="Ver ' + p.title + '">' +
          '<span class="pc-flags">' + flags + '</span>' +
          productVisual(p) +
          '<span class="pc-cat">' + p.cat + '</span>' +
        '</button>' +
        '<div class="pc-info">' +
          '<h3 class="pc-title">' + p.title + '</h3>' +
          '<p class="pc-tag">' + p.tagline + '</p>' +
          '<div class="pc-foot">' + priceHtml(p) +
            '<button class="pc-add mag" data-add="' + p.id + '" aria-label="Adicionar ' + p.title + ' ao carrinho">+ Adicionar</button>' +
          '</div>' +
        '</div>' +
      '</article>';
    }).join('');
    requestAnimationFrame(function () { $$('.pcard', grid).forEach(function (c) { c.classList.add('in'); }); });
    bindMag();
  }

  /* ---------- cross-sell: 2 outros produtos (de outra categoria de preferência) ---------- */
  function related(p, n) {
    var others = JOY_SHOP.products.filter(function (x) { return x.id !== p.id; });
    others.sort(function (a, b) { return (a.cat === p.cat) - (b.cat === p.cat); }); // outras categorias primeiro
    return others.slice(0, n || 2);
  }
  function xsellHtml(p, title) {
    var items = related(p, 2).map(function (r) {
      return '<div class="xs" data-open="' + r.id + '">' +
        '<div class="xs-v" style="--c:var(' + r.color + ')">' + productVisual(r) + '</div>' +
        '<div class="xs-t"><b>' + r.title + '</b><span>' + fmt(r.price) + '</span></div>' +
        '<button class="xs-add" data-add="' + r.id + '" aria-label="Adicionar ' + r.title + '">+</button>' +
      '</div>';
    }).join('');
    return '<div class="xsell"><span class="xs-lbl">' + (title || 'Você também vai gostar') + '</span><div class="xs-list">' + items + '</div></div>';
  }

  /* ---------- painel de produto ---------- */
  var pd = $('#pd'), pdScrim = $('#pdScrim'), pdBody = $('#pdBody');
  var pdKitQ = 1, pdId = null;
  function pdPriceRow(p) {
    if (!p.compareAt) return '<p class="pd-price">' + fmt(p.price) + '</p>';
    return '<p class="pd-price"><span class="pd-was">' + fmt(p.compareAt) + '</span> ' + fmt(p.price) +
           ' <span class="pd-off">-' + offPct(p) + '%</span></p>';
  }
  function kitPrice(p, k) { return p.price * (1 - k.off); }
  function openPD(id) {
    var p = byId[id]; if (!p) return; pdId = id; pdKitQ = 1;
    var kits = KITS.map(function (k, i) {
      var per = kitPrice(p, k);
      return '<button class="pd-kit' + (i === 0 ? ' on' : '') + '" data-q="' + k.q + '">' +
        '<b>' + k.label + '</b>' +
        (k.off ? '<span class="pd-kit-off">-' + Math.round(k.off * 100) + '%</span>' : '') +
        '<span class="pd-kit-un">' + fmt(per) + '/un</span></button>';
    }).join('');
    var wa = 'https://wa.me/' + PROMO.whatsapp + '?text=' + encodeURIComponent('Olá! Quero comprar: ' + p.title);
    pdBody.innerHTML =
      '<div class="pd-visual" style="--c:var(' + p.color + ')">' +
        (p.compareAt ? '<span class="pd-off-tag">-' + offPct(p) + '%</span>' : '') + productVisual(p) + '</div>' +
      '<div class="pd-cat">' + p.cat + '</div>' +
      '<h2 class="pd-title">' + p.title + '</h2>' +
      '<p class="pd-tag">' + p.tagline + '</p>' +
      pdPriceRow(p) +
      '<p class="pd-desc">' + p.desc + '</p>' +
      '<div class="pd-ing"><span class="pd-lbl">Ingredientes</span><div class="pd-chips">' +
        p.ingredients.map(function (x) { return '<span>' + x + '</span>'; }).join('') + '</div></div>' +
      '<div class="pd-kits" id="pdKits"><span class="pd-lbl">Escolha o tamanho — leve mais, pague menos</span><div class="pd-kit-row">' + kits + '</div></div>' +
      '<div class="pd-actions">' +
        '<button class="btn btn-primary mag" data-add-n="' + p.id + '">Adicionar ao carrinho</button>' +
      '</div>' +
      '<a class="pd-wa" href="' + wa + '" target="_blank" rel="noopener">Comprar pelo WhatsApp</a>' +
      '<p class="pd-meta">Adoçado com mel · Sem conservantes · Produção fresca · Rendimento e conservação no rótulo.</p>' +
      xsellHtml(p);
    pd.classList.add('open'); pd.setAttribute('aria-hidden', 'false');
    pdScrim.hidden = false; requestAnimationFrame(function () { pdScrim.classList.add('show'); });
    document.body.classList.add('drawer-lock');
    bindMag();
  }
  function closePD() {
    pd.classList.remove('open'); pd.setAttribute('aria-hidden', 'true');
    pdScrim.classList.remove('show'); setTimeout(function () { pdScrim.hidden = true; }, 300);
    if (!cartOpenState) document.body.classList.remove('drawer-lock');
  }

  /* ---------- carrinho ---------- */
  var cartEl = $('#cart'), cartScrim = $('#cartScrim'), cartItems = $('#cartItems');
  var cartEmpty = $('#cartEmpty'), cartFoot = $('#cartFoot'), cartOpenState = false;
  function cartCount() { var n = 0; for (var k in cart) n += cart[k]; return n; }
  function cartSubtotal() {
    var s = 0; JOY_SHOP.products.forEach(function (p) { if (cart[p.variant]) s += cart[p.variant] * p.price; }); return s;
  }
  function syncCounts() {
    var n = cartCount();
    $$('.cart-count').forEach(function (e) { e.textContent = n; });
    var fab = $('#cartFab'); if (fab) fab.hidden = n === 0;
    $$('.cart-count').forEach(function (e) { e.classList.toggle('has', n > 0); });
  }
  /* barra de progresso de frete grátis / brinde (ref: Insider, Sallve) */
  function progressHtml() {
    var sub = cartSubtotal(), fs = PROMO.freeShippingThreshold, gift = PROMO.giftThreshold;
    var msg, pct, done = false;
    if (sub < fs) { msg = 'Faltam <b>' + fmt(fs - sub) + '</b> para <b>FRETE GRÁTIS</b>'; pct = sub / fs * 100; }
    else if (sub < gift) { msg = 'Você ganhou <b>FRETE GRÁTIS</b>! Faltam <b>' + fmt(gift - sub) + '</b> para um <b>brinde</b>'; pct = sub / gift * 100; done = true; }
    else { msg = 'Você ganhou <b>FRETE GRÁTIS</b> e um <b>brinde</b>!'; pct = 100; done = true; }
    return '<div class="cart-prog ' + (done ? 'ok' : '') + '"><p>' + msg + '</p><div class="cart-prog-bar"><span style="width:' + Math.min(100, pct).toFixed(0) + '%"></span></div></div>';
  }
  function renderCart() {
    var entries = JOY_SHOP.products.filter(function (p) { return cart[p.variant]; });
    cartEmpty.style.display = entries.length ? 'none' : '';
    cartFoot.hidden = entries.length === 0;
    var itemsHtml = entries.map(function (p) {
      var q = cart[p.variant];
      return '<div class="ci" data-variant="' + p.variant + '">' +
        '<div class="ci-visual" style="--c:var(' + p.color + ')">' + productVisual(p) + '</div>' +
        '<div class="ci-mid"><b>' + p.title + '</b><span>' + p.cat + '</span>' +
          '<div class="qty small" data-variant="' + p.variant + '"><button class="qminus">−</button><span class="qval">' + q + '</span><button class="qplus">+</button></div>' +
        '</div>' +
        '<div class="ci-right"><span class="ci-price">' + fmt(p.price * q) + '</span>' +
          '<button class="ci-del" data-del="' + p.variant + '" aria-label="Remover">Remover</button></div>' +
      '</div>';
    }).join('');
    var xs = entries.length ? xsellHtml(entries[entries.length - 1], 'Complete sua compra') : '';
    cartItems.innerHTML = (entries.length ? progressHtml() : '') + itemsHtml + xs;
    $('#cartSubtotal').textContent = fmt(cartSubtotal());
    renderCoupon();
    syncCounts();
    bindMag();
  }
  function renderCoupon() {
    var box = $('#cartCoupon'); if (!box) return;
    if (coupon) box.innerHTML = '<div class="coupon-on">Cupom <b>' + coupon + '</b> aplicado <button id="couponRemove" aria-label="Remover cupom">remover</button></div>';
    else box.innerHTML = '<div class="coupon-row"><input id="couponInput" placeholder="Cupom de desconto" autocomplete="off"><button id="couponApply">Aplicar</button></div>';
  }
  function openCart() {
    cartOpenState = true; renderCart();
    cartEl.classList.add('open'); cartEl.setAttribute('aria-hidden', 'false');
    cartScrim.hidden = false; requestAnimationFrame(function () { cartScrim.classList.add('show'); });
    document.body.classList.add('drawer-lock');
  }
  function closeCart() {
    cartOpenState = false;
    cartEl.classList.remove('open'); cartEl.setAttribute('aria-hidden', 'true');
    cartScrim.classList.remove('show'); setTimeout(function () { cartScrim.hidden = true; }, 300);
    if (!pd.classList.contains('open')) document.body.classList.remove('drawer-lock');
  }
  function setQty(variant, q) {
    if (q <= 0) delete cart[variant]; else cart[variant] = q;
    saveCart(cart); renderCart();
  }
  function addToCart(id, n) {
    var p = byId[id]; if (!p) return;
    cart[p.variant] = (cart[p.variant] || 0) + (n || 1);
    saveCart(cart); syncCounts(); pulse(); toast(p.title + (n > 1 ? ' (x' + n + ')' : '') + ' adicionado ao carrinho');
    if (cartOpenState) renderCart();
  }

  /* ---------- checkout Shopify (permalink de carrinho + cupom) ---------- */
  function checkoutURL() {
    var pairs = [];
    for (var v in cart) if (cart[v] > 0) pairs.push(v + ':' + cart[v]);
    if (!pairs.length) return null;
    var url = 'https://' + JOY_SHOP.domain + '/cart/' + pairs.join(',') + '?locale=pt-BR';
    if (coupon) url += '&discount=' + encodeURIComponent(coupon);
    return url;
  }

  /* ---------- microinterações ---------- */
  function pulse() { $$('.cart-count').forEach(function (e) { e.classList.remove('pulse'); void e.offsetWidth; e.classList.add('pulse'); }); }
  var toastEl = $('#toast'), toastT = null;
  function toast(msg) {
    toastEl.textContent = msg; toastEl.hidden = false; toastEl.classList.add('show');
    clearTimeout(toastT); toastT = setTimeout(function () { toastEl.classList.remove('show'); setTimeout(function () { toastEl.hidden = true; }, 300); }, 2200);
  }
  function bindMag() {
    if (reduce || !window.matchMedia('(hover:hover)').matches) return;
    $$('.mag').forEach(function (m) {
      if (m._mag) return; m._mag = 1;
      m.addEventListener('pointermove', function (e) {
        var r = m.getBoundingClientRect();
        m.style.transform = 'translate(' + ((e.clientX - r.left - r.width / 2) * 0.2).toFixed(1) + 'px,' + ((e.clientY - r.top - r.height / 2) * 0.3).toFixed(1) + 'px)';
      });
      m.addEventListener('pointerleave', function () { m.style.transform = ''; });
    });
  }

  /* ---------- eventos ---------- */
  $('#shopCats').addEventListener('click', function (e) {
    var b = e.target.closest('.scat'); if (!b) return;
    $$('.scat').forEach(function (x) { x.classList.remove('on'); }); b.classList.add('on');
    state.cat = b.getAttribute('data-cat'); renderGrid();
  });
  var stt;
  $('#shopSearch').addEventListener('input', function (e) { clearTimeout(stt); var v = e.target.value; stt = setTimeout(function () { state.q = v.trim(); renderGrid(); }, 140); });
  $('#shopSort').addEventListener('change', function (e) { state.sort = e.target.value; renderGrid(); });
  $('#shopClear').addEventListener('click', function () {
    state = { cat: 'all', q: '', sort: 'rel' }; $('#shopSearch').value = ''; $('#shopSort').value = 'rel';
    $$('.scat').forEach(function (x) { x.classList.toggle('on', x.getAttribute('data-cat') === 'all') }); renderGrid();
  });
  grid.addEventListener('click', function (e) {
    var add = e.target.closest('[data-add]'); if (add) { addToCart(add.getAttribute('data-add'), 1); return; }
    var open = e.target.closest('[data-open]'); if (open) { openPD(open.getAttribute('data-open')); }
  });
  // painel de produto
  $('#pdClose').addEventListener('click', closePD);
  pdScrim.addEventListener('click', closePD);
  pdBody.addEventListener('click', function (e) {
    var kit = e.target.closest('.pd-kit');
    if (kit) { pdKitQ = parseInt(kit.getAttribute('data-q'), 10) || 1; $$('.pd-kit', pdBody).forEach(function (k) { k.classList.remove('on'); }); kit.classList.add('on'); return; }
    var addn = e.target.closest('[data-add-n]');
    if (addn) { addToCart(addn.getAttribute('data-add-n'), pdKitQ); closePD(); openCart(); return; }
    var xadd = e.target.closest('.xsell [data-add]'); if (xadd) { addToCart(xadd.getAttribute('data-add'), 1); return; }
    var xopen = e.target.closest('.xsell [data-open]'); if (xopen) { openPD(xopen.getAttribute('data-open')); return; }
  });
  // carrinho
  $$('.cart-open, #cartFab').forEach(function (b) { b.addEventListener('click', openCart); });
  $('#cartClose').addEventListener('click', closeCart);
  cartScrim.addEventListener('click', closeCart);
  $$('.cart-close').forEach(function (b) { b.addEventListener('click', closeCart); });
  cartItems.addEventListener('click', function (e) {
    var del = e.target.closest('[data-del]'); if (del) { setQty(del.getAttribute('data-del'), 0); return; }
    var xadd = e.target.closest('.xsell [data-add]'); if (xadd) { addToCart(xadd.getAttribute('data-add'), 1); return; }
    var xopen = e.target.closest('.xsell [data-open]'); if (xopen) { openPD(xopen.getAttribute('data-open')); return; }
    stepQty(e, cartItems, false);
  });
  // cupom (delegação no rodapé do carrinho)
  var couponBox = $('#cartCoupon');
  if (couponBox) couponBox.addEventListener('click', function (e) {
    if (e.target.id === 'couponApply') {
      var inp = $('#couponInput'); var v = (inp && inp.value || '').trim().toUpperCase();
      if (!v) return; coupon = v; try { localStorage.setItem('joy_coupon', v); } catch (er) {} renderCoupon(); toast('Cupom ' + v + ' aplicado');
    } else if (e.target.id === 'couponRemove') {
      coupon = ''; try { localStorage.removeItem('joy_coupon'); } catch (er) {} renderCoupon();
    }
  });
  if (couponBox) couponBox.addEventListener('keydown', function (e) { if (e.key === 'Enter' && e.target.id === 'couponInput') { e.preventDefault(); var b = $('#couponApply'); if (b) b.click(); } });
  $('#cartCheckout').addEventListener('click', function (e) {
    var url = checkoutURL(); if (!url) { e.preventDefault(); return; }
    e.currentTarget.setAttribute('href', url);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { if (pd.classList.contains('open')) closePD(); else if (cartOpenState) closeCart(); }
  });
  function stepQty(e, root, isPD) {
    var plus = e.target.closest('.qplus'), minus = e.target.closest('.qminus'); if (!plus && !minus) return;
    var box = e.target.closest('.qty'); var variant = box.getAttribute('data-variant');
    setQty(variant, (cart[variant] || 0) + (plus ? 1 : -1));
  }

  /* ---------- reveal on scroll + progresso ---------- */
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('seen'); io.unobserve(x.target); } });
    }, { threshold: 0.2 });
    $$('[data-seen]').forEach(function (e) { io.observe(e); });
  } else { $$('[data-seen]').forEach(function (e) { e.classList.add('seen'); }); }
  var prog = $('#prog');
  window.addEventListener('scroll', function () {
    if (!prog) return; var h = document.documentElement; var max = (h.scrollHeight - h.clientHeight) || 1;
    prog.style.width = (Math.min(1, window.scrollY / max) * 100) + '%';
  }, { passive: true });

  /* ---------- init ---------- */
  renderGrid(); syncCounts(); bindMag();
})();
