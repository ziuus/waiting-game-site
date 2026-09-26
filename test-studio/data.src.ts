import { describe, it, expect } from 'vitest';
import { LB, GN, SS } from '../src/data.js';

describe('data — leaderboard payloads (LB)', () => {
  it('has all six game keys', () => {
    expect(Object.keys(LB)).toEqual(['dino', 'flappy', 'gravity', 'snake', 'breakout', 'defender']);
  });

  it.each([
    ['dino', 5, 2450],
    ['flappy', 3, 145],
    ['gravity', 3, 3200],
    ['snake', 3, 580],
    ['breakout', 3, 5200],
    ['defender', 3, 7800],
  ])('LB[%s] has %d entries — top score %d', (game, count, topScore) => {
    const entries: Array<{ u: string; s: number; d: string }> = LB[game as keyof typeof LB];
    expect(entries.length).toBe(count);
    expect(entries[0].s).toBe(topScore);
    expect(entries[0].u).toBeTruthy();
    expect(typeof entries[0].d).toBe('string');
  });

  it.each(['dino', 'flappy', 'gravity', 'snake', 'breakout', 'defender'])(
    'LB[%s][0] entry shape is {u, s, d}',
    (game) => {
      const first = LB[game as keyof typeof LB][0];
      expect(first).toHaveProperty('u');
      expect(first).toHaveProperty('s');
      expect(first).toHaveProperty('d');
    },
  );

  it('scores are numeric and positive', () => {
    for (const entries of Object.values(LB) as Array<{ s: number }[]>) {
      for (const e of entries) {
        expect(typeof e.s).toBe('number');
        expect(e.s).toBeGreaterThan(0);
      }
    }
  });

  it('Zius is #1 on dino leaderboard', () => {
    expect(LB.dino[0].u).toBe('Zius');
    expect(LB.dino[0].s).toBeGreaterThan(LB.dino[1].s);
  });
});

describe('data — game name map (GN)', () => {
  it('has all six game keys', () => {
    expect(Object.keys(GN)).toEqual(['dino', 'flappy', 'gravity', 'snake', 'breakout', 'defender']);
  });

  it('every entry is a non-empty string', () => {
    for (const name of Object.values(GN)) {
      expect(typeof name).toBe('string');
      expect(name.length).toBeGreaterThan(0);
    }
  });

  it('GN[dino] is "Dino Runner"', () => {
    expect(GN.dino).toBe('Dino Runner');
  });
});

describe('data — screenshot gallery (SS)', () => {
  it('has all six game keys', () => {
    expect(Object.keys(SS)).toEqual(['dino', 'flappy', 'gravity', 'snake', 'breakout', 'defender']);
  });

  it.each(['dino', 'flappy', 'gravity', 'snake', 'breakout', 'defender'])(
    'SS[%s].imgs is a non-empty array of strings',
    (game) => {
      const imgs = SS[game as keyof typeof SS].imgs;
      expect(Array.isArray(imgs)).toBe(true);
      expect(imgs.length).toBeGreaterThan(0);
      for (const img of imgs) {
        expect(typeof img).toBe('string');
        expect(img.endsWith('.png')).toBe(true);
        expect(img.startsWith('Pictures/')).toBe(true);
      }
    },
  );

  it('Dino has the most screenshots (4)', () => {
    expect(SS.dino.imgs.length).toBe(4);
  });
});
