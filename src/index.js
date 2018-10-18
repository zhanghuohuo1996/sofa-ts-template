import React from 'react';
import ReactDOM from 'react-dom';

import TestComponent from 'components/TestComponent';
import testImg from './images/test.png';

import './style.css';

function App() {
  return (
    <div className="App">
      <h1>Test ddd</h1>
      <TestComponent />
      <img src={testImg} alt="test" />
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
