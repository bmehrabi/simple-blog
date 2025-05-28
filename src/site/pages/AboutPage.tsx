import { Card, Divider } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import Title from 'antd/es/typography/Title';
import Text from 'antd/es/typography/Text';
import { COURSE_NAME } from '@app/constants';
import styled from '@emotion/styled';
import { ReactElement } from 'react';

const StyledCard = styled(Card)`
  max-width: 800px;
  margin: 40px auto;
  padding: 24px;
  box-shadow: '0 2px 12px rgba(0,0,0,0.1)';
`;

const AboutPage = (): ReactElement => {
  return (
    <StyledCard>
      <Title level={2}>About This Project</Title>

      <Paragraph>
        This repository is the official companion code for the <Text strong>Udemy course</Text>:
      </Paragraph>

      <Title level={4}>{COURSE_NAME}</Title>

      <Paragraph>
        The goal of this course is to help developers master testing strategies in modern React
        applications using industry-standard tools and techniques. Throughout the course, we cover:
      </Paragraph>

      <ul>
        <li>
          Unit testing with <Text code>Jest</Text> and <Text code>Vitest</Text>
        </li>
        <li>
          Integration and component testing with <Text code>@testing-library/react</Text>
        </li>
        <li>
          End-to-end testing using <Text code>Playwright</Text>
        </li>
        <li>Best practices for mocking, test coverage, and CI integration</li>
      </ul>

      <Divider />

      <Paragraph>
        This codebase serves as a hands-on reference, demonstrating real-world examples and testing
        scenarios that are explained in detail throughout the course.
      </Paragraph>

      <Paragraph type="secondary">
        Feel free to explore, clone, and modify the code as you follow along!
      </Paragraph>
    </StyledCard>
  );
};

export default AboutPage;
