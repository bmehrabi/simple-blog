import ListPosts from '@app/admin/components/posts/listPosts';
import { render, screen } from '@testing-library/react';
import usePosts from '@app/api/posts/usePosts';
import { Mock } from 'vitest';
import { PostType } from '@app/api/models/Post';
import { faker } from '@faker-js/faker';
import getTestPost from '@app/testFactories/PostFactory';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { userEvent } from '@testing-library/user-event';
import EditPostPage from '@app/admin/pages/posts/editPostPage';
import PostsPage from '@app/admin/pages/posts/postsPage';
import usePost from '@app/api/posts/usePost';
import useDeletePost from '@app/api/posts/useDeletePost';

vi.mock('@app/api/posts/usePosts');
vi.mock('@app/api/posts/usePost');
vi.mock('@app/api/posts/useDeletePost');
vi.mock('@ckeditor/ckeditor5-react');

describe('<ListPost />', () => {
  const queryClient = new QueryClient();
  const deletePost = vi.fn();

  const setup = (minNumberOfPosts: number = 1, maxNumberOfPosts: number = 20) => {
    const mockedPosts: PostType[] = Array.from(
      { length: faker.number.int({ min: minNumberOfPosts, max: maxNumberOfPosts }) },
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
    (useDeletePost as Mock).mockReturnValue({
      mutate: deletePost,
      isPending: false,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/admin/posts']}>
          <Routes>
            <Route path="/admin/posts" element={<PostsPage />} />
            <Route path="/admin/post/edit/:id" element={<EditPostPage />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>,
    );

    return mockedPosts;
  };

  it('renders loading if the posts have not been loaded yet', () => {
    (usePosts as Mock).mockReturnValue({
      data: [],
      isLoading: true,
      error: null,
    });

    render(<ListPosts />);

    expect(screen.getByText('Loading...')).toBeTruthy();
  });

  it('renders a table with list of posts', () => {
    const mockedPosts = setup(1, 9);
    expect(screen.queryAllByText('Loading...')).toHaveLength(0);

    const rows = screen.getAllByRole('row');
    expect(rows.length).toBe(mockedPosts.length + 1);

    // Testing the Table Headers
    expect(screen.getByText('#')).toBeInTheDocument();
    expect(screen.getByText('Featured Image')).toBeInTheDocument();
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Action')).toBeInTheDocument();

    // Testing the Table content
    expect(screen.getByText(mockedPosts[0].title)).toBeInTheDocument();
    expect(screen.getAllByRole('link')[0]).toHaveAttribute(
      'href',
      `/admin/post/edit/${mockedPosts[0].id}`,
    );
    expect(screen.getAllByRole('button', { name: 'Delete' })).toHaveLength(mockedPosts.length);
  });

  it('renders a table with pagination if the number of the posts are more than 10', () => {
    setup(11, 20);
    expect(screen.queryAllByText('Loading...')).toHaveLength(0);

    const rows = screen.getAllByRole('row');
    expect(rows.length).toBe(11);
  });

  it('shows the edit post page when user clicks on the edit action item', async () => {
    const user = userEvent.setup();
    const mockedPosts = setup(1, 5);

    const links = screen.getAllByRole('link');

    expect(links[0]).toHaveAttribute('href', `/admin/post/edit/${mockedPosts[0].id}`);

    await user.click(links[0]);

    expect(screen.getByText('Edit Post')).toBeInTheDocument();
  });

  it('shows a confirmation box when users click on delete action item', async () => {
    const user = userEvent.setup();
    setup(1, 5);

    expect(screen.queryAllByText('Are you sure you want to delete this post?')).toHaveLength(0);

    const buttons = screen.getAllByRole('button', { name: 'Delete' });

    await user.click(buttons[0]);

    expect(screen.getByText('Are you sure you want to delete this post?')).toBeInTheDocument();
  });

  it('calls deletePost if user confirms the deletion', async () => {
    const user = userEvent.setup();
    const mockedPosts = setup(1, 5);

    const buttons = screen.getAllByRole('button', { name: 'Delete' });
    await user.click(buttons[0]);

    expect(deletePost).toHaveBeenCalledTimes(0);

    const yesButton = screen.getAllByRole('button', { name: 'Yes' })[0];
    await user.click(yesButton);

    expect(deletePost).toHaveBeenCalledTimes(1);
    expect(deletePost).toHaveBeenCalledWith(mockedPosts[0].id);
  });
});
