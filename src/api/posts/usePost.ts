import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';
import { PostType } from '@app/api/models/Post';
import { API_URL_POSTS } from '@app/constants';
import QUERY_KEYS from '@app/api/queryKeys';

const fetchPostById = async (postId: number): Promise<PostType> => {
  const res = await axios.get<PostType>(API_URL_POSTS + postId);

  return res.data;
};

const usePost = (postId: number): UseQueryResult<PostType> => {
  return useQuery<PostType, Error>({
    queryKey: [QUERY_KEYS.POSTS, postId],
    queryFn: (): Promise<PostType> => fetchPostById(postId),
  });
};

export default usePost;
