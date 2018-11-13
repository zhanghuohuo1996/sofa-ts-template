import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Layout, Button } from 'antd';

import { Router } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import Menu from 'components/Menu';
import Crumb from 'components/Crumb';
import LanguageBar from 'components/LanguageBar';

import injectSaga from 'utils/injectSaga';
import { getMenuData, getMenuMap } from 'utils/menuHelper';
import Utils from 'utils/utils';

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

  handleToggleLanguage = (language) => {
    this.props.toggleLang(language);
    Utils.setCookie('sofa-lang', language);
  }

  render() {
    const { collapsed } = this.state;
    const { lang } = this.props;
    const { openKeys, selectedKeys } = Menu.pathKeys(history.location.pathname);

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
              data={getMenuData(lang)}
            ></Menu>
          </Sider>
          <Layout>
            <Header style={{ background: 'rgba(159,179,188, 0.7)', padding: '0 20px', textAlign: 'right' }}>
              <LanguageBar
                value={lang}
                onToggle={this.handleToggleLanguage}
              ></LanguageBar>
            </Header>
            <Content style={{ margin: '0 16px' }}>
              <Crumb
                history={history}
                path={history.location.pathname}
                mainMap={getMenuMap(lang)}
                lang={lang}
              >
              </Crumb>
              <CoreRoute menuConf={getMenuData(lang)} />
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
