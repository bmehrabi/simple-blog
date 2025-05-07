import { Link, Outlet } from 'react-router-dom';
import React, { ReactElement } from 'react';
import { Layout, Menu } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import BlogFooter from '@app/shared/components/footer';
import styled from '@emotion/styled';

const StyledContent = styled(Content)`
  padding: 48px;

  h1 {
    padding: 15px;
  }
`;

const MainLayout = (): ReactElement => {
  const menuItems = [
    {
      key: 0,
      label: <Link to="/">Home</Link>,
    },
    {
      key: 1,
      label: <Link to="/about">About</Link>,
    },
    {
      key: 2,
      label: <Link to="/contact">Contact</Link>,
    },
  ];

  return (
    <Layout>
      <Header>
        <Menu theme="dark" mode="horizontal" items={menuItems} />
      </Header>
      <StyledContent>
        <h1>Simple Blog Created by React</h1>
        <main>
          <Outlet />
        </main>
      </StyledContent>
      <BlogFooter />
    </Layout>
  );
};

export default MainLayout;
