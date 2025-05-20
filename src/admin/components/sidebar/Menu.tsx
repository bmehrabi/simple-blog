import React, { ReactElement } from 'react';
import { EditOutlined, HomeOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

const SidebarMenu: React.FC = (): ReactElement => {
  const getItem = (
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
  ): MenuItem => ({ key, icon, children, label }) as MenuItem;
  const items: MenuItem[] = [
    getItem(<Link to="/admin/home">Home</Link>, '1', <HomeOutlined />),
    getItem('Posts', 'sub1', <EditOutlined />, [
      getItem(<Link to="/admin/posts">See posts</Link>, '2'),
      getItem(<Link to="/admin/post/create">Add New Post</Link>, '3'),
    ]),
  ];

  return <Menu theme="dark" mode="inline" items={items} />;
};

export default SidebarMenu;
