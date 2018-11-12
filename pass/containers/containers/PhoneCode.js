import React from 'react';
import PropTypes from 'prop-types';
import { Input, Icon, message } from 'antd';
import { injectIntl, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';

import messages from '../../message';
import PanelItemFlex from '../../components/PanelItemFlex';
import PhoneCodeButton from '../../components/PhoneCodeButton';
import { makeSelectPhoneCode, makeSelectUserAccount, makeSelectPhoneCodeButtonText, makeSelectSsnCodeButtonText, makeSelectSendMessage } from '../App/selectors';
import { updatePhoneCode, updatePhoneCodeButtonText, updateMessageData, updateSsnCodeButtonText, updateSendMessage } from '../App/actions';
import { refreshVcodeByPhoneV2Pass, refreshVcodeBySsnV2Pass } from '../App/sdkActions';

class PhoneCode extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    const { formatMessage } = this.props.intl;
    this.props.updatePhoneCodeButtonText(formatMessage(messages.getCaptcha));
    this.props.updateSsnCodeButtonText(formatMessage(messages.getCaptcha));
  }
  componentWillReceiveProps(newProps) {
    const { formatMessage } = this.props.intl;
    if (this.props.sendMessage && newProps.phoneCodeButtonText === 60) {
      message.success(this.props.intl.formatMessage(messages.captchaSent));
    }
    if (this.props.sendMessage && newProps.ssnCodeButtonText === 60) {
      message.success(this.props.intl.formatMessage(messages.captchaSent));
    }
    if (newProps.phoneCodeButtonText === 60) {
      let count = 60;
      const interlval = setInterval(() => {
        if (count <= 1) {
          clearInterval(interlval);
        }
        count -= 1;
        this.props.updatePhoneCodeButtonText(count);
      }, 1000);
    }
    if (newProps.phoneCodeButtonText === 0) {
      this.props.updatePhoneCodeButtonText(formatMessage(messages.getCaptcha));
    }
    if (newProps.ssnCodeButtonText === 60) {
      let count = 60;
      const interlval = setInterval(() => {
        if (count <= 1) {
          clearInterval(interlval);
        }
        count -= 1;
        this.props.updateSsnCodeButtonText(count);
      }, 1000);
    }
    if (newProps.ssnCodeButtonText === 0) {
      this.props.updateSsnCodeButtonText(formatMessage(messages.getCaptcha));
    }
  }
  onChangeInputValue = (e) => {
    this.props.updatePhoneCode(e.target.value);
  };
  setRefNode = (node) => {
    this.inputNode = node;
  };
  emitEmpty = () => {
    this.inputNode.focus();
    this.props.updatePhoneCode('');
  };
  handleGetPhoneCode = () => {
    if (this.props.userAccount) {
      this.props.refreshVcodeByPhoneV2Pass();
      this.props.updateSendMessage(false);
    } else {
      this.props.updateMessageData({
        key: 'sdk',
        type: 'error',
        msg: this.props.intl.formatMessage(messages.inputPhone),
      });
    }
  };
  handleGetSsnCode = () => {
    this.props.refreshVcodeBySsnV2Pass();
    this.props.updateSendMessage(false);
  };
  render() {
    const { formatMessage } = this.props.intl;
    const { phoneCode, phoneCodeButtonText, ssnCodeButtonText, refreshPhoneCodeType } = this.props;
    const suffix = phoneCode ? <Icon type="close" onClick={() => this.emitEmpty()} /> : null;
    return (
      <PanelItemFlex>
        <Input
          style={{ overflow: 'hidden' }}
          size="large"
          placeholder={formatMessage(messages.inputCaptcha)}
          prefix={<Icon type="safety" style={{ color: 'rgba(0,0,0,.25)', fontSize: '16px' }} />}
          suffix={suffix}
          value={phoneCode}
          onChange={(value) => this.onChangeInputValue(value)}
          ref={(node) => this.setRefNode(node)}
        />
        { refreshPhoneCodeType === 'ssn' ?
          <PhoneCodeButton onClick={this.handleGetSsnCode}>{ssnCodeButtonText}</PhoneCodeButton> :
          <PhoneCodeButton onClick={this.handleGetPhoneCode}>{phoneCodeButtonText}</PhoneCodeButton>
        }
      </PanelItemFlex>
    );
  }
}

PhoneCode.propTypes = {
  intl: intlShape.isRequired,
  phoneCode: PropTypes.string.isRequired,
  userAccount: PropTypes.string.isRequired,
  phoneCodeButtonText: PropTypes.any.isRequired,
  ssnCodeButtonText: PropTypes.any.isRequired,
  updatePhoneCode: PropTypes.func.isRequired,
  refreshVcodeByPhoneV2Pass: PropTypes.func.isRequired,
  updatePhoneCodeButtonText: PropTypes.func.isRequired,
  updateMessageData: PropTypes.func.isRequired,
  refreshVcodeBySsnV2Pass: PropTypes.func.isRequired,
  updateSsnCodeButtonText: PropTypes.func.isRequired,
  updateSendMessage: PropTypes.func.isRequired,
  refreshPhoneCodeType: PropTypes.string,
  sendMessage: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  phoneCode: makeSelectPhoneCode(),
  userAccount: makeSelectUserAccount(),
  phoneCodeButtonText: makeSelectPhoneCodeButtonText(),
  ssnCodeButtonText: makeSelectSsnCodeButtonText(),
  sendMessage: makeSelectSendMessage(),
});

export function mapDispatchToProps(dispatch) {
  return {
    updatePhoneCode: (data) => dispatch(updatePhoneCode(data)),
    refreshVcodeByPhoneV2Pass: () => dispatch(refreshVcodeByPhoneV2Pass()),
    refreshVcodeBySsnV2Pass: () => dispatch(refreshVcodeBySsnV2Pass()),
    updatePhoneCodeButtonText: (data) => dispatch(updatePhoneCodeButtonText(data)),
    updateMessageData: (data) => dispatch(updateMessageData(data)),
    updateSsnCodeButtonText: (data) => dispatch(updateSsnCodeButtonText(data)),
    updateSendMessage: (data) => dispatch(updateSendMessage(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(injectIntl(PhoneCode));
