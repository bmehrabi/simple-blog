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
