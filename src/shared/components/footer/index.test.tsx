import Footer from '@app/shared/components/footer/index';
import { render, screen } from '@testing-library/react';

describe('<Footer />', () => {
  it('renders footer properly', () => {
    render(<Footer />);

    expect(screen.getByText('Simple Blog created for the course')).toBeInTheDocument();
    expect(
      screen.getByText('Advanced Testing for React, with Vitest, RTL and Playwright'),
    ).toBeInTheDocument();
  });
});
