document.addEventListener('DOMContentLoaded', () => {
  const burgers = Array.from(document.querySelectorAll('.navbar-burger'));

  burgers.forEach((burger) => {
    burger.addEventListener('click', () => {
      const targetId = burger.dataset.target;
      const target = targetId ? document.getElementById(targetId) : null;
      const expanded = burger.classList.toggle('is-active');

      burger.setAttribute('aria-expanded', String(expanded));
      if (target) {
        target.classList.toggle('is-active', expanded);
      }
    });
  });

  const menuLinks = Array.from(document.querySelectorAll('.navbar-menu a[href^="#"]'));
  menuLinks.forEach((link) => {
    link.addEventListener('click', () => {
      burgers.forEach((burger) => {
        const targetId = burger.dataset.target;
        const target = targetId ? document.getElementById(targetId) : null;
        burger.classList.remove('is-active');
        burger.setAttribute('aria-expanded', 'false');
        if (target) {
          target.classList.remove('is-active');
        }
      });
    });
  });

  document.querySelectorAll('.dataset-group').forEach((group) => {
    const buttons = Array.from(group.querySelectorAll('.dataset-btn'));
    const blocks = Array.from(group.querySelectorAll('.dataset-videos'));

    function showDataset(dataset) {
      blocks.forEach((block) => {
        const isActive = block.dataset.dataset === dataset;
        block.style.display = isActive ? 'block' : 'none';

        const video = block.querySelector('video');
        if (!video) return;

        if (isActive) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });

      buttons.forEach((button) => {
        button.classList.toggle('active', button.dataset.dataset === dataset);
      });
    }

    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        showDataset(button.dataset.dataset);
      });
    });

    const initial = buttons.find((button) => button.classList.contains('active')) || buttons[0];
    if (initial) {
      showDataset(initial.dataset.dataset);
    }
  });
});
