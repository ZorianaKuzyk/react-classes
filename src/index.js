import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Timer from "./timer/timer.js";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <Timer autoStart={false} from={10} interval={1000} />
    <Timer autoStart={true} from={10} interval={1000} />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
reportWebVitals();
