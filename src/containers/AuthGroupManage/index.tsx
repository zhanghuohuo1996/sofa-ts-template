import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import { NAMESPACE } from './constants';
import reducer from './reducer';
import saga from './saga';

import Toolbar from './modules/FunctionsAndSearchToolbar';
import Table from './modules/DataTable';
import Modal from './modules/CreateAndEditModal';

const withReducer = injectReducer({ key: NAMESPACE, reducer });
const withSaga = injectSaga({ key: NAMESPACE, saga });

class AuthGroupManage extends React.Component {
  render() {
    return (
      <div>
        <Toolbar />
        <Table />
        <Modal />
      </div>);
  }
}

export default compose(
  withRouter,
  withSaga,
  withReducer,
)(AuthGroupManage);
