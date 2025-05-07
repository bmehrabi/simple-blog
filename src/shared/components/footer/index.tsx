import { Footer } from 'antd/es/layout/layout';
import React, { ReactElement } from 'react';
import { COURSE_NAME } from '@app/constants';
import styled from '@emotion/styled';

const StyledFooter = styled(Footer)`
  text-align: center;
`;

const BlogFooter = (): ReactElement => (
  <StyledFooter>
    Simple Blog created for the course <b>{COURSE_NAME}</b>
  </StyledFooter>
);

export default BlogFooter;
