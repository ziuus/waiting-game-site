import { renderLeaderboard } from './leaderboard.js';
import { openLB, closeLB } from './lightbox.js';
import { initTabs } from './tabs.js';
import { initReveal } from './reveal.js';

// Attach to window for inline onclick handlers in HTML
window.openLB = openLB;
window.closeLB = closeLB;

document.addEventListener('DOMContentLoaded', () => {
  // Leaderboard
  const btns = document.querySelectorAll('#lb-filters button');
  const tb = document.getElementById('lb-body');
  let g = 'dino';
  btns.forEach((b) =>
    b.addEventListener('click', () => {
      btns.forEach((x) => x.classList.remove('active'));
      b.classList.add('active');
      g = b.dataset.game;
      renderLeaderboard(tb, g);
    }),
  );
  renderLeaderboard(tb, g);

  initTabs();
  initReveal();
});
