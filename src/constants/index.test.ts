import { COURSE_NAME, divide } from '@app/constants/index';

describe('Constants', () => {
  it('should return the correct value for the COURSE_NAME', () => {
    expect(COURSE_NAME).toBe('Advanced Testing for React, with Vitest, RTL and Playwright');
  });

  describe('Divide', () => {
    it('should return the divided value of a by b', () => {
      expect(divide(4, 2)).toBe(2);
    });

    it('should return the divided value of a by b', () => {
      expect(() => divide(4, 0)).toThrow('Division by zero is not possible');
    });
  });
});
