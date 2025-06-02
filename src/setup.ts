import '@testing-library/jest-dom';

// Mock for window.matchMedia
if (typeof window.matchMedia !== 'function') {
  window.matchMedia = (query): MediaQueryList => {
    return {
      matches: false,
      media: query,
      onchange: null,
      addListener: (): void => {},
      removeListener: (): void => {},
      addEventListener: (): void => {},
      removeEventListener: (): void => {},
      dispatchEvent: (): boolean => false,
    };
  };
}

// Add this in jest.setup.js or at the top of your test file
window.getComputedStyle = (_elt: Element, pseudoElt: string | null | undefined) => ({
  getPropertyValue: (prop: string): string => {
    if (prop === 'display') return 'block';

    return '';
  },
});
