import { useMutation, UseMutationResult } from '@tanstack/react-query';
import axios from 'axios';
import { API_URL_POSTS } from '@app/constants';
import queryClient from '@app/api/queryClient';
import { PostType } from '@app/api/models/Post';
import QUERY_KEYS from '@app/api/queryKeys';

type PatchPostType = {
  id: number;
  formData: FormData;
};

const patchPost = async ({ id, formData }: PatchPostType): Promise<PostType> => {
  const response = await axios.patch(`${API_URL_POSTS}${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

const useEditPost = (): UseMutationResult<PostType, Error, PatchPostType> => {
  return useMutation({
    mutationFn: patchPost,
    onSuccess: async (_, variables): Promise<void> => {
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.POSTS] });
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.POSTS, variables.id] });
    },
  });
};

export default useEditPost;
