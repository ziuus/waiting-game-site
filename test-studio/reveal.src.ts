import { describe, it, expect } from 'vitest';
import { initReveal } from '../src/reveal.js';

describe('reveal — initReveal', () => {
  it('selects all .reveal elements and leaves non-.reveal alone', () => {
    document.body.innerHTML = `
      <section class="reveal" id="s1"></section>
      <section class="reveal" id="s2"></section>
      <section id="s3"></section>
    `;
    initReveal();
    expect((document.getElementById('s1') as HTMLElement).classList.contains('reveal')).toBe(true);
    expect((document.getElementById('s2') as HTMLElement).classList.contains('reveal')).toBe(true);
    expect((document.getElementById('s3') as HTMLElement).classList.contains('reveal')).toBe(false);
  });
});
