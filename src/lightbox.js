import { SS, GN, GH } from './data.js';

export function openLB(game) {
  const d = SS[game];
  if (!d) return;
  document.getElementById('lb-title').textContent = GN[game];
  document.getElementById('lb-sub').textContent = 'Screenshots';
  document.getElementById('lb-gal').innerHTML = d.imgs.map((s) => `<img src="${GH}/${s}" alt="${GN[game]}" loading="lazy" />`).join('');
  document.getElementById('lb').classList.add('open');
  document.body.style.overflow = 'hidden';
}

export function closeLB(event) {
  if (event && event.target !== document.getElementById('lb')) return;
  document.getElementById('lb').classList.remove('open');
  document.body.style.overflow = '';
}
