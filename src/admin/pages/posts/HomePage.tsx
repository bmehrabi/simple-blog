import React, { ReactElement } from 'react';
import { Card, Col, Row } from 'antd';
import usePosts from '@app/api/posts/usePosts';

const HomePage = (): ReactElement => {
  const { data: posts, isLoading, error } = usePosts();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading posts.</p>;

  return (
    <Row gutter={16}>
      <Col span={8}>
        <Card title={posts?.length} variant="borderless">
          {posts?.length} has been published on the Simple Blog.
        </Card>
      </Col>
    </Row>
  );
};

export default HomePage;
