import React, { useEffect, useRef, useState } from "react";
import init from "./roller";
import Roll from "roll";

import "./DiceRoller.scss";

const roll = new Roll();

const DiceRoller = () => {
  const rollerDiv = useRef(null);
  const [showNotif, setShowNotif] = useState(false);
  const [rollText, setRollText] = useState("1d20");
  const createRoll = (cb) => (e) => {
    const rt = e.detail;
    if (!rt) return;
    console.log(rt);
    const { die } = rt.match(/\d+(?<die>d\d+)/).groups;
    setRollText(rt);
    setShowNotif(true);
    cb(die);
  };
  useEffect(() => {
    document.addEventListener(
      "rollDice",
      createRoll((dieType) => {
        if (typeof dieType === "string" && rollerDiv.current) {
          init(rollerDiv.current, dieType);
        }
      })
    );
    return () => document.removeEventListener("rollDice", createRoll);
  }, [rollerDiv]);
  const { result } = roll.roll(rollText);
  return (
    showNotif && (
      <button
        style={{ opacity: showNotif ? 1 : 0 }}
        onClick={() => setShowNotif(false)}
        className="c-DiceRoller"
      >
        <div ref={rollerDiv} className="c-DiceRoller-anim"></div>
        {rollText}=<strong>{result}</strong>
      </button>
    )
  );
};

export default DiceRoller;
