if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

if (window.location.hash) {
  window.history.replaceState(null, document.title, `${window.location.pathname}${window.location.search}`);
}

window.scrollTo(0, 0);

const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const yearEl = document.getElementById('year');
const tiltElements = document.querySelectorAll('.profile-card, .skill-card, .project-card, .timeline-content, .certification-card, .resume-card, .card-panel, .contact-box, .mini-stats li');
const educationImages = document.querySelectorAll('.education-image');
const introScreen = document.querySelector('.intro-screen');
const cursorDot = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');
const typingText = document.querySelector('.typing-text');
const visitorCounter = document.querySelector('.visitor-counter');
const visitorCount = document.querySelector('.visitor-count');

const revealSections = document.querySelectorAll('.section-block');
const revealItems = document.querySelectorAll('.skills-grid > *, .project-grid > *, .certification-grid > *, .about-grid > *, .timeline-item, .resume-card');

revealSections.forEach((section) => section.classList.add('reveal-on-scroll'));
revealItems.forEach((item, index) => {
  item.classList.add('reveal-item');
  item.style.setProperty('--reveal-delay', `${(index % 4) * 90}ms`);
});

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealSections.forEach((section) => revealObserver.observe(section));

if (typingText) {
  const typingPhrases = [
    'I Build Modern Web Applications',
    'I Turn Ideas Into Products',
    'I Create AI-Powered Solutions',
    'I Solve Real-World Problems'
  ];
  let phraseIndex = 0;
  let characterIndex = 0;
  let deleting = false;

  const typePhrase = () => {
    const phrase = typingPhrases[phraseIndex];
    typingText.textContent = phrase.slice(0, characterIndex);

    if (!deleting && characterIndex < phrase.length) {
      characterIndex += 1;
      window.setTimeout(typePhrase, 70);
      return;
    }

    if (!deleting) {
      deleting = true;
      window.setTimeout(typePhrase, 1800);
      return;
    }

    if (characterIndex > 0) {
      characterIndex -= 1;
      window.setTimeout(typePhrase, 38);
      return;
    }

    deleting = false;
    phraseIndex = (phraseIndex + 1) % typingPhrases.length;
    window.setTimeout(typePhrase, 350);
  };

  typePhrase();
}

if (visitorCounter && visitorCount) {
  const countApiUrl = 'https://api.countapi.xyz/hit/praveenkumar1411-portfolio/home';

  fetch(countApiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`CountAPI returned HTTP ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      if (!Number.isFinite(data.value)) {
        throw new Error('CountAPI returned an invalid visit count');
      }

      const target = data.value;
      const duration = 900;
      const startedAt = performance.now();

      const animateCount = (now) => {
        const progress = Math.min((now - startedAt) / duration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const displayedCount = Math.max(1, Math.round(target * easedProgress));
        visitorCount.textContent = `${displayedCount.toLocaleString('en-US')} ${displayedCount === 1 ? 'visit' : 'visits'}`;

        if (progress < 1) {
          window.requestAnimationFrame(animateCount);
        } else {
          visitorCounter.classList.add('is-loaded');
        }
      };

      window.requestAnimationFrame(animateCount);
    })
    .catch((error) => {
      console.error('Unable to load visitor count:', error);
      visitorCounter.classList.add('is-error');
    });
}

document.body.classList.add('intro-active');

if (introScreen) {
  window.setTimeout(() => {
    introScreen.classList.add('is-opening');
    document.body.classList.add('hero-entering');
  }, 3650);

  window.setTimeout(() => {
    introScreen.remove();
    document.body.classList.remove('intro-active');
  }, 5600);
}

if (cursorDot && cursorRing && window.matchMedia('(pointer: fine)').matches) {
  let cursorX = -100;
  let cursorY = -100;
  let ringX = -100;
  let ringY = -100;
  let cursorFrame = null;
  let previousFrameTime = 0;
  let pointerInitialized = false;

  document.body.classList.add('cursor-ready');

  const moveCursor = (time) => {
    const frameDelta = previousFrameTime ? Math.min(time - previousFrameTime, 32) : 16;
    previousFrameTime = time;
    const follow = 1 - Math.exp(-frameDelta / 85);
    ringX += (cursorX - ringX) * follow;
    ringY += (cursorY - ringY) * follow;
    cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;

    if (Math.hypot(cursorX - ringX, cursorY - ringY) > 0.15) {
      cursorFrame = window.requestAnimationFrame(moveCursor);
    } else {
      ringX = cursorX;
      ringY = cursorY;
      cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      cursorFrame = null;
      previousFrameTime = 0;
    }
  };

  document.addEventListener('pointermove', (event) => {
    cursorX = event.clientX;
    cursorY = event.clientY;

    if (!pointerInitialized) {
      pointerInitialized = true;
      ringX = cursorX;
      ringY = cursorY;
      cursorDot.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
      cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      return;
    }

    cursorDot.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
    if (cursorFrame === null) {
      cursorFrame = window.requestAnimationFrame(moveCursor);
    }
  }, { passive: true });

  document.querySelectorAll('a, button, img, .skill-card, .project-card, .timeline-content, .certification-card, .resume-card, .card-panel, .contact-box, .mini-stats li, .tags span, .semester-cgpa span').forEach((element) => {
    element.addEventListener('pointerenter', () => cursorRing.classList.add('is-hovering'));
    element.addEventListener('pointerleave', () => cursorRing.classList.remove('is-hovering'));
  });
}

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const sectionLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
let sectionTransitionActive = false;

const openSectionWithTransition = (sectionId) => {
  const section = document.getElementById(sectionId);
  const sectionTitle = section?.querySelector('.eyebrow')?.textContent.trim();

  if (!section || !sectionTitle || sectionTransitionActive) {
    return;
  }

  sectionTransitionActive = true;
  const transition = document.createElement('div');
  const backdrop = document.createElement('div');
  const content = document.createElement('div');
  const mark = document.createElement('span');
  const title = document.createElement('div');
  transition.className = `section-transition section-transition-${sectionId}`;
  transition.setAttribute('aria-label', `Opening ${sectionTitle}`);
  backdrop.className = 'section-transition-backdrop';
  backdrop.setAttribute('aria-hidden', 'true');
  content.className = 'section-transition-content';
  mark.className = `section-transition-mark section-transition-mark-${sectionId}`;
  mark.setAttribute('aria-hidden', 'true');
  if (sectionId === 'education' || sectionId === 'about') {
    const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const iconPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    icon.setAttribute('viewBox', '0 0 24 24');
    icon.setAttribute('focusable', 'false');
    iconPath.setAttribute('d', sectionId === 'education'
      ? 'M3 9 12 4l9 5M5 10v8M9 10v8M15 10v8M19 10v8M3 20h18M2 22h20'
      : 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4.5 20.5c.7-3.7 3.3-5.5 7.5-5.5s6.8 1.8 7.5 5.5');
    icon.append(iconPath);
    mark.append(icon);
  } else {
    mark.textContent = sectionId === 'certifications' ? 'CERT' : sectionId === 'resume' ? 'CV' : sectionTitle.slice(0, 3).toUpperCase();
  }
  title.className = 'section-transition-title';
  title.textContent = sectionTitle;
  content.append(mark, title);
  transition.append(backdrop, content);
  document.body.append(transition);
  document.body.classList.add('intro-active');

  window.requestAnimationFrame(() => {
    transition.classList.add('is-live');
  });

  window.history.pushState({}, document.title, `#${sectionId}`);

  window.setTimeout(() => {
    transition.classList.add('is-opening');
  }, 300);

  window.setTimeout(() => {
    transition.remove();
    document.body.classList.remove('intro-active');
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    sectionTransitionActive = false;
  }, 1400);
};

sectionLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const sectionId = link.getAttribute('href')?.slice(1);

    if (sectionId === 'home') {
      return;
    }

    if (sectionId && document.getElementById(sectionId)) {
      event.preventDefault();
      openSectionWithTransition(sectionId);
    }
  });
});

if (tiltElements.length) {
  tiltElements.forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      const rotateY = (x - 0.5) * 16;
      const rotateX = (0.5 - y) * 16;

      card.style.setProperty('--rx', `${rotateX.toFixed(2)}deg`);
      card.style.setProperty('--ry', `${rotateY.toFixed(2)}deg`);
    });

    card.addEventListener('pointerleave', () => {
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
    });
  });
}

const openFullscreen = (image) => {
  if (image?.requestFullscreen) {
    image.requestFullscreen();
  }
};

educationImages.forEach((image) => {
  image.addEventListener('click', () => openFullscreen(image));
});
