import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, withRouter } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import ToolbarTableModal from 'containers/ToolbarTableModal/Loadable';

import Loadable from 'react-loadable';
import LoadingIndicator from 'components/LoadingIndicator';

@withRouter
// eslint-disable-next-line
class CoreRoute extends React.PureComponent {
  static propTypes = {
    menuConf: PropTypes.array.isRequired,
  };

  static makePathToComponentMap = (menu) => {
    return [];
  };

  render() {
    return (
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route
          path="/example/toolbartablemodal"
          component={Loadable({
            loader: () => import('../ToolbarTableModal'),
            loading: LoadingIndicator,
          })}
        />
        <Route path="/homepage" component={NotFoundPage} />
      </Switch>
    );
  }
}

export default CoreRoute;
