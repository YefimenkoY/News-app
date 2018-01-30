import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { Layout, Spin } from 'antd';
import { connect } from 'react-redux';
import actions from '../actions';

import NavMenu from '../components/main-menu';
import '../styles/main.scss';

const { Content, Footer, Sider } = Layout;

@connect(
  state => ({
    loading: state.books.loading,
    saves: state.saves.saves,
  }), actions
)
export default class App extends React.Component {
  static propTypes = {
    loading: PT.bool,
    saves: PT.array,
    children: PT.object,
    fetchSaves: PT.func,
  };

  componentDidMount() {
    this.props.fetchSaves();
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
              <Content className="content">
                <div className="content-inner">{children}</div>
              </Content>
            </Spin>
            <Footer className="footer">
              ©2017 Created by <a href="https://github.com/YefimenkoY">YefimenkoY</a>
            </Footer>
          </Layout>
        </Layout>
      </div>
    );
  }
}
