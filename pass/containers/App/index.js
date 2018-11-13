/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import 'antd/dist/antd.less';
// import { Helmet } from 'react-helmet';
import { Route, withRouter } from 'react-router-dom';
import { compose } from 'redux';

import injectSaga from '../../utils/injectSaga';
import saga from './saga';

import Login from '../Login';
import ResetPassword from '../ResetPassword';
import BindPhone from '../BindPhone';
import EditPassword from '../EditPassword';
import Logout from '../Logout';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        {/* <Helmet */}
        {/* titleTemplate="pass - CAT" */}
        {/* defaultTitle="CAT" */}
        {/* > */}
        {/* <meta name="description" content="CAT" /> */}
        {/* </Helmet> */}
        <div>
          <Route path="/login" key="login" component={Login} />
          <Route path="/resetpwd" key="resetpwd" component={ResetPassword} />
          <Route path="/bindphone" key="bindphone" component={BindPhone} />
          <Route path="/editpwd" key="editpwd" component={EditPassword} />
          <Route path="/logout" key="logout" component={Logout} />
        </div>
      </div>
    );
  }
}

App.propTypes = {
};

const withSaga = injectSaga({ key: 'main', saga });

export default withRouter(compose(
  withSaga,
)(App));
