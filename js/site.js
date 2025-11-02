(function () {
  const navs = document.querySelectorAll('.w-nav');
  navs.forEach((nav) => {
    const button = nav.querySelector('.w-nav-button');
    const menu = nav.querySelector('.w-nav-menu');
    const backdrop = nav.querySelector('.navbar3_menu-background');
    if (!button || !menu) return;

    const closeMenu = () => {
      button.classList.remove('w--open');
      menu.removeAttribute('data-nav-menu-open');
      menu.classList.remove('is-open');
      if (backdrop) backdrop.classList.remove('is-visible');
      button.setAttribute('aria-expanded', 'false');
    };

    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-controls', menu.id || 'nav-menu-' + Math.random().toString(36).slice(2));
    if (!menu.id) {
      menu.id = button.getAttribute('aria-controls');
    }

    button.addEventListener('click', () => {
      const isOpen = button.classList.toggle('w--open');
      if (isOpen) {
        menu.setAttribute('data-nav-menu-open', '');
        menu.classList.add('is-open');
        if (backdrop) backdrop.classList.add('is-visible');
        button.setAttribute('aria-expanded', 'true');
      } else {
        closeMenu();
      }
    });

    nav.querySelectorAll('.w-nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        closeMenu();
      });
    });

    document.addEventListener('click', (event) => {
      if (!nav.contains(event.target)) {
        closeMenu();
      }
    });

    document.addEventListener('keyup', (event) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    });
  });

  const params = new URLSearchParams(window.location.search);
  const successWrapper = document.querySelector('.w-form-done');
  const errorWrapper = document.querySelector('.w-form-fail');
  if (successWrapper) {
    successWrapper.style.display = 'none';
  }
  if (errorWrapper) {
    errorWrapper.style.display = 'none';
  }

  if (params.get('success') === 'true' && successWrapper) {
    successWrapper.style.display = 'block';
    const form = document.querySelector('form[data-netlify="true"]');
    if (form) {
      form.style.display = 'none';
    }
  }

  const forms = document.querySelectorAll('form[data-netlify="true"]');
  forms.forEach((form) => {
    const submitButton = form.querySelector('button[type="submit"], input[type="submit"]');
    form.addEventListener('submit', () => {
      if (submitButton) {
        submitButton.setAttribute('disabled', 'disabled');
        submitButton.classList.add('is-submitting');
      }
    });
  });
})();
