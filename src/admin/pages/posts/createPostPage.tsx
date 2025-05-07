import { Col, Row } from 'antd';
import React, { ReactElement } from 'react';
import HeaderBreadcrumb from '@app/admin/components/headerBreadcrumb';
import CreatePost from '@app/admin/components/posts/createPost';

const CreatePostPage = (): ReactElement => {
  return (
    <>
      <HeaderBreadcrumb
        items={[{ link: '/admin/posts', title: 'Posts' }, { title: 'Create New Post' }]}
      />
      <Row>
        <Col span={12} offset={6}>
          <CreatePost />
        </Col>
      </Row>
    </>
  );
};

export default CreatePostPage;
