import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'antd';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import messages from '../../message';

import { makeSelectShowRefreshCaptchaModal } from '../App/selectors';
import { updateShowRefreshCaptureModal } from '../App/actions';
import { refreshVcodeBySsnV2Pass, refreshVcodeByPhoneV2Pass } from '../App/sdkActions';

import ImageCode from './ImageCode';

class RefreshCaptchaModal extends React.Component { // eslint-disable-line react/prefer-stateless-function
  handleOk = () => {
    if (this.props.refreshPhoneCodeType === 'ssn') {
      this.props.refreshVcodeBySsnV2Pass();
    } else {
      this.props.refreshVcodeByPhoneV2Pass();
    }
    this.props.updateShowRefreshCaptureModal(false);
  };
  handleCancel = () => {
    this.props.updateShowRefreshCaptureModal(false);
  };
  render() {
    const { formatMessage } = this.props.intl;
    const { showRefreshCaptchaModal } = this.props;
    return (
      <Modal
        title={formatMessage(messages.warningVcodeTitle)}
        visible={showRefreshCaptchaModal}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        footer={[
          <Button key="back" onClick={this.handleCancel}><FormattedMessage {...messages.cancel} /></Button>,
          <Button key="submit" type="primary" onClick={this.handleOk}><FormattedMessage {...messages.confirm} /></Button>,
        ]}
      >
        <p><FormattedMessage {...messages.warningVcodeInfo} /></p>
        <ImageCode />
      </Modal>
    );
  }
}

RefreshCaptchaModal.propTypes = {
  intl: intlShape.isRequired,
  showRefreshCaptchaModal: PropTypes.bool.isRequired,
  updateShowRefreshCaptureModal: PropTypes.func.isRequired,
  refreshVcodeByPhoneV2Pass: PropTypes.func.isRequired,
  refreshVcodeBySsnV2Pass: PropTypes.func.isRequired,
  refreshPhoneCodeType: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  showRefreshCaptchaModal: makeSelectShowRefreshCaptchaModal(),
});

export function mapDispatchToProps(dispatch) {
  return {
    updateShowRefreshCaptureModal: (data) => dispatch(updateShowRefreshCaptureModal(data)),
    refreshVcodeBySsnV2Pass: () => dispatch(refreshVcodeBySsnV2Pass()),
    refreshVcodeByPhoneV2Pass: () => dispatch(refreshVcodeByPhoneV2Pass()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(injectIntl(RefreshCaptchaModal));
