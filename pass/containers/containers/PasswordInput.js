import React from 'react';
import PropTypes from 'prop-types';
import { Input, Icon } from 'antd';
import { injectIntl, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';

import messages from '../../message';
import PanelItem from '../../components/PanelItem';
import { makeSelectPassword } from '../App/selectors';
import { updatePassword } from '../App/actions';

class PasswordInput extends React.Component { // eslint-disable-line react/prefer-stateless-function
  onChangeInputValue = (e) => {
    this.props.updatePassword(e.target.value);
  };
  setRefNode = (node) => {
    this.inputNode = node;
  };
  emitEmpty = () => {
    this.inputNode.focus();
    this.props.updatePassword('');
  };
  render() {
    const { formatMessage } = this.props.intl;
    const { password } = this.props;
    const suffix = password ? <Icon type="close" onClick={() => this.emitEmpty()} /> : null;
    return (
      <PanelItem>
        <Input
          type="password"
          size="large"
          placeholder={formatMessage(messages.inputPwd)}
          prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)', fontSize: '16px' }} />}
          suffix={suffix}
          value={password}
          onChange={(value) => this.onChangeInputValue(value)}
          ref={(node) => this.setRefNode(node)}
        />
      </PanelItem>
    );
  }
}

PasswordInput.propTypes = {
  intl: intlShape.isRequired,
  password: PropTypes.string.isRequired,
  updatePassword: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  password: makeSelectPassword(),
});

export function mapDispatchToProps(dispatch) {
  return {
    updatePassword: (data) => dispatch(updatePassword(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(injectIntl(PasswordInput));
