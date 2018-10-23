import React from 'react';
import { connect } from 'react-redux';

import { Layout, Breadcrumb } from 'antd';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { history } from 'react-router';
import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import Menu from 'components/Menu';

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
    history.push(keyPath);
  }

  render() {
    const { collapsed } = this.state;

    return (
      <Router>
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
              data={[{
                key: 'homepage',
                icon: 'home',
                text: '首页',
              }, {
                key: 'system',
                text: '系统管理',
                icon: 'setting',
                children: [{
                  key: 'usermanage',
                  text: '用户管理',
                }, {
                  key: 'authmanage',
                  text: '权限管理',
                }, {
                  key: 'authgroupmanage',
                  text: '权限组管理',
                }],
              }]}
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
                <Route path="/haha" component={NotFoundPage} />
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              Ant Design ©2018 Created by Ant UED
            </Footer>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default Main;
