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
    width: state.winWidth,
  }), actions
)
export default class App extends React.Component {
  static propTypes = {
    loading: PT.bool,
    saves: PT.array,
    children: PT.object,
    width: PT.number,
    fetchSaves: PT.func,
    setCurrentWinWidth: PT.func,
  };

  componentDidMount() {
    const { width, fetchSaves, setCurrentWinWidth } = this.props;
    window.addEventListener('resize', this.onResize);
    setCurrentWinWidth(window.innerWidth);
    this.setState({ collapsed: width < 650 });
    fetchSaves();
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  state = {
    collapsed: false,
  };
  
  onResize = e => {
    const { setCurrentWinWidth, width } = this.props;
    const winWidth = e.target.innerWidth;
    setCurrentWinWidth(winWidth);
    this.setState({ collapsed: width < 650 });
  }

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
              <Content>
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
