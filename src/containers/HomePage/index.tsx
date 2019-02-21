import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { injectIntl, InjectedIntl } from 'react-intl';
import messages from './messages';

interface Props extends RouteComponentProps {
  intl: InjectedIntl;
}

class HomePage extends React.Component<Props, object> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { intl } = this.props;
    return (<div>{intl.formatMessage(messages.homePage)}</div>);
  }
}

export default injectIntl(withRouter(HomePage));
