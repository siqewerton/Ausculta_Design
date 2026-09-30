// Loading splash: soft gray screen with the Ausculta mark while styles, fonts, translations and the first render settle.
(function () {
  if (window.__ausSplash) return; window.__ausSplash = true;
  var d = document.documentElement, t0 = Date.now(), done = false;
  var dark = false; try { dark = localStorage.getItem('ausculta-theme') === 'dark'; } catch (e) {}
  var bg = dark ? '#141B1C' : '#F1EFEA', line = dark ? '#33403D' : '#D9D4C9', brand = dark ? '#5FA8BE' : '#1F5C73';
  var css = '#aus-splash{position:fixed;inset:0;z-index:2147483000;background:' + bg + ';display:flex;flex-direction:column;align-items:center;justify-content:center;gap:20px;transition:opacity .22s ease}' +
    '#aus-splash.out{opacity:0;pointer-events:none}' +
    '#aus-splash img{width:56px;height:56px;animation:aus-sp-breathe 1.6s ease-in-out infinite}' +
    '#aus-splash i{display:block;width:96px;height:3px;border-radius:3px;background:' + line + ';overflow:hidden;position:relative}' +
    '#aus-splash i:after{content:"";position:absolute;top:0;bottom:0;left:-40%;width:40%;border-radius:3px;background:' + brand + ';animation:aus-sp-bar 1.1s ease-in-out infinite}' +
    '@keyframes aus-sp-breathe{0%,100%{transform:scale(1);opacity:.9}50%{transform:scale(1.06);opacity:1}}' +
    '@keyframes aus-sp-bar{0%{left:-40%}100%{left:100%}}' +
    '@media (prefers-reduced-motion: reduce){#aus-splash img,#aus-splash i:after{animation:none}}';
  var st = document.createElement('style'); st.textContent = css; (document.head || d).appendChild(st);
  var el = document.createElement('div'); el.id = 'aus-splash'; el.setAttribute('role', 'status'); el.setAttribute('aria-label', 'Carregando');
  el.innerHTML = '<img alt="" src="' + ((window.__resources && window.__resources.logoMark) || 'assets/logo/ausculta-mark-diafragma.svg') + '"><i></i>';
  d.appendChild(el);
  function hide() { if (done) return; done = true; el.classList.add('out'); setTimeout(function () { el.remove(); }, 260); }
  function ready() {
    var lang = 'pt'; try { lang = localStorage.getItem('ausculta-lang') || 'pt'; } catch (e) {}
    var root = document.querySelector('[data-theme]');
    var rendered = !!root && root.getAttribute('data-theme').indexOf('{{') < 0 && !document.querySelector('sc-if, sc-for')
      && !/\{\{\s*[\w.$]+\s*\}\}/.test((document.body && document.body.innerText || '').slice(0, 4000));
    var styled = rendered && !!getComputedStyle(root).getPropertyValue('--brand').trim();
    var translated = lang === 'pt' || d.hasAttribute('data-i18n-ready');
    return styled && rendered && translated && Date.now() - t0 > 150;
  }
  (function check() {
    if (done) return;
    if (ready()) { (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(function () { setTimeout(hide, 80); }); return; }
    setTimeout(check, 50);
  })();
  setTimeout(hide, 4000);
})();
