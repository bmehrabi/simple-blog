import { Breadcrumb } from 'antd';
import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { HeaderBreadcrumbPropsType } from '@app/admin/components/headerBreadcrumb/types';
import styled from '@emotion/styled';

const StyledBreadcrumb = styled(Breadcrumb)`
  margin: 16px 0;
`;

const headerBreadcrumb = ({ items }: HeaderBreadcrumbPropsType): ReactElement => {
  return (
    <StyledBreadcrumb>
      {items.map(
        (item): ReactElement => (
          <Breadcrumb.Item key={item.link}>
            {item.link ? <Link to={item.link}>{item.title}</Link> : item.title}
          </Breadcrumb.Item>
        ),
      )}
    </StyledBreadcrumb>
  );
};

export default headerBreadcrumb;
