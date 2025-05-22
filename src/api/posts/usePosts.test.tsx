import usePosts from '@app/api/posts/usePosts';
import { PostType } from '@app/api/models/Post';
import axios from 'axios';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactElement, ReactNode } from 'react';
import { renderHook, waitFor } from '@testing-library/react';

vi.mock('axios');

describe('usePosts', () => {
  const mockedPosts: PostType[] = [
    {
      id: 1,
      title: 'title',
      description: 'description',
      createdAt: '',
      author: {
        avatarUrl: '',
        name: 'Babak',
      },
      image: {},
      publishedDate: '',
    },
  ];
  const queryClient = new QueryClient();
  const wrapper = ({ children }: { children: ReactNode }): ReactElement => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it('returns the posts from API', async () => {
    vi.mocked(axios.get).mockResolvedValue({ data: mockedPosts });

    const { result } = renderHook(() => usePosts(), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockedPosts);
  });
});
