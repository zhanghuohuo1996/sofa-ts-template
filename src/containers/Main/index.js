import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Layout, Button } from 'antd';

import { Router } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import Menu from 'components/Menu';
import Crumb from 'components/Crumb';

import injectSaga from 'utils/injectSaga';
import Utils from 'utils/utils';
import menuData, { menuMap } from 'config/menu.conf';
import { createStructuredSelector } from 'reselect/lib/index';

import saga from './saga';
import CoreRoute from './CoreRoute';
import { selectLang } from '../../state/selectors';
import { toggleLang } from '../../state/actions';


const history = createHistory();
const withSaga = injectSaga({ key: 'main', saga });

const {
  Header,
  Content,
  Footer,
  Sider,
} = Layout;

@connect(createStructuredSelector({
  lang: selectLang,
}), {
  toggleLang,
})
@withSaga
class Main extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  }

  handleChangeLocation = (pathname) => {
    history.push(pathname);
  }

  handleLangClick = (language) => {
    Utils.setCookie('sofa-lang', language);
    this.props.toggleLang(language);
    window.location.reload();
  }

  render() {
    const { collapsed } = this.state;
    const { lang } = this.props;
    const { openKeys, selectedKeys } = Menu.pathKeys(history.location.pathname);
    // console.log('lang=', lang);

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
              selectedKeys={selectedKeys}
              openKeys={openKeys}
              changeLocation={this.handleChangeLocation}
              authList={[]}
              data={menuData}
            ></Menu>
          </Sider>
          <Layout>
            <Header style={{ background: 'rgba(159,179,188, 0.7)', padding: '0 20px', textAlign: 'right' }}>
              <Button ghost size="small" style={{ fontSize: 14, color: lang === 'zh' ? '#000' : '#999', marginRight: '10px' }} onClick={() => this.handleLangClick('zh')}>
                {'中文'}
              </Button>
              <Button ghost size="small" style={{ fontSize: 14, color: lang === 'zh' ? '#999' : '#000' }} onClick={() => this.handleLangClick('en')}>
                {'EN'}
              </Button>
            </Header>
            <Content style={{ margin: '0 16px' }}>
              <Crumb
                history={history}
                path={history.location.pathname}
                mainMap={menuMap}
              >
              </Crumb>
              <CoreRoute menuConf={menuData} />
            </Content>
            <Footer style={{ textAlign: 'center' }}>
            </Footer>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

Main.propTypes = {
  lang: PropTypes.string,
  toggleLang: PropTypes.func,
};

export default Main;
