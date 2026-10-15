(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  document.querySelectorAll('[data-gallery]').forEach((gallery) => {
    const track = gallery.querySelector('.hobby-track');
    const slides = Array.from(track.children);
    const controls = gallery.querySelector('.hobby-controls');
    const counter = gallery.querySelector('.hobby-counter');
    const previous = gallery.querySelector('[data-direction="-1"]');
    const next = gallery.querySelector('[data-direction="1"]');
    let frame;

    const currentIndex = () => Math.max(0, Math.min(
      slides.length - 1,
      Math.round(track.scrollLeft / (track.clientWidth || 1))
    ));

    const update = () => {
      const index = currentIndex();
      counter.textContent = `${String(index + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
      previous.disabled = index === 0;
      next.disabled = index === slides.length - 1;
    };

    const goTo = (index) => {
      const target = Math.max(0, Math.min(slides.length - 1, index));
      track.scrollTo({
        left: target * track.clientWidth,
        behavior: reducedMotion.matches ? 'instant' : 'smooth'
      });
    };

    previous.addEventListener('click', () => goTo(currentIndex() - 1));
    next.addEventListener('click', () => goTo(currentIndex() + 1));
    track.addEventListener('keydown', (event) => {
      if (event.target !== track) return;
      const targets = {
        ArrowLeft: currentIndex() - 1,
        ArrowRight: currentIndex() + 1,
        Home: 0,
        End: slides.length - 1
      };
      if (!(event.key in targets)) return;
      event.preventDefault();
      goTo(targets[event.key]);
    });
    track.addEventListener('scroll', () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    }, { passive: true });
    window.addEventListener('resize', update);
    controls.hidden = slides.length < 2;
    update();
  });
})();
