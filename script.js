// ============================================================
//  CôngCụPro – Main JavaScript
// ============================================================

/* ---------- Navbar scroll effect ---------- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

/* ---------- Dropdown menus (Desktop hover + click) ---------- */
const dropdownItems = document.querySelectorAll('.nav-item.has-dropdown');

dropdownItems.forEach(item => {
  const toggle = item.querySelector('.dropdown-toggle');

  // Desktop: toggle on click
  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = item.classList.contains('open');

    // Close all others
    dropdownItems.forEach(d => d.classList.remove('open'));

    if (!isOpen) {
      item.classList.add('open');
    }
  });
});

// Close dropdown when clicking outside
document.addEventListener('click', () => {
  dropdownItems.forEach(d => d.classList.remove('open'));
});

// Prevent dropdown panel clicks from bubbling
document.querySelectorAll('.dropdown-panel').forEach(panel => {
  panel.addEventListener('click', e => e.stopPropagation());
});

/* ---------- Mobile hamburger ---------- */
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('navMenu');
const mobileOverlay = document.getElementById('mobileOverlay');

function toggleMobileMenu(force) {
  const isOpen = force !== undefined ? force : !navMenu.classList.contains('open');
  navMenu.classList.toggle('open', isOpen);
  mobileOverlay.classList.toggle('show', isOpen);
  hamburger.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

hamburger.addEventListener('click', () => toggleMobileMenu());
mobileOverlay.addEventListener('click', () => toggleMobileMenu(false));

/* ---------- Smooth scroll for anchor links ---------- */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href === '#') return; // Ignore simple placeholder hash links
    
    try {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        toggleMobileMenu(false);
        const top = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    } catch (err) {
      console.warn('Invalid selector:', href, err);
    }
  });
});

/* ---------- Intersection Observer – fade-in animation ---------- */
const observerOpts = {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOpts);

// Add animate class to elements
const animateEls = [
  '.tool-card',
  '.feature-item',
  '.shop-item',
  '.shop-category',
  '.tool-category',
  '.tarot-card-preview'
];

animateEls.forEach(sel => {
  document.querySelectorAll(sel).forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity 0.5s ease ${i * 0.05}s, transform 0.5s ease ${i * 0.05}s`;
    observer.observe(el);
  });
});

// Add visible class style
const style = document.createElement('style');
style.textContent = `
  .visible {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`;
document.head.appendChild(style);

/* ---------- Tool card click effect ---------- */
document.querySelectorAll('.tool-card, .shop-item').forEach(card => {
  card.addEventListener('click', (e) => {
    // Ripple effect
    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: rgba(108,71,255,0.3);
      transform: scale(0);
      animation: ripple 0.5s linear;
      pointer-events: none;
      width: 100px; height: 100px;
      left: ${e.offsetX - 50}px;
      top: ${e.offsetY - 50}px;
    `;
    card.style.position = 'relative';
    card.style.overflow = 'hidden';
    card.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  @keyframes ripple {
    to { transform: scale(4); opacity: 0; }
  }
`;
document.head.appendChild(rippleStyle);

/* ---------- Hero typed text effect ---------- */
function typeWriter(el, texts, speed = 80) {
  let textIdx = 0, charIdx = 0, deleting = false;
  function tick() {
    const current = texts[textIdx];
    if (deleting) {
      el.textContent = current.slice(0, charIdx--);
      if (charIdx < 0) {
        deleting = false;
        textIdx = (textIdx + 1) % texts.length;
        setTimeout(tick, 400);
        return;
      }
    } else {
      el.textContent = current.slice(0, charIdx++);
      if (charIdx > current.length) {
        deleting = true;
        setTimeout(tick, 2000);
        return;
      }
    }
    setTimeout(tick, deleting ? speed / 2 : speed);
  }
  tick();
}

// Active state for nav item based on scroll
const sections = document.querySelectorAll('[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.id;
    }
  });
}, { passive: true });

/* ---------- Counter animation ---------- */
function animateCounter(el, target, duration = 1500) {
  const start = 0;
  const startTime = performance.now();
  const isFloat = String(target).includes('.');

  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const val = start + (parseFloat(target) - start) * eased;
    el.textContent = isFloat ? val.toFixed(1) : Math.round(val).toLocaleString();
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// Observe stats
const statEls = document.querySelectorAll('.stat strong');
const statObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const raw = entry.target.textContent.replace(/[^0-9.]/g, '');
      const suffix = entry.target.textContent.replace(/[0-9.]/g, '').replace(/\s/g, '');
      const num = parseFloat(raw);
      if (!isNaN(num)) {
        const originalSuffix = suffix;
        animateCounter(entry.target, num);
        setTimeout(() => {
          entry.target.textContent = entry.target.textContent + originalSuffix;
        }, 1600);
      }
      statObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

statEls.forEach(el => statObs.observe(el));

/* ---------- Close mobile nav on resize ---------- */
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    toggleMobileMenu(false);
  }
});

console.log('%c⚡ CôngCụPro loaded!', 'color: #6c47ff; font-size: 1.2rem; font-weight: bold;');
