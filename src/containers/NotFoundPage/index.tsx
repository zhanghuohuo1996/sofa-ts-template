import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { injectIntl, InjectedIntl } from 'react-intl';

interface Props extends RouteComponentProps {
  intl: InjectedIntl;
}

class NotFoundPage extends React.Component<Props, object> {
  render() {
    return (<div>Not Found</div>);
  }
}

export default withRouter(NotFoundPage);
