import React from "react";
import ReactDOM from "react-dom";

import testImg from './images/test.png';
import TestComponent from 'components/TestComponent';

import "./style.css";

function App() {
  return (
    <div className="App">
      <h1>Test ddd</h1>
      <TestComponent />
      <img src={ testImg } />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

if (module.hot) {
  module.hot.accept('components/TestComponent', function() {
    ReactDOM.unmountComponentAtNode(rootElement);
    ReactDOM.render(<App />, rootElement);
  });
}
