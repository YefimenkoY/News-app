import React from 'react';
import { Menu, Icon } from 'antd';
import { Badge } from 'react-bootstrap';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Div = styled.div`
  padding: 5px 8px 0 0;
  position: relative;
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
        <Icon type="save" />
        <span>Favorites <Badge bsClass='badge menu-badge'>{len}</Badge></span>
      </Link>
    </Menu.Item>
  </Menu>
);


export default NavMenu;
