import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'antd';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import messages from '../../message';

import NewPassword from '../containers/NewPassword';
import MessageBox from '../containers/MessageBox';

import { makeSelectShowRiskPwdModal } from '../../containers/App/selectors';
import { updateShowRiskPwdModal } from '../../containers/App/actions';
import { setPwdPass } from '../../containers/App/sdkActions';

class RiskPwdModal extends React.Component { // eslint-disable-line react/prefer-stateless-function
  handleOk = () => {
    this.props.setPwdPass();
  };
  handleCancel = () => {
    this.props.updateShowRiskPwdModal(false);
    this.props.updateNewPassword('');
  };
  render() {
    const { formatMessage } = this.props.intl;
    return (
      <Modal
        title={formatMessage(messages.resetPassword)}
        visible={this.props.showRiskPwdModal}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        footer={[
          <Button key="back" onClick={this.handleCancel}><FormattedMessage {...messages.cancel} /></Button>,
          <Button key="submit" type="primary" onClick={this.handleOk}><FormattedMessage {...messages.confirm} /></Button>,
        ]}
      >
        <p><FormattedMessage {...messages.weakPassword} /></p>
        <NewPassword />
        <MessageBox resetPwd={false} />
      </Modal>
    );
  }
}
RiskPwdModal.propTypes = {
  intl: intlShape.isRequired,
  showRiskPwdModal: PropTypes.bool.isRequired,
  updateShowRiskPwdModal: PropTypes.func.isRequired,
  setPwdPass: PropTypes.func.isRequired,
  updateNewPassword: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  showRiskPwdModal: makeSelectShowRiskPwdModal(),
});

export function mapDispatchToProps(dispatch) {
  return {
    updateShowRiskPwdModal: (data) => dispatch(updateShowRiskPwdModal(data)),
    setPwdPass: (data) => dispatch(setPwdPass(data)),
    updateNewPassword: (data) => dispatch(updateNewPassword(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(injectIntl(RiskPwdModal));
