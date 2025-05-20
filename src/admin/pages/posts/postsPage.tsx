import React, { ReactElement } from 'react';
import { Col, Row, Typography } from 'antd';
import ListPosts from '@app/admin/components/posts/listPosts';

const PostsPage = (): ReactElement => {
  return (
    <>
      <Row justify="start">
        <Col>
          <Typography.Title>Posts</Typography.Title>
        </Col>
      </Row>
      <ListPosts />
    </>
  );
};

export default PostsPage;
