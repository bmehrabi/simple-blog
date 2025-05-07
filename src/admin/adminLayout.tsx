import React, { ReactElement, useState } from 'react';
import { Layout, theme } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import Logo from '@app/shared/components/logo';
import BlogFooter from '@app/shared/components/footer';
import { Outlet } from 'react-router-dom';
import styled from '@emotion/styled';
import SidebarMenu from './components/sidebar/Menu';

const StyledLayout = styled(Layout)`
  min-height: 100vh;
`;
const StyledContent = styled(Content)`
  text-align: center;
  margin: '0 16px';
`;

const AdminLayout = (): ReactElement => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <StyledLayout>
      <Sider collapsible collapsed={collapsed} onCollapse={(value): void => setCollapsed(value)}>
        <Logo>Simple Blog</Logo>
        <SidebarMenu />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <StyledContent>
          <main>
            <Outlet />
          </main>
          <BlogFooter />
        </StyledContent>
      </Layout>
    </StyledLayout>
  );
};

export default AdminLayout;
