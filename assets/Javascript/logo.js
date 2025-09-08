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
});