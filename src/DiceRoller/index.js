import React, { useEffect, useRef } from "react";
import roller from "./roller";

import "./DiceRoller.scss";

const DiceRoller = () => {
  const rollerDiv = useRef(null);
  useEffect(() => {
    if (rollerDiv.current) {
      roller.then((init) => {
        init(rollerDiv.current).then((roll) => {
          roll();
        });
      });
    }
  }, [rollerDiv]);
  return (
    <>
      <div ref={rollerDiv} className="c-DiceRoller"></div>
    </>
  );
};

export default DiceRoller;
