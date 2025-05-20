import { useMutation, UseMutationResult } from '@tanstack/react-query';
import axios from 'axios';
import { API_URL_POSTS } from '@app/constants';
import queryClient from '@app/api/queryClient';
import QUERY_KEYS from '@app/api/queryKeys';

const deletePost = async (id: number): Promise<string> => {
  const res = await axios.delete(`${API_URL_POSTS}${id}`);

  return res.data.message;
};

const useDeletePost = (): UseMutationResult<string, Error, number> => {
  return useMutation({
    mutationFn: deletePost,
    onSuccess: (): Promise<void> => {
      return queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.POSTS] });
    },
  });
};

export default useDeletePost;
