import { watchViewport } from 'tornis';

import './glsl-app';

(() => {
  const init = () => {
    const cursor = document.getElementById('cursor');

    if (!('ontouchstart' in window) && cursor) {
      document.body.classList.add('js--no-cursor');

      watchViewport(({ mouse }) => {
        if (mouse.changed) {
          const { x, y, velocity } = mouse;
          const { x: vx, y: vy } = velocity;
          const dv = Math.abs(vx ** 2 + vy ** 2);

          const opacity = 1 - Math.min(dv, 30) / 50;

          cursor.style.transform = `translate3D(${x}px, ${y}px, 0)`;
          cursor.style.opacity = opacity;
        }
      });

      [...document.querySelectorAll('a')].forEach(anchor => {
        anchor.addEventListener('mouseenter', () =>
          document.body.classList.add('js--cursor-hover')
        );

        anchor.addEventListener('mouseleave', () =>
          document.body.classList.remove('js--cursor-hover')
        );
      });
    }
  };

  document.addEventListener('DOMContentLoaded', init);
})();
