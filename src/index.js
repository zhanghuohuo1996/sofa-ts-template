import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';

import Main from 'containers/Main';
import { DEFAULT_LOCALE } from 'utils/constants';
import { translationMessages } from './i18n';

import storeFactory from './state/storeFactory';

import './global-styles';
import './theme/style.less';

const rootElement = document.getElementById('root');
const initialState = {};
const store = storeFactory(initialState);

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <IntlProvider
        locale={DEFAULT_LOCALE}
        messages={translationMessages[DEFAULT_LOCALE]}
      >
        <Main />
      </IntlProvider>
    </Provider>,
    rootElement,
  );
};

if (module.hot) {
  module.hot.accept(['./i18n', 'containers/Main'], () => {
    ReactDOM.unmountComponentAtNode(rootElement);
    render();
  });

  // Chunked polyfill for browsers without Intl support
  if (!window.Intl) {
    (new Promise((resolve) => {
      resolve(import('intl'));
    }))
      .then(() => Promise.all([
        import('intl/locale-data/jsonp/en.js'),
        import('intl/locale-data/jsonp/zh.js'),
      ]))
      .then(() => render(translationMessages))
      .catch((err) => {
        throw err;
      });
  } else {
    render(translationMessages);
  }
}
export default store;
