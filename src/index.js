import React from "react";
import ReactDOM from "react-dom";

import testImg from './images/test.png';

import "./style.css";

function App() {
  return (
    <div className="App">
      <h1>Test ddd</h1>
      <img src={ testImg } />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
