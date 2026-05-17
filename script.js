// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// ─── MOBILE NAV TOGGLE ───
const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('main-nav');

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close nav on link click
  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Close nav on outside click
  document.addEventListener('click', (e) => {
    if (!mainNav.contains(e.target) && !navToggle.contains(e.target)) {
      mainNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// ─── SCROLL REVEAL ───
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

// ─── CLICKABLE PROJECT CARDS ───
document.querySelectorAll('[data-href]').forEach((card) => {
  const openCardLink = () => {
    const href = card.getAttribute('data-href');

    if (href) {
      window.open(href, '_blank', 'noopener');
    }
  };

  card.addEventListener('click', (event) => {
    if (event.target.closest('a, button')) return;
    openCardLink();
  });

  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openCardLink();
    }
  });
});

// ─── ACTIVE NAV HIGHLIGHT ───
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.classList.add('active');
          }
        });
      }
    });
  },
  { rootMargin: '-30% 0px -60% 0px' }
);

sections.forEach((section) => sectionObserver.observe(section));

// ─── CONTACT MODAL ───
const overlay   = document.getElementById('modal-overlay');
const trigger   = document.getElementById('contact-trigger');
const closeBtn  = document.getElementById('modal-close');
const form      = document.getElementById('contact-form');
const submitBtn = document.getElementById('form-submit');
const success   = document.getElementById('form-success');
const error     = document.getElementById('form-error');

function openModal() {
  if (!overlay) return;
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  if (closeBtn) setTimeout(() => closeBtn.focus(), 100);
}
function closeModal() {
  if (!overlay) return;
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

if (trigger && overlay) trigger.addEventListener('click', openModal);
if (closeBtn && overlay) closeBtn.addEventListener('click', closeModal);

if (overlay) {
  // Close on backdrop click
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  // Close on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) closeModal();
  });
}

// Form submission via Formspree (AJAX)
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    error.hidden = true;

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        form.hidden = true;
        success.hidden = false;
      } else {
        throw new Error('Failed');
      }
    } catch {
      error.hidden = false;
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
    }
  });
}
