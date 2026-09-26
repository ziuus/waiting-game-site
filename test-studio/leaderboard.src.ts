import { describe, it, expect, beforeEach } from 'vitest';
import { renderLeaderboard } from '../src/leaderboard.js';

let tbody: HTMLElement;

beforeEach(() => {
  document.body.innerHTML = `<table><tbody id="lb-body"></tbody></table>`;
  tbody = document.getElementById('lb-body')!;
});

describe('leaderboard — renderLeaderboard', () => {
  it('renders 5 dino rows with rank badges', () => {
    renderLeaderboard(tbody, 'dino');
    const rows = tbody.querySelectorAll('tr');
    expect(rows.length).toBe(5);
    expect(rows[0].querySelector('.sc')!.textContent).toBe('02450');
    expect(rows[0].querySelector('.rank')!.classList.contains('rank-gold')).toBe(true);
    expect(rows[1].querySelector('.rank')!.classList.contains('rank-silver')).toBe(true);
    expect(rows[2].querySelector('.rank')!.classList.contains('rank-bronze')).toBe(true);
    expect(rows[3].querySelector('.rank')!.classList.contains('rank-bronze')).toBe(false);
  });

  it('renders Flappy with 3 rows', () => {
    renderLeaderboard(tbody, 'flappy');
    expect(tbody.querySelectorAll('tr').length).toBe(3);
  });

  it('renders empty state for unknown game', () => {
    renderLeaderboard(tbody, 'doesnotexist');
    expect(tbody.innerHTML).toContain('No scores yet');
  });

  it('pads scores to 5 digits', () => {
    renderLeaderboard(tbody, 'snake');
    const scores = Array.from(tbody.querySelectorAll('.sc')).map((el) => (el as HTMLElement).textContent);
    expect(scores).toEqual(['00580', '00420', '00310']);
  });

  it('escapes HTML-safe rendering (no throw on valid data)', () => {
    expect(() => renderLeaderboard(tbody, 'dino')).not.toThrow();
  });
});
