import { PostType } from '@app/api/models/Post';
import axios from 'axios';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactElement, ReactNode } from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import usePost from '@app/api/posts/usePost';
import getTestPost from '@app/testFactories/PostFactory';

vi.mock('axios');

describe('usePost', () => {
  const mockedPost: PostType = getTestPost();
  const queryClient = new QueryClient();
  const wrapper = ({ children }: { children: ReactNode }): ReactElement => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it('returns the post by id from API', async () => {
    vi.mocked(axios.get).mockResolvedValue({ data: mockedPost });

    const { result } = renderHook(() => usePost(1), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockedPost);
  });
});
