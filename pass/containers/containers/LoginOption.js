import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon } from 'antd';
import { FormattedMessage, injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import messages from '../../message';

import { updateLoginByPhone, updateMessageData, updateUserAccount, updatePhoneCode, updatePassword, updateImgCode } from '../App/actions';
import { makeSelectLoginByPhone } from '../App/selectors';

const OptionButton = styled.button`
  display: flex;
  align-item: center
  font-size: 14px;
  color: #333;
  cursor: pointer;
  margin: 0 auto;
  outline: none;
  border: none;
  cursor: pointer;
`;
class LoginOption extends React.Component { // eslint-disable-line react/prefer-stateless-function
  handleChangeLoginType = () => {
    this.props.updateMessageData({
      key: 'sdk',
      type: 'empty',
      msg: '',
    });
    this.props.updatePhoneCode('');
    this.props.updateUserAccount('');
    this.props.updateImgCode('');
    this.props.updatePassword('');
    this.props.updateLoginByPhone(!this.props.loginByPhone);
  };
  render() {
    return (
      <OptionButton className="login-option local-button" onClick={this.handleChangeLoginType}>
        <span>
          { this.props.loginByPhone ?
            <FormattedMessage {...messages.changeToPwdLogin} /> :
            <FormattedMessage {...messages.changeToPhoneSMSLogin} />
          }
        </span>
        <Icon type="right" />
      </OptionButton>
    );
  }
}

LoginOption.propTypes = {
  loginByPhone: PropTypes.bool.isRequired,
  updateLoginByPhone: PropTypes.func.isRequired,
  updateMessageData: PropTypes.func.isRequired,
  updateUserAccount: PropTypes.func.isRequired,
  updatePhoneCode: PropTypes.func.isRequired,
  updatePassword: PropTypes.func.isRequired,
  updateImgCode: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loginByPhone: makeSelectLoginByPhone(),
});

export function mapDispatchToProps(dispatch) {
  return {
    updateLoginByPhone: (data) => dispatch(updateLoginByPhone(data)),
    updateMessageData: (data) => dispatch(updateMessageData(data)),
    updateUserAccount: (data) => dispatch(updateUserAccount(data)),
    updatePhoneCode: (data) => dispatch(updatePhoneCode(data)),
    updatePassword: (data) => dispatch(updatePassword(data)),
    updateImgCode: (data) => dispatch(updateImgCode(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(injectIntl(LoginOption));
