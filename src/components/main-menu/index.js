import React from 'react';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import { Link } from 'react-router';

class NavMenu extends React.Component {
  state = {
    current: 'mail',
  };
  
  handleClick = e => {
    this.setState({
      current: e.key,
    });
  };
  
  render() {
    return (
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
            <span>Favorites</span>
          </Link>
        </Menu.Item>
      </Menu>
    );
  }
}

export default NavMenu;