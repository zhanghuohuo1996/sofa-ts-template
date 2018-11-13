import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
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
import RefreshCaptchaModal from '../containers/RefreshCaptchaModal';
import MessageBox from '../containers/MessageBox';
import PasswordInput from '../containers/PasswordInput';
import NewPassword from '../containers/NewPassword';
import RepeatPassword from '../containers/RepeatPassword';

import { makeSelectPassword, makeSelectNewPassword, makeSelectRepeatPassword } from '../App/selectors';
import { editPwdPass } from '../App/sdkActions';
import { updateMessageData } from '../App/actions';

const innerHeight = document.body.clientHeight;

class EditPassword extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state = {
    editDisabled: true,
  };

  componentWillReceiveProps(newProps) {
    const pswLength = [newProps.password.length, newProps.repeatPassword.length, newProps.newPassword.length];
    // 密码长度必须在8到32位
    if (pswLength.every(item => item > 7 && item < 33)) {
      this.setState({
        editDisabled: false,
      });
    } else {
      this.setState({
        editDisabled: true,
      });
    }
  }

  handleEditPwd = () => {
    if (this.props.newPassword === this.props.repeatPassword) {
      this.props.editPwdPass();
    } else {
      this.props.updateMessageData({
        key: 'sdk',
        type: 'error',
        msg: this.props.intl.formatMessage(messages.pwdMismatch),
      });
    }
  };

  render() {
    return (
      <PageContainer style={{ height: innerHeight }}>
        <PanelContainer>
          <PanelTitle><FormattedMessage {...messages.updatePwd} /></PanelTitle>
          <p style={{ paddingBottom: '10px' }}><FormattedMessage {...messages.need8to32PwdWithNumberAndAlphabet} /></p>
          <PanelInfo>
            <PasswordInput />
            <NewPassword />
            <RepeatPassword />
          </PanelInfo>
          <MessageBox resetPwd={false} />
          <PanelButton>
            <Button disabled={this.state.editDisabled} style={{ width: '100%' }} size="large" type="primary" onClick={this.handleEditPwd}><FormattedMessage {...messages.updateConfirm} /></Button>
          </PanelButton>
        </PanelContainer>
        <RefreshCaptchaModal />
      </PageContainer>
    );
  }
}

EditPassword.propTypes = {
  intl: intlShape.isRequired,
  newPassword: PropTypes.string.isRequired,
  repeatPassword: PropTypes.string.isRequired,
  editPwdPass: PropTypes.func.isRequired,
  updateMessageData: PropTypes.func.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    editPwdPass: () => dispatch(editPwdPass()),
    updateMessageData: data => dispatch(updateMessageData(data)),
  };
}

const mapStateToProps = createStructuredSelector({
  password: makeSelectPassword(),
  newPassword: makeSelectNewPassword(),
  repeatPassword: makeSelectRepeatPassword(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(injectIntl(EditPassword));
