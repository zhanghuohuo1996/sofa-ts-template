import React from 'react';
import { withRouter } from 'react-router-dom';

import Toolbar from './modules/Toolbar';

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
