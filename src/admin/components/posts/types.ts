import { PostType } from '@app/api/models/Post';

export type CreatePostPropsType = {
  post?: PostType;
};

export type DeletePostPropsType = {
  postId: number;
};
