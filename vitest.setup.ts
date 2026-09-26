// Polyfill IntersectionObserver for jsdom (used by reveal.js)
class MockIntersectionObserverEntry {
  target: Element;
  intersectionRatio: number;
  isIntersecting: boolean;
  intersectionRect: DOMRectReadOnly;
  rootBounds: DOMRectReadOnly | null;
  boundingClientRect: DOMRectReadOnly;
  time: number;
  constructor(target: Element) {
    this.target = target;
    const rect = target.getBoundingClientRect();
    const visible = rect.height > 0 && rect.width > 0;
    this.intersectionRatio = visible ? 1 : 0;
    this.isIntersecting = visible;
    this.intersectionRect = rect;
    this.rootBounds = {
      top: 0, bottom: 10000, left: 0, right: 10000,
      width: 10000, height: 10000, x: 0, y: 0,
      toJSON() { return {}; },
    } as DOMRectReadOnly;
    this.boundingClientRect = rect;
    this.time = Date.now();
  }
}

class MockIntersectionObserver {
  callback: IntersectionObserverCallback;
  options: IntersectionObserverInit;
  constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
    this.callback = callback;
    this.options = options ?? {};
  }
  observe(target: Element) {
    const entry = new MockIntersectionObserverEntry(target);
    if (entry.isIntersecting) {
      this.callback([entry], this);
    }
  }
  unobserve() {}
  disconnect() {}
  takeRecords() { return []; }
}

(globalThis as any).IntersectionObserver = MockIntersectionObserver;
