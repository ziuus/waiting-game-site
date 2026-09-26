/// <reference types="vitest" />

import { setupServer } from 'vitest/node';

// Polyfill IntersectionObserver for jsdom (used by reveal.js)
if (typeof globalThis.IntersectionObserver === 'undefined') {
  const observers = new Map();
  let idCounter = 0;

  class MockIntersectionObserver {
    callback: IntersectionObserverCallback;
    options: IntersectionObserverInit;
    constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
      this.callback = callback;
      this.options = options ?? {};
      this[Symbol.toStringTag] = 'IntersectionObserver';
    }
    observe(target: Element) {
      const id = ++idCounter;
      const entries: IntersectionObserverEntry[] = [];
      const rect = target.getBoundingClientRect();
      const rootRect = { top: 0, bottom: 10000, left: 0, right: 10000, width: 10000, height: 10000 };
      const intersectionRect = {
        x: Math.max(rect.left, 0),
        y: Math.max(rect.top, 0),
        width: Math.max(rect.width, 0),
        height: Math.max(rect.height, 0),
        top: rect.top,
        right: rect.right,
        bottom: rect.bottom,
        left: rect.left,
      };
      entries.push({
        target,
        intersectionRatio: rect.height > 0 && rect.width > 0 ? 1 : 0,
        isIntersecting: rect.height > 0 && rect.width > 0,
        intersectionRect,
        rootBounds: rootRect,
        boundingClientRect: rect,
        time: Date.now(),
      });
      (this as any)._id = id;
      (this as any)._target = target;
      (this as any)._entries = entries;
      observers.set(id, { target, callback: this.callback, entries, fired: false });
      // Immediately fire for elements that are visible
      if (rect.height > 0 && rect.width > 0) {
        this.callback(entries, this);
      }
    }
    unobserve(target: Element) {
      for (const [id, obs] of observers) {
        if (obs.target === target) {
          observers.delete(id);
          break;
        }
      }
    }
    disconnect() {
      observers.clear();
    }
    takeRecords() {
      const records: IntersectionObserverEntry[] = [];
      for (const obs of observers.values()) {
        records.push(...obs.entries);
      }
      return records;
    }
    root: Element | Document | null = null;
    rootMargin: string = '';
    thresholds: ReadonlyArray<number> = [0];
  }

  // @ts-expect-error — polyfilling
  globalThis.IntersectionObserver = MockIntersectionObserver;
  // @ts-expect-error
  globalThis.IntersectionObserverEntry = class {
    target: Element;
    intersectionRatio: number;
    isIntersecting: boolean;
    intersectionRect: DOMRectReadOnly;
    rootBounds: DOMRectReadOnly | null;
    boundingClientRect: DOMRectReadOnly;
    time: number;
    constructor(target: Element) {
      this.target = target;
    }
  };
}
