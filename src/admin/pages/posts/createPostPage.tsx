import { Col, Row, Typography } from 'antd';
import React, { ReactElement } from 'react';
import CreateOrEditPost from '@app/admin/components/posts/createOrEditPost';

const CreatePostPage = (): ReactElement => {
  return (
    <Row>
      <Col span={12} offset={6}>
        <Typography.Title>Create Post</Typography.Title>
        <CreateOrEditPost />
      </Col>
    </Row>
  );
};

export default CreatePostPage;
