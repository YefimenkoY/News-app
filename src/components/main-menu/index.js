import React from 'react';
import { Menu, Icon } from 'antd';
import styled from 'styled-components';
import { Link } from 'react-router';

const Div = styled.div`
  padding: 5px 8px 0 0;
  position: relative;
`;

const Badge = styled.span`
  position: absolute;
  display: inline-block;
  right: -7px;
  top: 0px;
  border-radius: 3px;
  box-shadow: 1px 1px 11px 2px #206ea6;
  font-weight: 600;
  background: #52c41a;
  padding: 0 4px;
`;

const NavMenu = ({ len }) => (
  <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
    <Menu.Item key="1">
      <Link to="/">
        <Icon type="desktop" />
        <span>Home</span>
      </Link>
    </Menu.Item>
    <Menu.Item key="2">
      <Link to="/books">
        <Icon type="sync" />
        <span>Search books</span>
      </Link>
    </Menu.Item>
    <Menu.Item key="3">
      <Link to="/saves">
        <Div>
          <Badge>{len}</Badge>
          <Icon type="save" />
          Favorites
        </Div>
      </Link>
    </Menu.Item>
  </Menu>
);

export default NavMenu;
