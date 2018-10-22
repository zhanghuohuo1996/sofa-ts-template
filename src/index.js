import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Main from 'containers/Main';
import storeFactory from './state/storeFactory';

import './global-styles';
import './theme/style.less';

const initialState = {};
const store = storeFactory(initialState);

function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);

if (module.hot) {
  module.hot.accept('containers/Main', () => {
    ReactDOM.unmountComponentAtNode(rootElement);
    ReactDOM.render(<App />, rootElement);
  });
}
