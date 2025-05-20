import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { PostType } from '@app/api/models/Post';
import { API_URL_POSTS } from '@app/constants';
import queryClient from '@app/api/queryClient';
import QUERY_KEYS from '@app/api/queryKeys';

const uploadPost = async (formData: FormData): Promise<PostType> => {
  const response = await axios.post(API_URL_POSTS, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

const useCreatePost = () => {
  return useMutation({
    mutationFn: uploadPost,
    onSuccess: async (): Promise<void> => {
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.POSTS] });
    }
  });
};

export default useCreatePost;
