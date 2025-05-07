import React, { ReactElement } from 'react';
import { CommentOutlined, EditOutlined } from '@ant-design/icons';
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
    getItem('Posts', 'sub1', <EditOutlined />, [
      getItem(<Link to="/admin/posts">See posts</Link>, '1'),
      getItem(<Link to="/admin/posts/create">Add New Post</Link>, '2'),
    ]),
    getItem('Comments', '4', <CommentOutlined />),
  ];

  return <Menu theme="dark" mode="inline" items={items} />;
};

export default SidebarMenu;
