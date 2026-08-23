(() => {
  const body = document.body;
  const menuButton = document.querySelector('.menu-button');
  const closeButton = document.querySelector('.sidebar-close');
  const backdrop = document.querySelector('.sidebar-backdrop');
  const tocLinks = [...document.querySelectorAll('.toc a[href^="#"]')];
  const sections = tocLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  const setMenu = (open) => {
    body.classList.toggle('menu-open', open);
    menuButton?.setAttribute('aria-expanded', String(open));
  };

  menuButton?.addEventListener('click', () => setMenu(!body.classList.contains('menu-open')));
  closeButton?.addEventListener('click', () => setMenu(false));
  backdrop?.addEventListener('click', () => setMenu(false));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setMenu(false);
  });
  tocLinks.forEach((link) => link.addEventListener('click', () => setMenu(false)));

  const activateLink = (id) => {
    tocLinks.forEach((link) => {
      const active = link.getAttribute('href') === `#${id}`;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  };

  if ('IntersectionObserver' in window) {
    const visible = new Map();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) visible.set(entry.target.id, entry.boundingClientRect.top);
        else visible.delete(entry.target.id);
      });
      const current = [...visible.entries()].sort((a, b) => Math.abs(a[1]) - Math.abs(b[1]))[0];
      if (current) activateLink(current[0]);
    }, { rootMargin: '-15% 0px -68% 0px', threshold: [0, .1] });
    sections.forEach((section) => observer.observe(section));
  }

  document.querySelectorAll('.screenshot').forEach((figure) => {
    const image = figure.querySelector('img');
    if (!image) return;
    const markLoaded = () => figure.classList.add('has-image');
    if (image.complete && image.naturalWidth > 0) markLoaded();
    image.addEventListener('load', markLoaded);
    image.addEventListener('error', () => figure.classList.remove('has-image'));
  });

  const toast = document.querySelector('.copy-toast');
  let toastTimer;
  const showToast = () => {
    if (!toast) return;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 1600);
  };

  document.querySelectorAll('.copy-button').forEach((button) => {
    button.addEventListener('click', async () => {
      const container = button.closest('.code-card, .prompt-box');
      const source = container?.querySelector('code, p');
      if (!source) return;
      const value = source.textContent.trim();
      try {
        await navigator.clipboard.writeText(value);
      } catch {
        const textarea = document.createElement('textarea');
        textarea.value = value;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        textarea.remove();
      }
      const previous = button.textContent;
      button.textContent = '已复制';
      showToast();
      setTimeout(() => { button.textContent = previous; }, 1400);
    });
  });
})();
