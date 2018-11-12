import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import PageContainer from '../../components/PageContainer';
import PanelContainer from '../../components/PanelContainer';

import { makeSelectRepeatPassword } from '../App/selectors';
import { logoutPass } from '../App/sdkActions';

const innerHeight = document.body.clientHeight;

class Logout extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.logoutPass();
  }

  render() {
    return (
      <PageContainer style={{ height: innerHeight }}>
        <PanelContainer>
          <span style={{ fontSize: '28px' }}>LOGOUT...</span>
        </PanelContainer>
      </PageContainer>
    );
  }
}

Logout.propTypes = {
  logoutPass: PropTypes.func.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    logoutPass: () => dispatch(logoutPass()),
  };
}

const mapStateToProps = createStructuredSelector({
  repeatPassword: makeSelectRepeatPassword(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(Logout);
