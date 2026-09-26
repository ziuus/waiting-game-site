import { describe, it, expect, beforeEach } from 'vitest';
import { openLB, closeLB } from '../src/lightbox.js';

let lb: HTMLElement, lbTitle: HTMLElement, lbSub: HTMLElement, lbGal: HTMLElement;

beforeEach(() => {
  document.body.innerHTML = `
    <div class="lb" id="lb">
      <div class="lb-inner">
        <button class="lb-x">✕</button>
        <h2 id="lb-title"></h2>
        <p class="sub" id="lb-sub"></p>
        <div class="lb-gal" id="lb-gal"></div>
      </div>
    </div>
  `;
  lb = document.getElementById('lb')!;
  lbTitle = document.getElementById('lb-title')!;
  lbSub = document.getElementById('lb-sub')!;
  lbGal = document.getElementById('lb-gal')!;
});

describe('lightbox integration — openLB/closeLB', () => {
  it('openLB sets title, subtitle, and images; closeLB reverts', () => {
    openLB('dino');
    expect(lb.classList.contains('open')).toBe(true);
    expect(lbTitle.textContent).toBe('Dino Runner');
    expect(lbSub.textContent).toBe('Screenshots');
    expect(lbGal.querySelectorAll('img').length).toBe(4);

    closeLB({ target: lb });
    expect(lb.classList.contains('open')).toBe(false);
  });

  it('closeLB ignores clicks inside lb-inner', () => {
    openLB('gravity');
    const inner = lb.querySelector('.lb-inner')!;
    const clickEvent = new MouseEvent('click', { bubbles: true });
    inner.dispatchEvent(clickEvent);
    expect(lb.classList.contains('open')).toBe(true);
  });
});
