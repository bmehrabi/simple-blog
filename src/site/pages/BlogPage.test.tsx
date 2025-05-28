import { PostType } from '@app/api/models/Post';
import { faker } from '@faker-js/faker';
import getTestPost from '@app/testFactories/PostFactory';
import BlogPage from '@app/site/pages/blogPage';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import usePosts from '@app/api/posts/usePosts';
import { Mock } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { userEvent } from '@testing-library/user-event';
import PostDetailsPage from '@app/site/pages/PostDetailsPage';
import React from 'react';
import usePost from '@app/api/posts/usePost';

vi.mock('@app/api/posts/usePosts');
vi.mock('@app/api/posts/usePost');

describe('<BlogPage />', () => {
  const setup = () => {
    const mockedPosts: PostType[] = Array.from(
      { length: faker.number.int({ min: 1, max: 20 }) },
      () => getTestPost(),
    );
    (usePosts as Mock).mockReturnValue({
      data: mockedPosts,
      isLoading: false,
      error: null,
    });
    (usePost as Mock).mockReturnValue({
      data: mockedPosts[0],
      isLoading: false,
      error: null,
    });

    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<BlogPage />} />
            <Route path="/post/:id" element={<PostDetailsPage />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>,
    );

    return mockedPosts;
  };

  it('renders posts correctly', () => {
    const mockedPosts = setup();

    expect(screen.queryAllByText('Loading...')).toHaveLength(0);
    expect(screen.getAllByRole('link')).toHaveLength(mockedPosts.length);
    expect(screen.getAllByRole('link')[0]).toHaveAttribute('href', `/post/${mockedPosts[0].id}`);
    expect(screen.getByText(mockedPosts[0].title)).toBeInTheDocument();
  });

  it('navigates to /post/id page after clicking on the items', async () => {
    const mockedPosts = setup();
    const user = userEvent.setup();

    const allPostLinks = screen.getAllByRole('link');
    expect(allPostLinks.length).toBe(mockedPosts.length);

    expect(screen.queryAllByText(mockedPosts[0].description)).toHaveLength(0);

    await user.click(allPostLinks[0]);

    expect(screen.getByText(mockedPosts[0].author.name)).toBeInTheDocument();
    expect(screen.getByText(mockedPosts[0].description)).toBeInTheDocument();
  });
});
