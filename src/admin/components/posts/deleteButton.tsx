import { Button, Popconfirm } from 'antd';
import { ReactElement } from 'react';
import { DeletePostPropsType } from '@app/admin/components/posts/types';
import useDeletePost from '@app/api/posts/useDeletePost'; // your custom hook

const DeleteButton = ({ postId }: DeletePostPropsType): ReactElement => {
  const { mutate: deletePost, isPending } = useDeletePost();

  return (
    <Popconfirm
      title="Are you sure you want to delete this post?"
      onConfirm={(): void => deletePost(postId)}
      okText="Yes"
      cancelText="No"
    >
      <Button type="link" danger loading={isPending}>
        Delete
      </Button>
    </Popconfirm>
  );
};

export default DeleteButton;
