import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from 'antd';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import messages from '../../message';

import { HOME_PAGE_URL, LOGIN_PAGE_URL } from '../App/constants';
import PageContainer from '../../components/PageContainer';
import PanelContainer from '../../components/PanelContainer';
import BindPhoneSecond from './BindPhoneSecond';
import BindPhoneFirst from './BindPhoneFirst';

import { makeSelectBindPhoneStatus } from '../App/selectors';
import { changeBindPhoneStartPass } from '../App/sdkActions';

const innerHeight = document.body.clientHeight;

const BindPhoneBox = styled.div`
  font-size: 25px;
  text-align: center;
`;

class BindPhone extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    // 验证该用户是否已经绑定过手机号
    if (this.props.bindPhoneStatus === 0) {
      this.props.changeBindPhoneStartPass();
    }
  }
  handleBack = () => {
    window.location.href = HOME_PAGE_URL;
  };
  handleLogin = () => {
    window.location.href = LOGIN_PAGE_URL;
    window.location.reload();
  };
  render() {
    return (
      <PageContainer style={{ height: innerHeight }}>
        { this.props.bindPhoneStatus === 1 && <BindPhoneFirst />}
        { this.props.bindPhoneStatus === 2 && <BindPhoneSecond />}
        {this.props.bindPhoneStatus === 3 ?
          <PanelContainer>
            <BindPhoneBox>
              <p style={{ margin: '57px 0 40px 0' }}><FormattedMessage {...messages.authorizedFailAndRelogin} /></p>
              <Button style={{ marginRight: '20px' }} onClick={this.handleBack}><FormattedMessage {...messages.back} /></Button>
              <Button onClick={this.handleLogin}><FormattedMessage {...messages.relogin} /></Button>
            </BindPhoneBox>
          </PanelContainer>
          : null}
      </PageContainer>
    );
  }
}

BindPhone.propTypes = {
  bindPhoneStatus: PropTypes.number.isRequired,
  changeBindPhoneStartPass: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  bindPhoneStatus: makeSelectBindPhoneStatus(), // 0: 状态还没有拿到，1：未绑定，2：已绑定，3：有风险
});

export function mapDispatchToProps(dispatch) {
  return {
    changeBindPhoneStartPass: (data) => dispatch(changeBindPhoneStartPass(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(BindPhone);

