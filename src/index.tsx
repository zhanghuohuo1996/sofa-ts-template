import 'babel-polyfill';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Main from './containers/Main';
import LanguageProvider from './containers/LanguageProvider';
import { translationMessages } from './utils/i18n';
import storeFactory from './state/storeFactory';

import './global-styles';
import './theme/style.less';

const rootElement = document.getElementById('root');
const initialState = {};
const store = storeFactory(initialState);

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <LanguageProvider messages={translationMessages}>
        <Main compiler="lichun" framework="haha" />
      </LanguageProvider>
    </Provider>,
    rootElement,
  );
};

render();
