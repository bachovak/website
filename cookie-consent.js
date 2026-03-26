/* ===== COOKIE CONSENT MANAGER =====
 * Manages consent for: strictly necessary, functional (Calendly),
 * analytics (reserved), and marketing (Kit/ConvertKit) cookies.
 * Consent choice is stored in localStorage under 'kb_cookie_consent'.
 */
(function () {
  'use strict';

  var CONSENT_KEY     = 'kb_cookie_consent';
  var CONSENT_VERSION = '1';

  /* ─── Storage helpers ─── */

  function getConsent() {
    try {
      var raw = localStorage.getItem(CONSENT_KEY);
      if (!raw) return null;
      var data = JSON.parse(raw);
      if (data.version !== CONSENT_VERSION) return null; // re-ask on policy version bump
      return data;
    } catch (e) {
      return null;
    }
  }

  function saveConsent(categories) {
    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify({
        version:    CONSENT_VERSION,
        timestamp:  new Date().toISOString(),
        categories: categories
      }));
    } catch (e) { /* localStorage unavailable — graceful no-op */ }
  }

  /* ─── Third-party script loaders ─── */

  function loadCalendly() {
    if (document.getElementById('calendly-widget-script')) return;

    // Reveal widget, hide placeholder
    var placeholder = document.getElementById('calendly-consent-placeholder');
    var widgets     = document.querySelectorAll('.calendly-inline-widget');
    if (placeholder) placeholder.style.display = 'none';
    widgets.forEach(function (w) { w.style.removeProperty('display'); });

    var script    = document.createElement('script');
    script.id     = 'calendly-widget-script';
    script.src    = 'https://assets.calendly.com/assets/external/widget.js';
    script.async  = true;
    document.head.appendChild(script);
  }

  function loadKit() {
    if (document.getElementById('kit-embed-script')) return;

    // Reveal containers, hide placeholders (handles all Kit form instances on the page)
    [['kit-consent-placeholder', 'kit-form-container'],
     ['kit-consent-placeholder-agent', 'kit-form-container-agent']].forEach(function (pair) {
      var ph = document.getElementById(pair[0]);
      var ct = document.getElementById(pair[1]);
      if (ph) ph.style.display = 'none';
      if (ct) ct.style.removeProperty('display');
    });

    // Inject Kit embed script for the Resources page form
    var script = document.createElement('script');
    script.id  = 'kit-embed-script';
    script.setAttribute('data-uid', 'bb35d512cc');
    script.src   = 'https://kristina-bachova.kit.com/bb35d512cc/index.js';
    script.async = true;
    var container = document.getElementById('kit-form-container');
    if (container) {
      container.appendChild(script);
    } else {
      document.body.appendChild(script);
    }

    // Inject ck.5.js to activate the seva-form on the agent article page
    if (!document.getElementById('kit-ckjs-script')) {
      var ckjs = document.createElement('script');
      ckjs.id  = 'kit-ckjs-script';
      ckjs.src = 'https://f.convertkit.com/ckjs/ck.5.js';
      ckjs.async = true;
      document.body.appendChild(ckjs);
    }
  }

  /* Analytics stub — no GA currently; uncomment & configure when adding GA */
  function loadAnalytics() {
    // var GA_ID = 'G-XXXXXXXXXX';
    // if (document.getElementById('ga-script')) return;
    // var s = document.createElement('script');
    // s.id = 'ga-script'; s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    // s.async = true; document.head.appendChild(s);
    // window.dataLayer = window.dataLayer || [];
    // function gtag(){dataLayer.push(arguments);}
    // gtag('js', new Date()); gtag('config', GA_ID);
  }

  function applyConsent(categories) {
    if (categories.functional) loadCalendly();
    if (categories.marketing)  loadKit();
    if (categories.analytics)  loadAnalytics();
  }

  /* ─── DOM references ─── */
  var banner, modal;

  function init() {
    banner = document.getElementById('cookie-banner');
    modal  = document.getElementById('cookie-modal');
    if (!banner) return; // safety guard

    /* Buttons that exist in multiple places use shared CSS classes */
    var acceptAllBtns = document.querySelectorAll('.js-cookie-accept-all');
    var rejectAllBtns = document.querySelectorAll('.js-cookie-reject-all');
    var manageBtns    = document.querySelectorAll('.js-cookie-manage');
    var savePrefBtn   = document.getElementById('cookie-save-prefs');
    var closePrefBtn  = document.getElementById('cookie-close-prefs');

    /* ─── Check stored consent ─── */
    var consent = getConsent();
    if (consent) {
      applyConsent(consent.categories);
    } else {
      banner.hidden = false; // show banner on first visit
    }

    /* ─── Accept all ─── */
    acceptAllBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var cats = { necessary: true, functional: true, analytics: true, marketing: true };
        saveConsent(cats);
        applyConsent(cats);
        hideBanner();
        hideModal();
      });
    });

    /* ─── Reject non-essential ─── */
    rejectAllBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var cats = { necessary: true, functional: false, analytics: false, marketing: false };
        saveConsent(cats);
        hideBanner();
        hideModal();
      });
    });

    /* ─── Open preferences modal ─── */
    manageBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        prefillModal();
        showModal();
      });
    });

    /* ─── Save preferences ─── */
    if (savePrefBtn) {
      savePrefBtn.addEventListener('click', function () {
        var chkFunctional = document.getElementById('consent-functional');
        var chkAnalytics  = document.getElementById('consent-analytics');
        var chkMarketing  = document.getElementById('consent-marketing');
        var cats = {
          necessary:  true,
          functional: chkFunctional ? chkFunctional.checked : false,
          analytics:  chkAnalytics  ? chkAnalytics.checked  : false,
          marketing:  chkMarketing  ? chkMarketing.checked  : false
        };
        saveConsent(cats);
        applyConsent(cats);
        hideBanner();
        hideModal();
      });
    }

    /* ─── Close preferences ─── */
    if (closePrefBtn) {
      closePrefBtn.addEventListener('click', hideModal);
    }
    // Close on backdrop click
    if (modal) {
      modal.addEventListener('click', function (e) {
        if (e.target === modal) hideModal();
      });
    }
    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal && !modal.hidden) hideModal();
    });
  }

  function prefillModal() {
    var consent       = getConsent();
    var chkFunctional = document.getElementById('consent-functional');
    var chkAnalytics  = document.getElementById('consent-analytics');
    var chkMarketing  = document.getElementById('consent-marketing');
    if (consent && consent.categories) {
      if (chkFunctional) chkFunctional.checked = !!consent.categories.functional;
      if (chkAnalytics)  chkAnalytics.checked  = !!consent.categories.analytics;
      if (chkMarketing)  chkMarketing.checked   = !!consent.categories.marketing;
    }
  }

  function hideBanner() { if (banner) banner.hidden = true; }

  function showModal() {
    if (modal) {
      modal.hidden = false;
      document.body.style.overflow = 'hidden';
    }
  }

  function hideModal() {
    if (modal) {
      modal.hidden = true;
      document.body.style.overflow = '';
    }
  }

  /* ─── Public API — available to other scripts ─── */
  window.CookieConsent = {
    getConsent: getConsent,
    hasConsent: function (category) {
      var c = getConsent();
      return c ? !!c.categories[category] : false;
    },
    openPreferences: function () {
      if (banner && !banner.hidden) hideBanner();
      prefillModal();
      showModal();
    }
  };

  /* ─── Bootstrap ─── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
