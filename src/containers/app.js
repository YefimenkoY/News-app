import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import actions from '../actions';

import '../styles/main.scss';

import { Layout } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import NavMenu from '../components/main-menu';
import { Spin } from 'antd';



@connect(
  state => ({
    loading: state.books.loading,
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
    const { loading, children } = this.props;

    
    return (
      <div className="wrapper">
        <Layout>
          <Sider
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
          >
            <NavMenu/>
          </Sider>
          <Layout>
            <Spin spinning={loading} tip="Loading..." delay={400} size='large'>
              <Content style={{ margin: '0 0' }}>
                <div style={{ padding: 24, background: '#41baf2', minHeight: 600 }}>
                  {children}
                </div>
              </Content>
            </Spin>
            <Footer style={{ background: '#41baf2', textAlign: 'center' }}>
              ©2017 Created by <a href="https://github.com/YefimenkoY">YefimenkoY</a>
            </Footer>
          </Layout>
        </Layout>
      </div>
    );
  }
}
