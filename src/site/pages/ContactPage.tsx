import { Button, Card, Space } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import Title from 'antd/es/typography/Title';
import { GithubOutlined, LinkedinOutlined, MailOutlined } from '@ant-design/icons';
import Text from 'antd/es/typography/Text';
import { ReactElement } from 'react';
import styled from '@emotion/styled';

const StyledCard = styled(Card)`
  max-width: 800px;
  margin: 40px auto;
  padding: 24px;
  box-shadow: '0 2px 12px rgba(0,0,0,0.1)';
`;

const ContactPage = (): ReactElement => {
  return (
    <StyledCard>
      <Title level={2}>Contact</Title>

      <Paragraph>
        If you have any <Text strong>questions</Text>, <Text strong>suggestions</Text>, or just want to say hello — feel free to reach out! I'm always happy to connect with fellow developers and learners.
      </Paragraph>

      <Space direction="vertical" size="middle">
        <Button
          type="link"
          icon={<MailOutlined />}
          href="mailto:contact@1programmer.de"
          target="_blank"
        >
          contact [@] 1programmer.de
        </Button>

        <Button
          type="link"
          icon={<GithubOutlined />}
          href="https://github.com/bmehrabi"
          target="_blank"
        >
          github.com/bmehrabi
        </Button>

        <Button
          type="link"
          icon={<LinkedinOutlined />}
          href="https://www.linkedin.com/in/babak-mehrabi/"
          target="_blank"
        >
          linkedin.com/in/babak-mehrabi/
        </Button>
      </Space>
    </StyledCard>
  );
};

export default ContactPage;
