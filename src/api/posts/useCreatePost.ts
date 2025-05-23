import { useMutation, UseMutationResult } from '@tanstack/react-query';
import queryClient from '@app/api/queryClient';
import QUERY_KEYS from '@app/api/queryKeys';
import uploadPost from '@app/api/posts/apis';
import { PostType } from '@app/api/models/Post';

const useCreatePost = (): UseMutationResult<PostType, never, FormData> => {
  return useMutation({
    mutationFn: uploadPost,
    onSuccess: async (): Promise<void> => {
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.POSTS] });
    },
  });
};

export default useCreatePost;
