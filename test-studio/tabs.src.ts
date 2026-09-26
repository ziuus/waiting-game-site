import { describe, it, expect, beforeEach } from 'vitest';
import { initTabs } from '../src/tabs.js';

let container: HTMLElement;

beforeEach(() => {
  document.body.innerHTML = `
    <div class="tabs" id="dl-tabs">
      <button class="tab active" data-tab="linux">Linux</button>
      <button class="tab" data-tab="macos">macOS</button>
      <button class="tab" data-tab="windows">Windows</button>
    </div>
    <div class="tab-content active" id="tab-linux">Linux content</div>
    <div class="tab-content" id="tab-macos">macOS content</div>
    <div class="tab-content" id="tab-windows">Windows content</div>
  `;
  container = document.body;
});

function tabEl(selector: string): HTMLButtonElement {
  return container.querySelector(selector) as HTMLButtonElement;
}

function panelEl(id: string): HTMLElement {
  return document.getElementById(id)!;
}

describe('tabs — initTabs', () => {
  it('linux tab is active on init', () => {
    initTabs();
    expect(tabEl('[data-tab="linux"]').classList.contains('active')).toBe(true);
    expect(panelEl('tab-linux').classList.contains('active')).toBe(true);
  });

  it('switching to macOS updates active tab and content', () => {
    initTabs();
    tabEl('[data-tab="macos"]').click();
    expect(tabEl('[data-tab="macos"]').classList.contains('active')).toBe(true);
    expect(tabEl('[data-tab="linux"]').classList.contains('active')).toBe(false);
    expect(panelEl('tab-macos').classList.contains('active')).toBe(true);
    expect(panelEl('tab-linux').classList.contains('active')).toBe(false);
  });

  it('switching to Windows updates active tab and content', () => {
    initTabs();
    tabEl('[data-tab="windows"]').click();
    expect(tabEl('[data-tab="windows"]').classList.contains('active')).toBe(true);
    expect(panelEl('tab-windows').classList.contains('active')).toBe(true);
    expect(panelEl('tab-linux').classList.contains('active')).toBe(false);
  });

  it('only one tab is active at a time', () => {
    initTabs();
    tabEl('[data-tab="macos"]').click();
    const activeTabs = container.querySelectorAll('.tab.active');
    expect(activeTabs.length).toBe(1);
  });

  it('only one content panel is visible at a time', () => {
    initTabs();
    tabEl('[data-tab="windows"]').click();
    const activePanels = container.querySelectorAll('.tab-content.active');
    expect(activePanels.length).toBe(1);
    expect(activePanels[0].id).toBe('tab-windows');
  });
});
