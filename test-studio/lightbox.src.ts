import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { openLB } from '../src/lightbox.js';
import { GN } from '../src/data.js';

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

afterEach(() => {
  lb.classList.remove('open');
  (document.body as HTMLElement).style.overflow = '';
});

describe('lightbox — openLB', () => {
  it('opens overlay for dino with correct title and 4 images', () => {
    openLB('dino');
    expect(lb.classList.contains('open')).toBe(true);
    expect((document.body as HTMLElement).style.overflow).toBe('hidden');
    expect(lbTitle.textContent).toBe('Dino Runner');
    expect(lbSub.textContent).toBe('Screenshots');
    const imgs = lbGal.querySelectorAll('img');
    expect(imgs.length).toBe(4);
    for (const img of imgs) {
      expect(img.getAttribute('src')).toContain('https://github.com/ziuus/waiting-game/raw/master/');
      expect(img.getAttribute('alt')).toBe('Dino Runner');
    }
  });

  it('renders correct number of images for each game', () => {
    type GameKey = keyof typeof GN;
    const counts: Record<GameKey, number> = {
      flappy: 3,
      gravity: 2,
      snake: 2,
      breakout: 1,
      defender: 3,
    };
    for (const [game, count] of Object.entries(counts) as Array<[GameKey, number]>) {
      openLB(game);
      const imgs = lbGal.querySelectorAll('img');
      expect(imgs.length).toBe(count);
      const titleEl = document.getElementById('lb-title')!;
      expect(titleEl.textContent).toBe(GN[game]);
      lb.classList.remove('open');
      (document.body as HTMLElement).style.overflow = '';
    }
  });

  it('image src includes GH prefix and game name in alt', () => {
    openLB('flappy');
    const imgs = lbGal.querySelectorAll('img');
    expect(imgs.length).toBe(3);
    for (const img of imgs) {
      expect(img.getAttribute('src')).toContain('https://github.com/ziuus/waiting-game/raw/master/');
      expect(img.getAttribute('src')).toContain('Screenshot_');
      expect(img.getAttribute('alt')).toBe('Flappy Bird');
    }
  });

  it('closes body scroll when open', () => {
    openLB('gravity');
    expect((document.body as HTMLElement).style.overflow).toBe('hidden');
  });

  it('exits early for unknown game key', () => {
    const originalOverflow = (document.body as HTMLElement).style.overflow;
    openLB('nonexistent' as any);
    expect(lb.classList.contains('open')).toBe(false);
    expect((document.body as HTMLElement).style.overflow).toBe(originalOverflow);
  });
});
