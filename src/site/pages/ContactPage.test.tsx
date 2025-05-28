import ContactPage from '@app/site/pages/ContactPage';
import { render, screen } from '@testing-library/react';

describe('<ContactPage />', () => {
  it('shows the github, linkedin links correctly', () => {
    render(<ContactPage />);

    expect(screen.getByRole('heading')).toHaveTextContent('Contact');

    expect(screen.getByText('contact [@] 1programmer.de')).toBeInTheDocument();
    expect(screen.getByText('github.com/bmehrabi')).toBeInTheDocument();
    expect(screen.getByText('linkedin.com/in/babak-mehrabi/')).toBeInTheDocument();

    const links = screen.getAllByRole('link');

    expect(links).toHaveLength(3);
    expect(links[0]).toHaveAttribute('href', 'mailto:contact@1programmer.de');
    expect(links[1]).toHaveAttribute('href', 'https://github.com/bmehrabi');
    expect(links[2]).toHaveAttribute('href', 'https://www.linkedin.com/in/babak-mehrabi/');
  });
});
