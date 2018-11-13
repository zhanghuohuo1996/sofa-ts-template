import React from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import { Button } from 'antd';
import { FormattedMessage, injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import messages from '../../message';

import PageContainer from '../../components/PageContainer';
import PanelContainer from '../../components/PanelContainer';
import PanelTitle from '../../components/PanelTitle';
import PanelButton from '../../components/PanelButton';
import PanelInfo from '../../components/PanelInfo';
import UserAccount from '../containers/UserAccount';
import PasswordInput from '../containers/PasswordInput';
import ImageCode from '../containers/ImageCode';
import RefreshCaptchaModal from '../containers/RefreshCaptchaModal';
import MessageBox from '../containers/MessageBox';
import LoginOption from '../containers/LoginOption';
import RiskPwdModal from './RiskPwdModal';

import { makeSelectUserAccount, makeSelectPassword, makeSelectImgCode } from '../App/selectors';
import { loginPwdPass } from '../App/sdkActions';

const innerHeight = document.body.clientHeight;

class LoginByAccount extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state = {
    btnDisabled: true,
  };

  componentWillReceiveProps(newProps) {
    this.setState({
      btnDisabled: !(newProps.userAccount.length && newProps.password.length && newProps.imgCode.length),
    });
  }

  handleLoginByPhone = () => {
    this.props.loginPwdPass();
  };

  render() {
    return (
      <PageContainer style={{ height: innerHeight }}>
        <PanelContainer>
          <PanelTitle><FormattedMessage {...messages.passwordLogin} /></PanelTitle>
          <PanelInfo>
            <UserAccount />
            <PasswordInput />
            <ImageCode />
          </PanelInfo>
          <MessageBox />
          <PanelButton>
            <Button type="primary" disabled={this.state.btnDisabled} size="large" onClick={this.handleLoginByPhone}><FormattedMessage {...messages.login} /></Button>
          </PanelButton>
          <LoginOption />
        </PanelContainer>
        <RefreshCaptchaModal />
        <RiskPwdModal />
      </PageContainer>
    );
  }
}

LoginByAccount.propTypes = {
  loginPwdPass: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  userAccount: makeSelectUserAccount(),
  password: makeSelectPassword(),
  imgCode: makeSelectImgCode(),
});

export function mapDispatchToProps(dispatch) {
  return {
    loginPwdPass: data => dispatch(loginPwdPass(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(injectIntl(LoginByAccount));
