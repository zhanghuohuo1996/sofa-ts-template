import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import styled from 'styled-components';
import messages from '../../message';

import PageContainer from '../../components/PageContainer';
import PanelContainer from '../../components/PanelContainer';
import PanelTitle from '../../components/PanelTitle';
import PanelButton from '../../components/PanelButton';
import PanelButtons from '../../components/PanelButtons';
import PanelInfo from '../../components/PanelInfo';
import LoginByPhone from './LoginByPhone';
import LoginByAccount from './LoginByAccount';

import { makeSelectUserInfo, makeSelectShowLogin, makeSelectLoginByPhone } from '../App/selectors';
import { checkSsnPass, getStokenPass } from '../App/sdkActions';
import { updateShowLogin } from '../App/actions';

const innerHeight = document.body.clientHeight;

const UserInfo = styled.div`
  margin-bottom: 10px;
  font-size: 16px;
`;

const SugInfo = styled.p`
  text-align: center;
  margin-top: 30px;
`;

class LoginStatus extends React.Component {
  state = {
    platformAuth: localStorage.platformAuth === 'false',
  };

  componentDidMount() {

    this.props.checkSsnPass();
  }

  handleGetStoken = () => {
    this.props.getStokenPass();
  };

  handleLoginByOtherAccount = () => {
    this.props.updateShowLogin(true);
  };

  render() {
    const { userInfo, showLogin, loginByPhone } = this.props;
    // 没有USS的情况下展示输入框

    if (showLogin) {
      if (loginByPhone) {
        return (
          <LoginByPhone />
        );
      }
      return (
        <LoginByAccount />
      );
    }
    // 没有uid的情况下展示，无权限提示
    if (this.state.platformAuth) {
      return (
        <PageContainer style={{ height: innerHeight }}>
          <PanelContainer>
            <PanelTitle><FormattedMessage {...messages.NoPermissionToVisit} /></PanelTitle>
            <PanelInfo>
              <UserInfo>
                <span>
                  <FormattedMessage {...messages.username} />
:
                </span>
                <span>{userInfo.userName}</span>
              </UserInfo>
              <UserInfo>
                <span>
                  <FormattedMessage {...messages.phone} />
:
                </span>
                <span>{userInfo.userPhone}</span>
              </UserInfo>
            </PanelInfo>
            <SugInfo>
              <FormattedMessage {...messages.NoPermissionPleaseUsingAnotherAccount} />
            </SugInfo>
            <PanelButton>
              <Button type="primary" size="large" onClick={this.handleLoginByOtherAccount}><FormattedMessage {...messages.usingAnotherAccount} /></Button>
            </PanelButton>
          </PanelContainer>
        </PageContainer>
      );
    }
    // 没有STOKEN的情况下，展示获取stoken的页面
    return (
      <PageContainer style={{ height: innerHeight }}>
        <PanelContainer>
          <PanelTitle><FormattedMessage {...messages.alreadyLogin} /></PanelTitle>
          <PanelInfo>
            <UserInfo>
              <span>
                <FormattedMessage {...messages.username} />
:
              </span>
              <span>{userInfo.userName}</span>
            </UserInfo>
            <UserInfo>
              <span>
                <FormattedMessage {...messages.phone} />
:
              </span>
              <span>{userInfo.userPhone}</span>
            </UserInfo>
          </PanelInfo>
          <PanelButtons>
            <Button type="primary" size="large" onClick={this.handleGetStoken}><FormattedMessage {...messages.usingThisAccount} /></Button>
            <Button type="primary" size="large" onClick={this.handleLoginByOtherAccount}><FormattedMessage {...messages.usingAnotherAccount} /></Button>
          </PanelButtons>
        </PanelContainer>
      </PageContainer>
    );
  }
}

LoginStatus.propTypes = {
  userInfo: PropTypes.object.isRequired,
  showLogin: PropTypes.bool.isRequired,
  loginByPhone: PropTypes.bool.isRequired,
  checkSsnPass: PropTypes.func.isRequired,
  updateShowLogin: PropTypes.func.isRequired,
  getStokenPass: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  userInfo: makeSelectUserInfo(),
  showLogin: makeSelectShowLogin(),
  loginByPhone: makeSelectLoginByPhone(),
});

export function mapDispatchToProps(dispatch) {
  return {
    checkSsnPass: data => dispatch(checkSsnPass(data)),
    getStokenPass: data => dispatch(getStokenPass(data)),
    updateShowLogin: data => dispatch(updateShowLogin(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(LoginStatus);
