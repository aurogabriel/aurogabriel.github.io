// Minimal lightbox: click any [data-gallery] link; arrows/Esc navigate within its article.
(() => {
  const box = document.querySelector('.lightbox');
  const img = box.querySelector('img');
  const cap = box.querySelector('figcaption');
  let items = [], idx = 0;

  const show = () => {
    const a = items[idx];
    img.src = a.href;
    const caption = a.dataset.caption || a.querySelector('img').alt;
    img.alt = caption;
    cap.textContent = caption;
  };
  const close = () => { box.hidden = true; img.src = ''; };
  const step = d => { idx = (idx + d + items.length) % items.length; show(); };

  document.querySelectorAll('a[data-gallery]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      items = [...a.closest('article').querySelectorAll('a[data-gallery]')];
      idx = items.indexOf(a);
      box.hidden = false;
      show();
    });
  });
  box.querySelector('.close').onclick = close;
  box.querySelector('.prev').onclick = () => step(-1);
  box.querySelector('.next').onclick = () => step(1);
  box.addEventListener('click', e => { if (e.target === box) close(); });
  document.addEventListener('keydown', e => {
    if (box.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') step(-1);
    if (e.key === 'ArrowRight') step(1);
  });
})();
