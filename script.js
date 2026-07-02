/* ============================================================
   RAGHAV DHYANI — PORTFOLIO SCRIPT
   Sections:
   1.  Custom Cursor
   2.  Sticky Nav + Active Link Highlight
   3.  Mobile Menu
   4.  Scroll-to-top Button
   5.  Typewriter Effect
   6.  Skill Bar Scroll Animation
   7.  Tech Arsenal Logo Rain
   8.  Scroll-reveal (fade-in on scroll)
   9.  Stat Counter Animation
   10. Project Cards Tilt Effect
   11. Workflow Step Hover Glow
   12. Timeline Reveal
   13. EmailJS Contact Form
   ============================================================ */

'use strict';

/* ── 1. CUSTOM CURSOR ──────────────────────────────────────── */
(function initCursor() {
  const dot  = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (!dot || !ring) return;

  let mouseX = 0, mouseY = 0;
  let ringX  = 0, ringY  = 0;

  // Move dot instantly
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top  = mouseY + 'px';
  });

  // Smooth-follow ring via rAF
  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Expand on hoverable elements
  const hoverTargets = 'a, button, .p, .project-card, .cert-card, .why-card, .chip, .skill-tag';
  document.querySelectorAll(hoverTargets).forEach(el => {
    el.addEventListener('mouseenter', () => {
      dot.style.width  = '12px';
      dot.style.height = '12px';
      ring.style.width  = '48px';
      ring.style.height = '48px';
      ring.style.borderColor = 'var(--magenta)';
    });
    el.addEventListener('mouseleave', () => {
      dot.style.width  = '6px';
      dot.style.height = '6px';
      ring.style.width  = '32px';
      ring.style.height = '32px';
      ring.style.borderColor = 'var(--cyan)';
    });
  });

  // Hide when leaving window
  document.addEventListener('mouseleave', () => {
    dot.style.opacity  = '0';
    ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    dot.style.opacity  = '1';
    ring.style.opacity = '0.6';
  });
})();


/* ── 2. STICKY NAV + ACTIVE LINK HIGHLIGHT ─────────────────── */
(function initNav() {
  const nav        = document.querySelector('nav');
  const scrollBtn  = document.querySelector('.scroll-button a');
  const sections   = document.querySelectorAll('section[id]');
  const navLinks   = document.querySelectorAll('.menu li a');

  function onScroll() {
    const scrollY = window.scrollY;

    // Sticky class
    if (scrollY > 20) {
      nav.classList.add('sticky');
      if (scrollBtn) scrollBtn.style.display = 'block';
    } else {
      nav.classList.remove('sticky');
      if (scrollBtn) scrollBtn.style.display = 'none';
    }

    // Active nav link — highlight whichever section is in view
    let currentId = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 100;
      if (scrollY >= top) currentId = sec.getAttribute('id');
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + currentId) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load
})();


/* ── 3. MOBILE MENU ─────────────────────────────────────────── */
(function initMobileMenu() {
  const body      = document.querySelector('body');
  const navBar    = document.querySelector('.navbar');
  const menuBtn   = document.querySelector('.menu-btn');
  const cancelBtn = document.querySelector('.cancel-btn');
  const scrollBtn = document.querySelector('.scroll-button a');
  const navLinks  = document.querySelectorAll('.menu li a');

  if (!menuBtn || !cancelBtn) return;

  function openMenu() {
    navBar.classList.add('active');
    menuBtn.style.opacity       = '0';
    menuBtn.style.pointerEvents = 'none';
    body.style.overflow         = 'hidden';
    if (scrollBtn) scrollBtn.style.pointerEvents = 'none';
  }

  function closeMenu() {
    navBar.classList.remove('active');
    menuBtn.style.opacity       = '1';
    menuBtn.style.pointerEvents = 'auto';
    body.style.overflow         = 'auto';
    if (scrollBtn) scrollBtn.style.pointerEvents = 'auto';
  }

  menuBtn.addEventListener('click', openMenu);
  cancelBtn.addEventListener('click', closeMenu);
  navLinks.forEach(link => link.addEventListener('click', closeMenu));
})();


/* ── 4. SCROLL-TO-TOP BUTTON ────────────────────────────────── */
// Handled inside section 2 (sticky nav scroll listener).


/* ── 5. TYPEWRITER EFFECT ───────────────────────────────────── */
(function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;

  const phrases = [
    'Full Stack Developer',
    'AI Engineer',
    'Automation Specialist',
    'Problem Solver',
    'Open Source Contributor',
  ];

  let phraseIndex = 0;
  let charIndex   = 0;
  let isDeleting  = false;
  let isPaused    = false;

  const TYPING_SPEED   = 80;
  const DELETING_SPEED = 40;
  const PAUSE_AFTER    = 1800;
  const PAUSE_BEFORE   = 400;

  function tick() {
    const phrase  = phrases[phraseIndex];
    const current = phrase.substring(0, charIndex);
    el.textContent = current;

    if (isPaused) return;

    if (!isDeleting) {
      // Typing
      if (charIndex < phrase.length) {
        charIndex++;
        setTimeout(tick, TYPING_SPEED);
      } else {
        // Finished typing — pause then delete
        isPaused = true;
        setTimeout(() => {
          isPaused  = false;
          isDeleting = true;
          tick();
        }, PAUSE_AFTER);
      }
    } else {
      // Deleting
      if (charIndex > 0) {
        charIndex--;
        setTimeout(tick, DELETING_SPEED);
      } else {
        // Finished deleting — move to next phrase
        isDeleting   = false;
        phraseIndex  = (phraseIndex + 1) % phrases.length;
        isPaused     = true;
        setTimeout(() => {
          isPaused = false;
          tick();
        }, PAUSE_BEFORE);
      }
    }
  }

  // Small delay before starting so hero loads first
  setTimeout(tick, 800);
})();


/* ── 6. SKILL BAR ANIMATION (triggered on scroll into view) ─── */
(function initSkillBars() {
  const bars = document.querySelectorAll('.skill-bar');
  if (!bars.length) return;

  // CSS handles the animation via @keyframes growBar,
  // but we reset width to 0 and re-trigger when in viewport.
  bars.forEach(bar => {
    bar.style.width = '0';
    bar.style.animationPlayState = 'paused';
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(bar => observer.observe(bar));
})();


/* ── 7. TECH ARSENAL LOGO RAIN ──────────────────────────────── */
(function initLogoRain() {
  const container = document.querySelector('#rain-container');
  if (!container) return;

  const logos = [
    'https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg',
    'https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg',
    'https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg',
    'https://raw.githubusercontent.com/devicons/devicon/master/icons/cplusplus/cplusplus-original.svg',
    'https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg',
    'https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original.svg',
    'https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg',
    'https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg',
    'https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg',
    'https://raw.githubusercontent.com/devicons/devicon/master/icons/django/django-plain.svg',
    'https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original.svg',
    'https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg',
    'https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg',
    'https://raw.githubusercontent.com/devicons/devicon/master/icons/github/github-original.svg',
    'https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg',
    'https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg',
    'https://raw.githubusercontent.com/devicons/devicon/master/icons/tensorflow/tensorflow-original.svg',
    'https://raw.githubusercontent.com/devicons/devicon/master/icons/pytorch/pytorch-original.svg',
    'https://raw.githubusercontent.com/devicons/devicon/master/icons/numpy/numpy-original.svg',
    'https://raw.githubusercontent.com/devicons/devicon/master/icons/pandas/pandas-original.svg',
    'https://raw.githubusercontent.com/devicons/devicon/master/icons/jupyter/jupyter-original.svg',
    'https://raw.githubusercontent.com/devicons/devicon/master/icons/vscode/vscode-original.svg',
    'https://raw.githubusercontent.com/devicons/devicon/master/icons/googlecloud/googlecloud-original.svg',
    'https://raw.githubusercontent.com/devicons/devicon/master/icons/linux/linux-original.svg',
    'https://cdn.worldvectorlogo.com/logos/figma-icon.svg',
  ];

  let idx = 0;

  function createLogo() {
    const img = document.createElement('img');
    img.src       = logos[idx++ % logos.length];
    img.className = 'logos';
    img.style.left             = Math.random() * 95 + 'vw';
    img.style.width            = (24 + Math.random() * 16) + 'px';
    img.style.animationDuration = (6 + Math.random() * 6) + 's';
    img.style.animationDelay   = '0s';
    container.appendChild(img);
    setTimeout(() => img.remove(), 12000);
  }

  const interval = setInterval(createLogo, 380);

  // Pause rain when section not visible (perf)
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        if (!interval) setInterval(createLogo, 380);
      }
    });
  }, { threshold: 0.1 });
  observer.observe(container);
})();


/* ── 8. SCROLL REVEAL ───────────────────────────────────────── */
(function initScrollReveal() {
  // Add .reveal class to elements we want to animate in
  const targets = [
    '.project-card',
    '.box',
    '.why-card',
    '.workflow-step',
    '.tl-item',
    '.cert-card',
    '.arsenal-group',
    '.about-stat',
    '.mini-card',
    '.channel-card',
    '.stat-pill',
  ];

  const allTargets = document.querySelectorAll(targets.join(', '));

  allTargets.forEach((el, i) => {
    el.classList.add('reveal');
    // Stagger siblings within same parent
    el.style.transitionDelay = (i % 6) * 0.08 + 's';
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal--visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  allTargets.forEach(el => observer.observe(el));

  // Safety net: if an element is already in the viewport at load time
  // (e.g. hero/about cards on short pages, or fast initial paint),
  // make sure it gets revealed even if the observer is slow to fire.
  requestAnimationFrame(() => {
    allTargets.forEach(el => {
      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (inView) el.classList.add('reveal--visible');
    });
  });
})();


/* ── 9. STAT COUNTER ANIMATION ──────────────────────────────── */
(function initCounters() {
  // Target elements: .about-stat-num and .stat-pill .stat-num
  const counters = document.querySelectorAll('.about-stat-num, .stat-pill .stat-num');
  if (!counters.length) return;

  function parseTarget(text) {
    // e.g. "20+", "1K+", "3+"
    const raw = text.replace(/[^0-9KkMm.]/g, '');
    if (raw.includes('K') || raw.includes('k')) return parseFloat(raw) * 1000;
    return parseFloat(raw) || 0;
  }

  function formatValue(val, original) {
    if (original.includes('K') || original.includes('k')) {
      return Math.round(val / 1000) + 'K+';
    }
    return Math.round(val) + '+';
  }

  function animateCounter(el) {
    const original = el.textContent.trim();
    const target   = parseTarget(original);
    if (!target) return;

    const duration = 1600;
    const start    = performance.now();

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      // Ease out quad
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = formatValue(eased * target, original);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = original; // restore exact original
    }

    requestAnimationFrame(step);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
})();


/* ── 10. PROJECT CARD SUBTLE TILT ───────────────────────────── */
(function initTilt() {
  const cards = document.querySelectorAll('.project-card, .cert-card, .why-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      // Skip tilt until the card has finished its reveal animation,
      // otherwise this transform fights with the .reveal transform
      // and the card appears stuck/offset.
      if (!card.classList.contains('reveal--visible') && card.classList.contains('reveal')) return;

      const rect   = card.getBoundingClientRect();
      const x      = e.clientX - rect.left;
      const y      = e.clientY - rect.top;
      const centerX = rect.width  / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) *  5;
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();


/* ── 11. CHIP GLOW ON HOVER (arsenal) ──────────────────────── */
(function initChipHover() {
  document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('mouseenter', () => {
      chip.style.transform = 'translateY(-2px) scale(1.05)';
    });
    chip.addEventListener('mouseleave', () => {
      chip.style.transform = '';
    });
  });
})();


/* ── 12. TIMELINE REVEAL WITH LINE DRAW ─────────────────────── */
(function initTimeline() {
  const items = document.querySelectorAll('.tl-item');
  if (!items.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('tl-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  items.forEach(item => observer.observe(item));
})();


/* ── 13. EMAILJS CONTACT FORM ───────────────────────────────── */
window.addEventListener('load', function () {
  // Init EmailJS
  if (typeof emailjs !== 'undefined') {
    emailjs.init('rZSLVfMpztSYGjIlp');
  }

  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const submitBtn  = form.querySelector('button[type="submit"]');
    const btnText    = submitBtn.querySelector('span');
    const btnIcon    = submitBtn.querySelector('.btn-icon');
    const originalText = btnText.textContent;

    // Loading state
    submitBtn.disabled      = true;
    btnText.textContent     = 'Sending...';
    btnIcon.className       = 'fas fa-spinner fa-spin btn-icon';

    emailjs.sendForm('service_jmvjhhh', 'template_q1e5lju', this)
      .then(() => {
        btnText.textContent = 'Sent!';
        btnIcon.className   = 'fas fa-check btn-icon';
        submitBtn.style.background = 'var(--green)';
        submitBtn.style.boxShadow  = '0 0 16px var(--green)';
        form.reset();

        setTimeout(() => {
          btnText.textContent        = originalText;
          btnIcon.className          = 'fas fa-paper-plane btn-icon';
          submitBtn.disabled         = false;
          submitBtn.style.background = '';
          submitBtn.style.boxShadow  = '';
        }, 3000);
      })
      .catch(err => {
        console.error('EmailJS error:', err);
        btnText.textContent = 'Failed — try again';
        btnIcon.className   = 'fas fa-times btn-icon';
        submitBtn.style.background = 'var(--magenta)';
        submitBtn.disabled  = false;

        setTimeout(() => {
          btnText.textContent        = originalText;
          btnIcon.className          = 'fas fa-paper-plane btn-icon';
          submitBtn.style.background = '';
        }, 3000);
      });
  });
});


/* ── UTILITY: Smooth scroll for all anchor links ────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
