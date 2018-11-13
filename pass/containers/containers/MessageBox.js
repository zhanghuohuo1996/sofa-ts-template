import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon } from 'antd';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import messages from '../../message';

import { RESET_PWD_URL } from '../App/constants';
import MessageContainer from '../../components/MessageContainer';

import { makeSelectMessageData } from '../App/selectors';

const ForgetBtn = styled.button`
  color: #000;
  cursor: pointer;
  outline: none;
  border: none;
  cursor: pointer;
`;

class MessageBox extends React.Component {
  forgetPwd = () => {
    window.location.href = RESET_PWD_URL;
    window.location.reload();
  };
  render() {
    const { messageData } = this.props;
    return (
      <MessageContainer>
        {messageData.type === 'success' ?
          <div style={{ color: '#46b78e' }}>
            <Icon type="check-circle" />
            <span style={{ marginLeft: '5px' }}>{ messageData.key === 'sdk' ?
              messageData.msg : this.props.intl.formatMessage(messages[messageData.key])}</span>
          </div> : null
        }
        {messageData.type === 'error' ?
          <div style={{ color: '#e61b2e' }}>
            <Icon type="exclamation-circle" />
            <span style={{ marginLeft: '5px' }}>{ messageData.key === 'sdk' ?
              messageData.msg : this.props.intl.formatMessage(messages[messageData.key])}</span>
          </div> : null
        }
        {messageData.type === 'empty' ?
          <div style={{ color: '#46b78e' }}>
          </div> : null
        }
        {this.props.resetPwd ?
          <ForgetBtn onClick={this.forgetPwd}><FormattedMessage {...messages.forgetPwd} /></ForgetBtn> : null
        }
      </MessageContainer>
    );
  }
}

MessageBox.propTypes = {
  intl: intlShape.isRequired,
  messageData: PropTypes.object.isRequired,
  resetPwd: PropTypes.bool.isRequired,
};

MessageBox.defaultProps = {
  resetPwd: true,
};

const mapStateToProps = createStructuredSelector({
  messageData: makeSelectMessageData(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(injectIntl(MessageBox));

