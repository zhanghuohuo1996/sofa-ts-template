import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { injectIntl, InjectedIntl } from 'react-intl';
import messages from './messages';

interface IProps extends RouteComponentProps {
  intl: InjectedIntl;
}

class HomePage extends React.Component<IProps, object> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    const { intl } = this.props;
    return (<div>{intl.formatMessage(messages.homePage)}</div>);
  }
}

export default injectIntl(withRouter(HomePage));
