// Loading splash: soft gray screen with the Ausculta mark while styles, fonts, translations and the first render settle.
(function () {
  if (window.__ausSplash) return; window.__ausSplash = true;
  var d = document.documentElement, t0 = Date.now(), done = false;
  var dark = false; try { var ac = JSON.parse(localStorage.getItem('ausculta-acct') || '{}'), am = JSON.parse(localStorage.getItem('ausculta-acct-member') || '{}'); dark = ac.theme === 'dark' || am.theme === 'dark' || localStorage.getItem('ausculta-theme') === 'dark'; } catch (e) {}
  var bg = dark ? '#141B1C' : '#F1EFEA', line = dark ? '#33403D' : '#D9D4C9', brand = dark ? '#5FA8BE' : '#1F5C73';
  var css = 'html:not(.aus-ready){background:' + bg + '}html:not(.aus-ready) body{visibility:hidden}#aus-splash{position:fixed;inset:0;z-index:2147483000;background:' + bg + ';display:flex;flex-direction:column;align-items:center;justify-content:center;gap:20px;transition:opacity .22s ease}' +
    '#aus-splash.out{opacity:0;pointer-events:none}' +
    '#aus-splash img{width:56px;height:56px;animation:aus-sp-breathe 1.6s ease-in-out infinite}' +
    '#aus-splash p{margin:0;font:600 17px/24px Fraunces,Georgia,serif;color:' + (dark ? '#B7C2BF' : '#5B6461') + ';text-align:center;padding:0 24px}' +
    '#aus-splash i{display:block;width:96px;height:3px;border-radius:3px;background:' + line + ';overflow:hidden;position:relative}' +
    '#aus-splash i:after{content:"";position:absolute;top:0;bottom:0;left:-40%;width:40%;border-radius:3px;background:' + brand + ';animation:aus-sp-bar 1.1s ease-in-out infinite}' +
    '@keyframes aus-sp-breathe{0%,100%{transform:scale(1);opacity:.9}50%{transform:scale(1.06);opacity:1}}' +
    '@keyframes aus-sp-bar{0%{left:-40%}100%{left:100%}}' +
    '@media (prefers-reduced-motion: reduce){#aus-splash img,#aus-splash i:after{animation:none}}';
  var st = document.createElement('style'); st.textContent = css; (document.head || d).appendChild(st);
  var el = document.createElement('div'); el.id = 'aus-splash'; el.setAttribute('role', 'status'); el.setAttribute('aria-label', 'Carregando');
  el.innerHTML = '<img alt="" src="' + ((window.__resources && window.__resources.logoMark) || 'assets/logo/ausculta-mark-diafragma.svg') + '"><p></p><i></i>';
  try { var lg = localStorage.getItem('ausculta-lang') || 'pt'; el.querySelector('p').textContent = { pt: 'O cuidado começa na escuta.', en: 'Care begins with listening.', es: 'El cuidado empieza en la escucha.' }[lg] || 'O cuidado começa na escuta.'; } catch (e) {}
  d.appendChild(el);
  var guard = new MutationObserver(function () { if (!done && !el.isConnected) d.appendChild(el); if (!st.isConnected) (document.head || d).appendChild(st); });
  guard.observe(d, { childList: true, subtree: true });
  function hide() { if (done) return; done = true; guard.disconnect(); d.classList.add('aus-ready'); el.classList.add('out'); setTimeout(function () { el.remove(); }, 260); }
  function sheetLoaded(sh, depth) {
    if (!sh) return false; var rules; try { rules = sh.cssRules; } catch (e) { return true; }
    if (!rules || depth > 3) return true;
    for (var i = 0; i < rules.length; i++) { var r = rules[i]; if (r.type === 3 && (!r.styleSheet || !sheetLoaded(r.styleSheet, depth + 1))) return false; }
    return true;
  }
  function sheetsReady() {
    var ls = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < ls.length; i++) if (!sheetLoaded(ls[i].sheet, 0)) return false;
    return true;
  }
  function ready() {
    var lang = 'pt'; try { lang = localStorage.getItem('ausculta-lang') || 'pt'; } catch (e) {}
    var root = document.querySelector('[data-theme]');
    var rendered = !!root && root.getAttribute('data-theme').indexOf('{{') < 0 && !document.querySelector('sc-if, sc-for')
      && !/\{\{\s*[\w.$]+\s*\}\}/.test((document.body && document.body.innerText || '').slice(0, 4000));
    var styled = rendered && !!getComputedStyle(root).getPropertyValue('--brand').trim();
    var translated = lang === 'pt' || d.hasAttribute('data-i18n-ready');
    var busy = !!document.querySelector('[data-dc-placeholder], [data-hint-placeholder], x-dc, helmet');
    return styled && rendered && translated && !busy && sheetsReady() && Date.now() - t0 > 150;
  }
  (function check() {
    if (done) return;
    if (ready()) { (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(function () { setTimeout(hide, 80); }); return; }
    setTimeout(check, 50);
  })();
  // Hard cap only as a last resort, so a slow network never leaves the page blank forever.
  setTimeout(hide, 15000);
  window.addEventListener('pageshow', function (e) { if (e.persisted) hide(); });
})();
