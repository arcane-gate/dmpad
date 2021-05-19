import { StrictMode } from "react";
import ReactDOM from "react-dom";

import DMPad from "./DMpad";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <DMPad />
  </StrictMode>,
  rootElement
);
