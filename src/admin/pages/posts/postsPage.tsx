import React, { ReactElement } from 'react';
import { Col, Row } from 'antd';
import usePosts from '@app/api/posts/usePosts';
import HeaderBreadcrumb from '@app/admin/components/headerBreadcrumb';
import { PostType } from '@app/api/models/Post';
import Post from '@app/shared/components/post';

const PostsPage = (): ReactElement => {
  const { data: posts, isLoading, error } = usePosts();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading posts.</p>;

  return (
    <>
      <HeaderBreadcrumb items={[{ link: '/admin/posts', title: 'Posts' }]} />
      <Row>
        {posts?.map(
          (post: PostType): ReactElement => (
            <Col key={post.id} span={12}>
              <Post post={post} />
            </Col>
          ),
        )}
      </Row>
    </>
  );
};

export default PostsPage;
