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
}, 50); // 50ms debounce time

window.addEventListener('scroll', handleScroll);