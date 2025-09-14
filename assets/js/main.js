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
  // This handles hiding the navbar on scroll down and showing it on scroll up, plus the glassmorphism effect.
  const headerNav = document.getElementById('header-nav');
  if (headerNav) {
    let lastScrollTop = 0;
    let ticking = false;

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      // Special handling for the services section on the homepage
      const servicesStickyParent = document.getElementById('services-sticky-parent');
      if (servicesStickyParent) {
        const rect = servicesStickyParent.getBoundingClientRect();
        // Check if we are scrolling within the sticky services section
        if (rect.top <= 0 && rect.bottom >= window.innerHeight) {
          // If inside the services section, force the navbar to be hidden
          headerNav.style.transform = 'translateY(-100%)';
          lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
          ticking = false;
          return; // Exit to prevent default show/hide logic
        }
      }

      // Hide navbar when scrolling down, show when scrolling up.
      if (scrollTop > lastScrollTop && scrollTop > headerNav.offsetHeight) {
        headerNav.style.transform = 'translateY(-100%)';
      } else {
        headerNav.style.transform = 'translateY(0)';
      }

      // Apply a "glassmorphism" effect when scrolled past a certain point (50px).
      // You can adjust the `bg-white/10` (10% opacity) and `backdrop-blur-xl` (extra large blur) classes here.
      if (scrollTop > 50) {
        headerNav.classList.add('bg-[#06141B]/10', 'backdrop-blur-xl', 'shadow-md', 'border-[#4A5C6A]/20');
        headerNav.classList.remove('bg-[#11212D]/80', 'backdrop-blur-sm', 'border-[#253745]');
      } else {
        // Revert to the default, less transparent style when at the top of the page.
        headerNav.classList.add('bg-[#11212D]/80', 'backdrop-blur-sm', 'border-[#253745]');
        headerNav.classList.remove('bg-[#06141B]/10', 'backdrop-blur-xl', 'shadow-md', 'border-[#4A5C6A]/20');
      }

      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Update last scroll position.
      ticking = false;
    };

    // Use requestAnimationFrame to ensure the scroll handler doesn't hurt performance.
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(handleScroll);
        ticking = true;
      }
    });
  }
  

  // =================================================================
  // --- REVEAL ON SCROLL ---
  // =================================================================
  // This uses the Intersection Observer API to add a 'visible' class to elements as they enter the viewport.
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
  
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
});