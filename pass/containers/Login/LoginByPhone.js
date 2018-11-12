import React from 'react';
import PropTypes from 'prop-types';
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
import PhoneCode from '../containers/PhoneCode';
import RefreshCaptchaModal from '../containers/RefreshCaptchaModal';
import MessageBox from '../containers/MessageBox';
import LoginOption from '../containers/LoginOption';
import RiskPwdModal from './RiskPwdModal';

import { makeSelectUserAccount, makeSelectPhoneCode } from '../../containers/App/selectors';
import { loginVcodePass } from '../../containers/App/sdkActions';

const innerHeight = document.body.clientHeight;

class LoginByPhone extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state = {
    btnDisabled: true,
  };
  componentWillReceiveProps(newProps) {
    this.setState({
      btnDisabled: !(newProps.userAccount.length && newProps.phoneCode.length),
    });
  }
  handleLoginByPhone = () => {
    this.props.loginVcodePass();
  };
  render() {
    return (
      <PageContainer style={{ height: innerHeight }}>
        <PanelContainer>
          <PanelTitle><FormattedMessage {...messages.phoneLoginTitle} /></PanelTitle>
          <PanelInfo>
            <UserAccount />
            <PhoneCode />
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
LoginByPhone.propTypes = {
  loginVcodePass: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  userAccount: makeSelectUserAccount(),
  phoneCode: makeSelectPhoneCode(),
});

export function mapDispatchToProps(dispatch) {
  return {
    loginVcodePass: (data) => dispatch(loginVcodePass(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(injectIntl(LoginByPhone));
