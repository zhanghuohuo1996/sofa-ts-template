import React from 'react';
import { withRouter } from 'react-router-dom';

import injectReducer from 'utils/injectReducer';

import { NAMESPACE } from './constants';
import reducer from './reducer';
import Toolbar from './modules/FunctionsAndSearchToolbar';
import Table from './modules/DataTable';
import Modal from './modules/CreateAndModifyModal';

const withReducer = injectReducer({ key: NAMESPACE, reducer });

@withRouter
@withReducer
class ToolbarTableModal extends React.Component {
  render() {
    return (
      <div>
        <Toolbar />
        <Table />
        <Modal />
      </div>);
  }
}

export default ToolbarTableModal;
