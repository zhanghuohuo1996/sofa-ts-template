import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Main from 'containers/Main';
import storeFactory from './state/storeFactory';

import './global-styles';
import './theme/style.less';
// Import i18n messages
// import { translationMessages } from './i18n';

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
  module.hot.accept(['./i18n', 'containers/Main'], () => {
    ReactDOM.unmountComponentAtNode(rootElement);
    ReactDOM.render(<App />, rootElement);
  });

  // // Chunked polyfill for browsers without Intl support
  // if (!window.Intl) {
  //   (new Promise((resolve) => {
  //     resolve(import('intl'));
  //   }))
  //     .then(() => Promise.all([
  //       import('intl/locale-data/jsonp/en.js'),
  //       import('intl/locale-data/jsonp/zh.js'),
  //     ]))
  //     .then(() => render(translationMessages))
  //     .catch((err) => {
  //       throw err;
  //     });
  // } else {
  //   render(translationMessages);
  // }
}
