/* Click-to-expand lightbox for gallery photos.
   Any photo in a gallery becomes clickable; clicking opens a larger view
   with the photo's description shown as a caption. */
(function () {
  var imgs = document.querySelectorAll('.photo-grid img, .about__photos img, .bio-article figure img');
  if (!imgs.length) return;

  var box = document.createElement('div');
  box.className = 'lightbox';
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-modal', 'true');
  box.innerHTML =
    '<button class="lightbox__close" type="button" aria-label="Close">×</button>' +
    '<img alt="">' +
    '<figcaption></figcaption>';
  document.body.appendChild(box);

  var bImg = box.querySelector('img');
  var bCap = box.querySelector('figcaption');
  var closeBtn = box.querySelector('.lightbox__close');
  var lastFocus = null;

  function open(src, caption) {
    lastFocus = document.activeElement;
    bImg.src = src;
    bImg.alt = caption || '';
    bCap.textContent = caption || '';
    box.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }
  function close() {
    box.classList.remove('is-open');
    bImg.removeAttribute('src');
    document.body.style.overflow = '';
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  imgs.forEach(function (im) {
    im.tabIndex = 0;
    im.setAttribute('role', 'button');
    if (im.alt) im.setAttribute('aria-label', 'Expand photo: ' + im.alt);
    // Short visual caption: data-caption if set, otherwise fall back to alt.
    // Keeps alt rich for screen readers while letting the lightbox show a punchy line.
    var cap = im.dataset.caption || im.alt;
    im.addEventListener('click', function () { open(im.currentSrc || im.src, cap); });
    im.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(im.currentSrc || im.src, cap); }
    });
  });

  box.addEventListener('click', function (e) { if (e.target === box || e.target === closeBtn) close(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && box.classList.contains('is-open')) close(); });
})();
