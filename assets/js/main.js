document.addEventListener('DOMContentLoaded', () => {
  // =================================================================
  // --- INTERACTIVE HEADER LOGO ---
  // =================================================================
  // This splits the "Prismabit" wordmark into individual letters to allow for the rainbow hover effect.
  const wordmark = document.getElementById('header-wordmark');
  if (wordmark) {
    const text = wordmark.textContent.trim();
    wordmark.textContent = ''; // clear
    [...text].forEach((ch, idx) => {
      const span = document.createElement('span');
      span.className = 'rainbow-letter';
      span.textContent = ch;
      span.setAttribute('aria-label', ch);
      span.style.transitionDelay = `${(idx * 8)}ms`;
      wordmark.appendChild(span);
    });
  }

  // Subtle lift effect on the wordmark when hovering the logo.
  const headerLogo = document.getElementById('header-logo');
  if (headerLogo && wordmark) {
    headerLogo.addEventListener('mouseenter', () => {
      wordmark.style.transform = 'translateY(-0.5px)';
    });
    headerLogo.addEventListener('mouseleave', () => {
      wordmark.style.transform = '';
    });
  }

  // =================================================================
  // --- NAVBAR SCROLL BEHAVIOR ---
  // =================================================================
  // Keep navbar fixed and visible. Match background to page at top, then apply glassmorphism on scroll.
  const headerNav = document.getElementById('header-nav');
  if (headerNav) {
    let ticking = false;

    // Ensure navbar is fixed and visible
    headerNav.style.transform = 'translateY(0)';

    // Helper: set solid background to match page primary color
    const setSolidPrimaryBackground = () => {
      const bodyBg = getComputedStyle(document.body).backgroundColor;
      headerNav.style.backgroundColor = bodyBg;
      headerNav.classList.add('backdrop-blur-sm', 'border-white/20');
      headerNav.classList.remove('bg-[#06141B]/10', 'backdrop-blur-xl', 'shadow-md', 'border-[#4A5C6A]/20');
    };

    // Helper: set glassmorphism style
    const setGlassBackground = () => {
      headerNav.style.backgroundColor = '';
      headerNav.classList.add('bg-[#06141B]/10', 'backdrop-blur-xl', 'shadow-md', 'border-[#4A5C6A]/20');
      headerNav.classList.remove('backdrop-blur-sm', 'border-white/20');
    };

    // Initialize with solid background matching page
    setSolidPrimaryBackground();

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > 50) {
        setGlassBackground();
      } else {
        setSolidPrimaryBackground();
      }
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(handleScroll);
        ticking = true;
      }
    });

    // Recompute on resize (in case themes/bg change)
    window.addEventListener('resize', () => {
      if ((window.pageYOffset || document.documentElement.scrollTop) <= 50) {
        setSolidPrimaryBackground();
      }
    });
  }
  

  // =================================================================
  // --- REVEAL ON SCROLL ---
  // =================================================================
  // This uses the Intersection Observer API to add/remove a 'visible' class to elements as they enter/leave the viewport.
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Special handling for the floating card section
        if (entry.target.id === 'services-sticky-parent') {
          entry.target.style.transform = 'scale(1)';
          entry.target.style.opacity = '1';
        }
      } else {
        entry.target.classList.remove('visible');
        // Reset special handling
        if (entry.target.id === 'services-sticky-parent') {
          entry.target.style.transform = '';
          entry.target.style.opacity = '';
        }
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal-on-scroll, .service-card-scroll').forEach(el => observer.observe(el));
  
  // =================================================================
  // --- MOBILE HAMBURGER MENU ---
  // =================================================================
  // Toggles the visibility of the mobile navigation menu and the open/close icons.
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuOpenIcon = document.getElementById('menu-open-icon');
  const menuCloseIcon = document.getElementById('menu-close-icon');

  if (mobileMenuButton && mobileMenu && menuOpenIcon && menuCloseIcon) {
    mobileMenuButton.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      menuOpenIcon.classList.toggle('hidden');
      menuCloseIcon.classList.toggle('hidden');
    });
  }

  // =================================================================
  // --- WHATSAPP FAB VISIBILITY ---
  // =================================================================
  // The FAB is hidden by default. This makes it visible on all pages.
  // This logic centralizes the visibility trigger for all scenarios.
  const fab = document.querySelector('.whatsapp-fab');
  if (fab) {
    const splashContainer = document.getElementById('splash-container');
    const urlParams = new URLSearchParams(window.location.search);
    const skipSplash = urlParams.get("nosplash") === "true";

    // This logic handles showing the button on all pages *except* for the
    // homepage when the splash screen is running. The visibility on the homepage
    // is handled by the inline script in index.html.
    //
    // The button will be shown if:
    // 1. There is no splash container (i.e., not the homepage).
    // 2. The splash screen is explicitly skipped via URL parameter.
    if (!splashContainer || skipSplash) {
      // Show the button after a brief delay to let the page settle.
      setTimeout(() => {
        fab.classList.remove('hidden');
      }, 300);
    }
  }
});