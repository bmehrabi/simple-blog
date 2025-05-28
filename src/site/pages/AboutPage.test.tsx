import { render, screen } from '@testing-library/react';
import AboutPage from '@app/site/pages/AboutPage';

describe('<AboutPage />', () => {
  it('shows the about info correctly', () => {
    render(<AboutPage />);

    const headings = screen.getAllByRole('heading');
    expect(headings[0]).toHaveTextContent('About This Project');
    expect(headings[1]).toHaveTextContent(
      'Advanced Testing for React, with Vitest, RTL and Playwright',
    );

    expect(
      screen.getByText(
        'The goal of this course is to help developers master testing strategies in modern React applications using industry-standard tools and techniques. Throughout the course, we cover:',
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        'This codebase serves as a hands-on reference, demonstrating real-world examples and testing scenarios that are explained in detail throughout the course.',
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByText('Feel free to explore, clone, and modify the code as you follow along!'),
    ).toBeInTheDocument();
  });
});
