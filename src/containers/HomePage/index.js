import React from 'react';
import { withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import commonMessages from 'utils/commonMessages';

@withRouter
class HomePage extends React.Component {
  render() {
    return (<div><FormattedMessage {...commonMessages.close} /></div>);
  }
}

export default HomePage;
