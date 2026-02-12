/* ===== CLIENT-SIDE ROUTING ===== */
(function () {
  'use strict';

  const pages = ['home', 'services', 'portfolio', 'about', 'resources', 'contact', 'article-coe-setup', 'article-dax-functions'];

  var scrollTargets = {
    'health-check': 'pkg-health-check',
    'stabilisation': 'pkg-stabilisation',
    'coe': 'pkg-coe',
    'fractional': 'pkg-fractional'
  };

  function navigateTo(page, scrollTo) {
    if (!pages.includes(page)) page = 'home';

    // Hide all pages, show target
    document.querySelectorAll('.page').forEach(function (el) {
      el.classList.remove('active');
    });
    var target = document.getElementById('page-' + page);
    if (target) target.classList.add('active');

    // Update nav active state
    var navPage = page.startsWith('article-') ? 'resources' : page;
    document.querySelectorAll('.nav__link').forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('data-page') === navPage) {
        link.classList.add('active');
      }
    });

    // Scroll to specific element or top
    if (scrollTo) {
      var el = document.getElementById(scrollTo);
      if (el) {
        setTimeout(function () {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 50);
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }

    // Close mobile menu
    closeMobileMenu();
  }

  function getPageFromHash() {
    var hash = window.location.hash.replace('#', '');
    if (!hash) return { page: 'home', scrollTo: null };

    var parts = hash.split('/');
    var page = parts[0] || 'home';
    var anchor = parts[1] || null;
    var scrollTo = anchor && scrollTargets[anchor] ? scrollTargets[anchor] : null;

    return { page: page, scrollTo: scrollTo };
  }

  window.addEventListener('hashchange', function () {
    var route = getPageFromHash();
    navigateTo(route.page, route.scrollTo);
  });

  // Initial load
  var initialRoute = getPageFromHash();
  navigateTo(initialRoute.page, initialRoute.scrollTo);

  /* ===== MOBILE MENU ===== */
  var hamburger = document.getElementById('hamburger');
  var navLinks = document.getElementById('nav-links');

  function closeMobileMenu() {
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', function () {
    var isOpen = hamburger.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
    navLinks.classList.toggle('open');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close menu when clicking a link
  navLinks.addEventListener('click', function (e) {
    if (e.target.classList.contains('nav__link')) {
      closeMobileMenu();
    }
  });

  // Close menu on outside click
  document.addEventListener('click', function (e) {
    if (navLinks.classList.contains('open') &&
        !navLinks.contains(e.target) &&
        !hamburger.contains(e.target)) {
      closeMobileMenu();
    }
  });

  /* ===== FAQ ACCORDION ===== */
  document.querySelectorAll('.faq__question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq__item');
      var isOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq__item').forEach(function (faqItem) {
        faqItem.classList.remove('open');
        faqItem.querySelector('.faq__question').setAttribute('aria-expanded', 'false');
      });

      // Toggle current
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ===== CONTACT FORM VALIDATION ===== */
  var form = document.getElementById('contact-form');
  var formSuccess = document.getElementById('form-success');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Reset errors
      form.querySelectorAll('.form-group').forEach(function (g) {
        g.classList.remove('has-error');
      });
      form.querySelectorAll('.form-input, .form-select, .form-textarea').forEach(function (input) {
        input.classList.remove('error');
      });

      var valid = true;

      // Validate name
      var nameInput = document.getElementById('contact-name');
      if (!nameInput.value.trim()) {
        nameInput.classList.add('error');
        nameInput.closest('.form-group').classList.add('has-error');
        valid = false;
      }

      // Validate email
      var emailInput = document.getElementById('contact-email');
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
        emailInput.classList.add('error');
        emailInput.closest('.form-group').classList.add('has-error');
        valid = false;
      }

      if (valid) {
        var submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending…';

        var formData = new FormData(form);

        fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        }).then(function (response) {
          if (response.ok) {
            form.style.display = 'none';
            formSuccess.hidden = false;
          } else {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send message';
            alert('Something went wrong. Please try again or email me directly.');
          }
        }).catch(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send message';
          alert('Something went wrong. Please try again or email me directly.');
        });
      }
    });

    // Clear error on input
    form.querySelectorAll('.form-input, .form-select, .form-textarea').forEach(function (input) {
      input.addEventListener('input', function () {
        input.classList.remove('error');
        input.closest('.form-group').classList.remove('has-error');
      });
    });
  }

  /* ===== CTA & INTERNAL LINK HANDLING ===== */
  // Handle clicks on package cards and other deep links (e.g. #services/health-check)
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href^="#"]');
    if (!link) return;

    var hash = link.getAttribute('href').replace('#', '');
    if (!hash) return;

    var parts = hash.split('/');
    var page = parts[0];
    var anchor = parts[1] || null;

    if (pages.includes(page)) {
      e.preventDefault();
      var scrollTo = anchor && scrollTargets[anchor] ? scrollTargets[anchor] : null;
      window.location.hash = hash;
      navigateTo(page, scrollTo);
    }
  });

})();
