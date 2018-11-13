import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  Layout, Button, Dropdown, Icon, Menu as AntMenu,
} from 'antd';

import { FormattedMessage, injectIntl } from 'react-intl';

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

import { selectLang, selectCurrentUserInfo } from '../../state/selectors';
import { toggleLang, getLoginUserInfo } from '../../state/actions';

import messages from './messages';

const history = createHistory();
const withSaga = injectSaga({ key: 'main', saga });

const {
  Header,
  Content,
  Footer,
  Sider,
} = Layout;

const reg = new RegExp('(/login|/resetpwd|/editpwd|/bindphone)');

@injectIntl
@connect(createStructuredSelector({
  lang: selectLang,
  currentUserInfo: selectCurrentUserInfo,
}), {
  toggleLang,
  getLoginUserInfo,
})
@withSaga
class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }

  static propTypes = {
    lang: PropTypes.string,
    toggleLang: PropTypes.func,
    getLoginUserInfo: PropTypes.func.isRequired,
    currentUserInfo: PropTypes.object.isRequired,
  }

  componentWillMount() {
    if (!reg.test(history.location.pathname)) {
      this.props.getLoginUserInfo();
    }
  }

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  }

  handleChangeLocation = (pathname) => {
    history.push(pathname);
  }


  handleDropdown = ({ key }) => {
    if (key === 'logout') {
      window.location.href = '/static/pass.html#/logout';
    }
    if (key === 'editpwd') {
      window.location.href = '/static/pass.html#/editpwd';
    }
    if (key === 'bindphone') {
      window.location.href = '/static/pass.html#/bindphone';
    }
  }

  handleToggleLanguage = (language) => {
    this.props.toggleLang(language);
    Utils.setCookie('sofa-lang', language);
  }

  menu = (
    <AntMenu onClick={this.handleDropdown}>
      <AntMenu.Item key="logout"><FormattedMessage {...messages.logout} /></AntMenu.Item>
      <AntMenu.Item key="editpwd"><FormattedMessage {...messages.editPwd} /></AntMenu.Item>
      <AntMenu.Item key="bindphone"><FormattedMessage {...messages.bindPhone} /></AntMenu.Item>
    </AntMenu>
  )

  render() {
    const { collapsed } = this.state;
    const { lang, currentUserInfo } = this.props;
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
              <Dropdown overlay={this.menu}>
                <span>
                  <Icon
                    className="ant-dropdown-link avatar-style"
                    type="user"
                    style={{
                      fontSize: 24, color: '#fff', marginRight: 5, cursor: 'pointer',
                    }}
                  />
                  {currentUserInfo.chinesename}
                </span>
              </Dropdown>
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

export default Main;
