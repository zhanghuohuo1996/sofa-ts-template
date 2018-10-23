import React from 'react';
import { connect } from 'react-redux';

import { Layout, Breadcrumb } from 'antd';

import { Router, Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import Menu from 'components/Menu';
import menuData from '../../config/menu.conf';

const history = createHistory();

const {
  Header,
  Content,
  Footer,
  Sider,
} = Layout;

@connect()
class Main extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  }

  handleChangeLocation = (keyPath) => {
    const path = [...keyPath];
    path.reverse();
    history.push(`/${path.join('/')}`);
  }

  render() {
    const { collapsed } = this.state;

    return (
      <Router history={history}>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={this.onCollapse}
          >
            <div className="logo">Logo</div>
            <Menu
              changeLocation={this.handleChangeLocation}
              authList={[]}
              data={menuData}
            ></Menu>
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: 0 }} />
            <Content style={{ margin: '0 16px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>Bill</Breadcrumb.Item>
              </Breadcrumb>
              <div>
                <Route exact path="/" component={HomePage} />
                <Route path="/homepage" component={NotFoundPage} />
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
            </Footer>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default Main;
