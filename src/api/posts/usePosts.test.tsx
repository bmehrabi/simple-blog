import usePosts from '@app/api/posts/usePosts';
import { PostType } from '@app/api/models/Post';
import axios from 'axios';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactElement, ReactNode } from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import getTestPost from '@app/testFactories/PostFactory';
import { faker } from '@faker-js/faker';

vi.mock('axios');

describe('usePosts', () => {
  const mockedPosts: PostType[] = Array.from(
    { length: faker.number.int({ min: 1, max: 20 }) },
    () => getTestPost(),
  );
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
