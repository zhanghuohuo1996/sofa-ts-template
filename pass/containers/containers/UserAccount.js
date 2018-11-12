import React from 'react';
import PropTypes from 'prop-types';
import { Input, Icon } from 'antd';
import { injectIntl, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';

import messages from '../../message';
import PanelItem from '../../components/PanelItem';
import { makeSelectUserAccount } from '../App/selectors';
import { updateUserAccount } from '../App/actions';

class UserAccount extends React.Component { // eslint-disable-line react/prefer-stateless-function
  onChangeInputValue = (e) => {
    this.props.updateUserAccount(e.target.value);
  };
  setRefNode = (node) => {
    this.inputNode = node;
  };
  emitEmpty = () => {
    this.inputNode.focus();
    this.props.updateUserAccount('');
  };
  render() {
    const { formatMessage } = this.props.intl;
    const { userAccount } = this.props;
    const suffix = userAccount ? <Icon type="close" onClick={() => this.emitEmpty()} /> : null;
    return (
      <PanelItem>
        <Input
          size="large"
          placeholder={formatMessage(messages.inputPhone)}
          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)', fontSize: '16px' }} />}
          suffix={suffix}
          value={userAccount}
          onChange={(value) => this.onChangeInputValue(value)}
          ref={(node) => this.setRefNode(node)}
        />
      </PanelItem>
    );
  }
}

UserAccount.propTypes = {
  intl: intlShape.isRequired,
  userAccount: PropTypes.string.isRequired,
  updateUserAccount: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  userAccount: makeSelectUserAccount(),
});

export function mapDispatchToProps(dispatch) {
  return {
    updateUserAccount: (data) => dispatch(updateUserAccount(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(injectIntl(UserAccount));
