import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

import Main from 'containers/Main';

import './theme/style.less';

function App() {
  return (
    <div>
      <Main />
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);

if (module.hot) {
  module.hot.accept('components/TestComponent', () => {
    ReactDOM.unmountComponentAtNode(rootElement);
    ReactDOM.render(<App />, rootElement);
  });
}
