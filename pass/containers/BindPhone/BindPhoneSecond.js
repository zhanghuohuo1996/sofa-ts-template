import React from 'react';
import PropTypes from 'prop-types';
import { Button, Steps } from 'antd';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import messages from '../../message';

import PanelContainer from '../../components/PanelContainer';
import PanelTitle from '../../components/PanelTitle';
import PanelButton from '../../components/PanelButton';
import PanelInfo from '../../components/PanelInfo';
import UserAccount from '../containers/UserAccount';
import PhoneCode from '../containers/PhoneCode';
import RefreshCaptchaModal from '../containers/RefreshCaptchaModal';
import MessageBox from '../containers/MessageBox';

import { makeSelectStep, makeSelectShowPhoneNumber, makeSelectPhoneNumber, makeSelectPhoneCode, makeSelectUserAccount } from '../App/selectors';
import { refreshVcodeBySsnV2Pass, validVcodeBySsnPass, changeBindPhoneCommitPass } from '../App/sdkActions';

const Step = Steps.Step;

class BindPhoneSecond extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state = {
    firstBtnDisabled: true,
    secondBtnDisabled: true,
  };
  componentDidMount() {
    if (this.props.step === 0) {
      this.props.refreshVcodeBySsnV2Pass();
    }
  }
  componentWillReceiveProps(newProps) {
    this.setState({
      firstBtnDisabled: !newProps.phoneCode.length,
      secondBtnDisabled: !(newProps.phoneCode.length && newProps.userAccount.length),
    });
  }
  handleValidVcodeBySsn = () => {
    this.props.validVcodeBySsnPass();
  };
  handleBindPhoneCommit = () => {
    this.props.changeBindPhoneCommitPass();
  };
  render() {
    const { formatMessage } = this.props.intl;
    const { firstBtnDisabled, secondBtnDisabled } = this.state;
    const { step, showPhoneNumber, phoneNumber } = this.props;
    return (
      <PanelContainer>
        <PanelTitle><FormattedMessage {...messages.bindPhone} /></PanelTitle>
        <Steps className="bind-steps" style={{ paddingBottom: '20px' }} current={step}>
          <Step title={formatMessage(messages.bindPhone)} />
          <Step title={formatMessage(messages.validateNewPhone)} />
          <Step title={formatMessage(messages.finish)} />
        </Steps>
        {step === 0 &&
        <div>
          <PanelInfo>
            {showPhoneNumber && <p style={{ padding: '10px' }}><FormattedMessage {...messages.captchaHasBeenSentTo} />{phoneNumber}</p>}
            <PhoneCode refreshPhoneCodeType="ssn" />
          </PanelInfo>
          <MessageBox resetPwd={false} />
          <PanelButton>
            <Button disabled={firstBtnDisabled} size="large" type="primary" onClick={this.handleValidVcodeBySsn}><FormattedMessage {...messages.nextStep} /></Button>
          </PanelButton>
        </div>}
        {step === 1 &&
        <div>
          <PanelInfo>
            <UserAccount />
            <PhoneCode />
          </PanelInfo>
          <MessageBox resetPwd={false} />
          <PanelButton>
            <Button disabled={secondBtnDisabled} size="large" type="primary" onClick={this.handleBindPhoneCommit}><FormattedMessage {...messages.bindConfirm} /></Button>
          </PanelButton>
        </div>}
        {step === 2 ?
          <div style={{ fontSize: '25px', textAlign: 'center' }}>
            <p style={{ margin: '57px 0 40px 0' }}><FormattedMessage {...messages.bindPhoneChangeSuccess} /></p>
            <p style={{ margin: '20px 0 40px 0', fontSize: '20px' }}><FormattedMessage {...messages.autojumpOver5s} /></p>
          </div> : null
        }
        {step === 0 ?
          <RefreshCaptchaModal refreshPhoneCodeType="ssn" /> :
          <RefreshCaptchaModal />
        }
      </PanelContainer>
    );
  }
}

BindPhoneSecond.propTypes = {
  intl: intlShape.isRequired,
  step: PropTypes.number.isRequired,
  showPhoneNumber: PropTypes.bool.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  refreshVcodeBySsnV2Pass: PropTypes.func.isRequired,
  validVcodeBySsnPass: PropTypes.func.isRequired,
  changeBindPhoneCommitPass: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  step: makeSelectStep(),
  showPhoneNumber: makeSelectShowPhoneNumber(),
  phoneNumber: makeSelectPhoneNumber(),
  phoneCode: makeSelectPhoneCode(),
  userAccount: makeSelectUserAccount(),
});

export function mapDispatchToProps(dispatch) {
  return {
    refreshVcodeBySsnV2Pass: () => dispatch(refreshVcodeBySsnV2Pass()),
    validVcodeBySsnPass: () => dispatch(validVcodeBySsnPass()),
    changeBindPhoneCommitPass: () => dispatch(changeBindPhoneCommitPass()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(injectIntl(BindPhoneSecond));
