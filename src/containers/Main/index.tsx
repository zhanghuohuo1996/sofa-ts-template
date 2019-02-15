import * as React from 'react';
import { connect } from 'react-redux';

import {
  Layout, Dropdown, Icon, Menu as AntMenu,
} from 'antd';

import { FormattedMessage, injectIntl, InjectedIntlProps } from 'react-intl';

import { Router } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { createStructuredSelector } from 'reselect';

import Menu from 'components/Menu';
import Crumb from 'components/Crumb';
import LanguageBar from 'components/LanguageBar';

// import injectSaga from 'utils/injectSaga';
import { getMenuData, getMenuMap } from 'utils/menuHelper';
import * as Utils from 'utils/utils';

import { gotoPass } from 'config/pass.conf';
import commonConf from 'config/main.conf';

import CoreRoute from './CoreRoute';

import { selectLang, selectCurrentUserInfo } from '../../state/selectors';
import { toggleLang, getLoginUserInfo } from '../../state/actions';

import messages from './messages';

const history = createHistory();
// const withSaga = injectSaga({ key: 'main', saga });

const {
  Header,
  Content,
  Footer,
  Sider,
} = Layout;

const reg = new RegExp('(/login|/resetpwd|/editpwd|/bindphone)');

interface UserInfo {
  chinesename: string;
}

interface Props extends InjectedIntlProps {
  lang?: string;
  toggleLang?: any;
  getLoginUserInfo: any;
  currentUserInfo: UserInfo;
}

interface State {
  collapsed: boolean;
}

class Main extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }

  componentWillMount() {
    if (!reg.test(history.location.pathname)) {
      this.props.getLoginUserInfo();
    }
  }

  onCollapse = (collapsed: boolean) => {
    this.setState({ collapsed });
  }

  handleChangeLocation = (pathname: string) => {
    history.push(pathname);
  }

  handleToggleLanguage = (language: string) => {
    this.props.toggleLang(language);
    Utils.setCookie('sofa-lang', language);
  }

  menu = (
    <AntMenu onClick={(e) => gotoPass(e.key)}>
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
              { commonConf.i18n
                && (
                  <LanguageBar
                    value={lang}
                    onToggle={this.handleToggleLanguage}
                  ></LanguageBar>
                )
              }
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

export default connect(
  createStructuredSelector({
    lang: selectLang,
    currentUserInfo: selectCurrentUserInfo,
  }), {
    toggleLang,
    getLoginUserInfo,
  }
)(injectIntl(Main));
