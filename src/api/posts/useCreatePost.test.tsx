import { PostType } from '@app/api/models/Post';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactElement, ReactNode } from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import * as apis from '@app/api/posts/apis';
import queryClientModule from '@app/api/queryClient';
import getTestPost from '@app/testFactories/PostFactory';
import useCreatePost from './useCreatePost';

describe('useCreatePost', () => {
  const mockedPost: PostType = getTestPost();
  const queryClient = new QueryClient();
  const wrapper = ({ children }: { children: ReactNode }): ReactElement => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it('calls uploadPost when mutate is called', async () => {
    const mockPostData = new FormData();
    mockPostData.append('id', '1');
    mockPostData.append('title', 'title');
    mockPostData.append('description', 'description');

    const uploadPostSpy = vi.spyOn(apis, 'default').mockResolvedValue(mockedPost);

    const { result } = renderHook(() => useCreatePost(), { wrapper });

    result.current.mutate(mockPostData);

    await waitFor(() => {
      expect(uploadPostSpy).toHaveBeenCalledTimes(1);
      expect(uploadPostSpy).toHaveBeenCalledWith(mockPostData);
    });
  });

  it('invalidate queries on success', async () => {
    const mockPostData = new FormData();
    mockPostData.append('id', '1');
    mockPostData.append('title', 'title');
    mockPostData.append('description', 'description');

    const uploadPostSpy = vi.spyOn(apis, 'default').mockResolvedValue(mockedPost);
    const invalidateQueriesSpy = vi.spyOn(queryClientModule, 'invalidateQueries');

    const { result } = renderHook(() => useCreatePost(), { wrapper });

    await result.current.mutateAsync(mockPostData);

    await waitFor(() => {
      expect(uploadPostSpy).toHaveBeenCalledTimes(1);
      expect(invalidateQueriesSpy).toHaveBeenCalledTimes(1);
      expect(invalidateQueriesSpy).toHaveBeenCalledWith({ queryKey: ['POSTS'] });
    });
  });
});
