document.addEventListener('DOMContentLoaded', () => {
  // Split navbar "Prismabit" into per-letter spans
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

  // Scale effect on logo hover
  const headerLogo = document.getElementById('header-logo');
  if (headerLogo && wordmark) {
    headerLogo.addEventListener('mouseenter', () => {
      wordmark.style.transform = 'translateY(-0.5px)';
    });
    headerLogo.addEventListener('mouseleave', () => {
      wordmark.style.transform = '';
    });
  }

  // Navbar scroll hide functionality
  const headerNav = document.getElementById('header-nav');
  let lastScrollTop = 0;

  const handleScroll = debounce(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add threshold to prevent tiny scroll triggers
    if (Math.abs(scrollTop - lastScrollTop) < 10) return;
    
    // Hide only if scrolling down and past the header
    if (scrollTop > lastScrollTop && scrollTop > headerNav.offsetHeight) {
      headerNav.style.transform = 'translateY(-100%)';
    } else {
      headerNav.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  }, 50);

  window.addEventListener('scroll', handleScroll);

  // On-Scroll reveal
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.1 });
  
  document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
});

// Debounce function to limit how often a function can run
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}