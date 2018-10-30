import React from 'react';
import { withRouter } from 'react-router-dom';

import injectReducer from 'utils/injectReducer';

import reducer from './reducer';
import Toolbar from './modules/Toolbar';

const NAMESPACE = 'ToolbarTableModal';
const withReducer = injectReducer({ key: NAMESPACE, reducer });

@withReducer
@withRouter
class ToolbarTableModal extends React.Component {
  render() {
    return (
      <div>
        <Toolbar />
      </div>);
  }
}

export default ToolbarTableModal;
