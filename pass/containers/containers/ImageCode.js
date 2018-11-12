import React from 'react';
import PropTypes from 'prop-types';
import { Input, Icon } from 'antd';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import messages from '../../message';

import PanelItemFlex from '../../components/PanelItemFlex';
import Image from '../../components/Image';
import PhoneCodeButton from '../../components/ImageButton';

import { makeSelectImgCode, makeSelectImageUrl } from '../App/selectors';
import { updateImgCode } from '../App/actions';
import { refreshCaptchaPass } from '../App/sdkActions';

class ImageCode extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.refreshCaptchaPass();
  }
  onChangeInputValue = (e) => {
    this.props.updateImgCode(e.target.value);
  };
  setRefNode = (node) => {
    this.inputNode = node;
  };
  emitEmpty = () => {
    this.inputNode.focus();
    this.props.updateImgCode('');
  };
  handleGetImage = () => {
    this.props.refreshCaptchaPass();
  };
  render() {
    const { formatMessage } = this.props.intl;
    const { imgCode, imgUrl } = this.props;
    const suffix = imgCode ? <Icon type="close" onClick={() => this.emitEmpty()} /> : null;
    return (
      <PanelItemFlex>
        <Input
          style={{ overflow: 'hidden' }}
          size="large"
          placeholder={formatMessage(messages.inputCaptcha)}
          prefix={<Icon type="safety" style={{ color: 'rgba(0,0,0,.25)', fontSize: '16px' }} />}
          suffix={suffix}
          value={imgCode}
          onChange={(value) => this.onChangeInputValue(value)}
          ref={(node) => this.setRefNode(node)}
        />
        <PhoneCodeButton onClick={this.handleGetImage}>
          <Image src={imgUrl} alt="vcode"></Image>
        </PhoneCodeButton>
      </PanelItemFlex>
    );
  }
}

ImageCode.propTypes = {
  intl: intlShape.isRequired,
  imgCode: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  updateImgCode: PropTypes.func.isRequired,
  refreshCaptchaPass: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  imgCode: makeSelectImgCode(),
  imgUrl: makeSelectImageUrl(),
});

export function mapDispatchToProps(dispatch) {
  return {
    updateImgCode: (data) => dispatch(updateImgCode(data)),
    refreshCaptchaPass: () => dispatch(refreshCaptchaPass()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(injectIntl(ImageCode));
