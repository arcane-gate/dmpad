import { StrictMode } from "react";
import ReactDOM from "react-dom";

import DMPad from "./DMpad";
import DiceRoller from "./DiceRoller";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <DMPad />
  </StrictMode>,
  rootElement
);

const diceElement = document.getElementById("dice-root");
ReactDOM.render(
  <StrictMode>
    <DiceRoller />
  </StrictMode>,
  diceElement
);
