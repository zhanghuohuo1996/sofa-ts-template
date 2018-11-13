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

import { makeSelectStep, makeSelectPhoneCode, makeSelectUserAccount } from '../App/selectors';
import { changeBindPhoneCommitPass } from '../App/sdkActions';

const Step = Steps.Step;

class BindPhoneFirst extends React.Component {
  state = {
    btnDisabled: true,
  };
  componentWillReceiveProps(newProps) {
    this.setState({
      btnDisabled: !(newProps.phoneCode.length && newProps.userAccount.length),
    });
  }
  handleBindPhoneCommit = () => {
    this.props.changeBindPhoneCommitPass();
  };
  render() {
    const { formatMessage } = this.props.intl;
    const { step } = this.props;
    return (
      <PanelContainer>
        <PanelTitle><FormattedMessage {...messages.bindPhone} /></PanelTitle>
        <Steps className="bind-steps" current={step}>
          <Step title={formatMessage(messages.validateNewPhone)} />
          <Step title={formatMessage(messages.finish)} />
        </Steps>
        {step === 0 &&
        <div>
          <PanelInfo>
            <UserAccount />
            <PhoneCode />
          </PanelInfo>
          <MessageBox resetPwd={false} />
          <PanelButton>
            <Button disabled={this.state.btnDisabled} size="large" type="primary" onClick={this.handleBindPhoneCommit}><FormattedMessage {...messages.bindConfirm} /></Button>
          </PanelButton>
        </div>
        }
        {step === 1 ?
          <div style={{ fontSize: '25px', textAlign: 'center' }}>
            <p style={{ margin: '57px 0 40px 0' }}><FormattedMessage {...messages.bindPhoneChangeSuccess} /></p>
            <p style={{ margin: '20px 0 40px 0', fontSize: '20px' }}><FormattedMessage {...messages.autojumpOver5s} /></p>
          </div> : null
        }
        <RefreshCaptchaModal />
      </PanelContainer>
    );
  }
}

BindPhoneFirst.propTypes = {
  intl: intlShape.isRequired,
  step: PropTypes.number.isRequired,
  changeBindPhoneCommitPass: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  step: makeSelectStep(),
  phoneCode: makeSelectPhoneCode(),
  userAccount: makeSelectUserAccount(),
});

export function mapDispatchToProps(dispatch) {
  return {
    changeBindPhoneCommitPass: () => dispatch(changeBindPhoneCommitPass()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(injectIntl(BindPhoneFirst));

