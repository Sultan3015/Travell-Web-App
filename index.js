import React from "react";
import ReactDOM from "react-dom";
import SocialFollow from "./SocialFollow";
import "./styles.css";

function App() {
  return (
    <div className="App">
      <SocialFollow />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
