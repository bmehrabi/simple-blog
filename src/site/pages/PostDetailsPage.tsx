import { useParams } from 'react-router-dom';
import { ReactElement } from 'react';
import { Avatar, Card, Col, Row } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Title from 'antd/es/typography/Title';
import Text from 'antd/es/typography/Text';
import usePost from '@app/api/posts/usePost';
import DOMPurify from 'dompurify';
import styled from '@emotion/styled';

const StyledCard = styled(Card)`
  max-width: 800px;
  margin: 32px auto;
  padding: 24px;
`;

const StyledDiv = styled.div`
  margin-top: 24px;
  text-align: center;
  margin-bottom: 32px;

  img {
    max-width: 100%;
    border-radius: 8px;
  }
`;

const PostDetailsPage = (): ReactElement => {
  const { id } = useParams<{ id: string }>();
  const postIdNumber = id ? parseInt(id, 10) : 0;
  const { data: post, isLoading, error } = usePost(postIdNumber);

  if (isLoading) return <p>Loading...</p>;
  if (error || !post) return <p>Post not found</p>;

  return (
    <StyledCard>
      <Row align="middle" gutter={[16, 16]}>
        <Col>
          <Avatar
            size="large"
            src={post?.author.avatarUrl}
            icon={!post?.author.avatarUrl && <UserOutlined />}
          />
        </Col>
        <Col>
          <Text strong>{post?.author.name}</Text>
          <br />
          <Text type="secondary">{new Date(post?.publishedDate).toLocaleDateString()}</Text>
        </Col>
      </Row>

      {post?.image?.url && (
        <StyledDiv>
          <img src={post.image.url} alt={post.title} />
        </StyledDiv>
      )}

      <Title level={2}>{post?.title}</Title>
      {/* eslint-disable-next-line react/no-danger */}
      <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post?.description) }} />
    </StyledCard>
  );
};

export default PostDetailsPage;
