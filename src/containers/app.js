import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import actions from '../actions';

import '../styles/main.scss';

import { Layout } from 'antd';
const { Content, Footer, Sider } = Layout;
import NavMenu from '../components/main-menu';
import { Spin } from 'antd';



@connect(
  state => ({
    loading: state.books.loading,
    saves: state.saves.saves,
  }), actions
)
export default class App extends React.Component {
  static propTypes = {
  
  };

  componentWillMount() {
  }
  
  state = {
    collapsed: false,
  };
  
  onCollapse = collapsed => {
    this.setState({ collapsed });
  };
  
  render() {
    const { loading, children, saves } = this.props;
    const count = saves.length ? saves.length : 0;
    
    return (
      <div className="wrapper">
        <Layout>
          <Sider
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
          >
            <NavMenu count={count} />
          </Sider>
          <Layout>
            <Spin spinning={loading} tip="Loading..." size='large'>
              <Content style={{ margin: '0 0' }}>
                <div style={{ padding: 24, background: '#ECECEC', minHeight: 600 }}>
                  {children}
                </div>
              </Content>
            </Spin>
            <Footer style={{ background: '#ECECEC', textAlign: 'center' }}>
              ©2017 Created by <a href="https://github.com/YefimenkoY">YefimenkoY</a>
            </Footer>
          </Layout>
        </Layout>
      </div>
    );
  }
}
