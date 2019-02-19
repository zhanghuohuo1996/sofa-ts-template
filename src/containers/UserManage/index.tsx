import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import { NAMESPACE } from './constants';
import reducer from './reducer';
import saga from './saga';

import Toolbar from './modules/FunctionsAndSearchToolbar';
import Table from './modules/DataTable';
import Modal from './modules/CreateAndEditModal';
import ResetPasswordModal from './modules/ResetPasswordModal';
import OperationAuthSelectModal from './modules/OperationAuthSelectModal';

const withReducer = injectReducer({ key: NAMESPACE, reducer });
const withSaga = injectSaga({ key: NAMESPACE, saga });

export interface Props extends RouteComponentProps {

};


class UserManage extends React.Component<Props, object> {
  render() {
    return (
      <div>
        <Toolbar />
        <Table />
        <Modal />
        <ResetPasswordModal />
        <OperationAuthSelectModal />
      </div>);
  }
}

export default compose(
  withRouter,
  withSaga,
  withReducer,
)(UserManage);
