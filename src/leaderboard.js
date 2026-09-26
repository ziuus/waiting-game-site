import { LB } from './data.js';

export function renderLeaderboard(tbody, game) {
  const data = LB[game] || [];
  if (!data.length) {
    tbody.innerHTML = '<tr><td colspan="4" class="lb-empty">No scores yet.</td></tr>';
    return;
  }
  tbody.innerHTML = data
    .map((e, i) => {
      const rc = i === 0 ? 'rank-gold' : i === 1 ? 'rank-silver' : i === 2 ? 'rank-bronze' : '';
      const dt = e.d ? new Date(e.d).toLocaleDateString() : '—';
      return `<tr><td><span class="rank ${rc}">${i + 1}</span></td><td>${esc(e.u || 'Anon')}</td><td class="sc">${String(e.s).padStart(5, '0')}</td><td style="color:var(--text-dim);font-size:.8rem">${dt}</td></tr>`;
    })
    .join('');
}

function esc(s) {
  return (s || '').toString().replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
