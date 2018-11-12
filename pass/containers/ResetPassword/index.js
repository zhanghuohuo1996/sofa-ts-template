import React from 'react';
import PropTypes from 'prop-types';
import { Steps, Button } from 'antd';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

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
import NewPassword from '../containers/NewPassword';
import RepeatPassword from '../containers/RepeatPassword';

import { makeSelectStep, makeSelectUserAccount, makeSelectPhoneCode, makeSelectNewPassword, makeSelectRepeatPassword } from '../../containers/App/selectors';
import { validVcodeByPhonePass, resetPwdPass } from '../../containers/App/sdkActions';
import { updateMessageData } from '../../containers/App/actions';

const Step = Steps.Step;
const innerHeight = document.body.clientHeight;

class ResetPassword extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state = {
    resetDisabled: true,
    validDisabled: true,
  };
  componentWillReceiveProps(newProps) {
    this.setState({
      validDisabled: !(newProps.userAccount.length && newProps.phoneCode.length),
      resetDisabled: !(newProps.repeatPassword.length && newProps.newPassword.length),
    });
  }
  handleValidPhone = () => {
    this.props.validVcodeByPhonePass();
  };
  handleResetPwd = () => {
    if (this.props.newPassword === this.props.repeatPassword) {
      this.props.resetPwdPass();
    } else {
      this.props.updateMessageData({
        key: 'sdk',
        type: 'error',
        msg: this.props.intl.formatMessage(messages.pwdMismatch),
      });
    }
  };
  render() {
    const { formatMessage } = this.props.intl;
    const { step } = this.props;
    return (
      <PageContainer style={{ height: innerHeight }}>
        <PanelContainer>
          <PanelTitle><FormattedMessage {...messages.forgetPwd} /></PanelTitle>
          <Steps className="bind-steps" current={step}>
            <Step title={formatMessage(messages.validatePhone)} />
            <Step title={formatMessage(messages.setNewPwd)} />
          </Steps>
          { step === 0 &&
            <PanelInfo>
              <UserAccount />
              <PhoneCode />
            </PanelInfo>
          }
          { step === 1 &&
            <PanelInfo>
              <NewPassword />
              <RepeatPassword />
            </PanelInfo>
          }
          <MessageBox resetPwd={false} />
          <PanelButton>
            { step === 1 ?
              <Button disabled={this.state.resetDisabled} style={{ width: '100%' }} size="large" type="primary" onClick={this.handleResetPwd}><FormattedMessage {...messages.submit} /></Button> :
              <Button disabled={this.state.validDisabled} style={{ width: '100%' }} size="large" type="primary" onClick={this.handleValidPhone}><FormattedMessage {...messages.nextStep} /></Button>
            }
          </PanelButton>
        </PanelContainer>
        <RefreshCaptchaModal />
      </PageContainer>
    );
  }
}

ResetPassword.propTypes = {
  intl: intlShape.isRequired,
  step: PropTypes.number.isRequired,
  newPassword: PropTypes.string.isRequired,
  repeatPassword: PropTypes.string.isRequired,
  validVcodeByPhonePass: PropTypes.func.isRequired,
  resetPwdPass: PropTypes.func.isRequired,
  updateMessageData: PropTypes.func.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    validVcodeByPhonePass: () => dispatch(validVcodeByPhonePass()),
    resetPwdPass: () => dispatch(resetPwdPass()),
    updateMessageData: (data) => dispatch(updateMessageData(data)),
  };
}

const mapStateToProps = createStructuredSelector({
  step: makeSelectStep(),
  userAccount: makeSelectUserAccount(),
  phoneCode: makeSelectPhoneCode(),
  newPassword: makeSelectNewPassword(),
  repeatPassword: makeSelectRepeatPassword(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(injectIntl(ResetPassword));
