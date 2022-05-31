import React, { useEffect, useRef, useState } from "react";
import init, { Die } from "./roller";
import Roll from "roll";
import styled from "styled-components";
import { resolveSrv } from "dns/promises";

const DiceRollerContainer = styled.div`
  position: fixed;
  bottom: 16px;
  right: 16px;
  width: 300px;
`;

const StyledDiceRoller = styled.button`
  width: 300px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background: #fff;
  border: 1px solid var(--c-gray);
  box-shadow: var(--main-shadow);
  cursor: pointer;
`;

const DiceRollerAnimation = styled.div`
  height: 100%;
  table {
    font-size: 4px !important;
    line-height: 4px !important;
  }
`;

const roll = new Roll();

type RollNotifProps = {
  onClick?: () => void;
  rollText: string;
  result: number;
};

const RollNotif: React.FC<RollNotifProps> = ({ onClick, rollText, result }) => {
  const rollerDiv = useRef(null);
  useEffect(() => {
    const { die } = rollText.match(/\d+(?<die>d\d+)/)?.groups || {};
    if (rollerDiv.current && die) {
      init(rollerDiv.current, die as Die)();
    }
  });
  return (
    <StyledDiceRoller onClick={onClick}>
      <DiceRollerAnimation ref={rollerDiv} />
      {rollText}=<strong>{result}</strong>
    </StyledDiceRoller>
  );
};

type Rolls = Array<{
  rollText: string;
  result: number;
}>;

const DiceRoller = () => {
  const [rolls, setRolls] = useState<Rolls>([]);
  const createRoll = ((e: CustomEvent) => {
    const rollText: string = e.detail;
    if (!rollText) return;
    const { result } = roll.roll(rollText);
    setRolls([...rolls, { rollText, result }]);
  }) as EventListener;
  useEffect(() => {
    document.addEventListener("rollDice", createRoll);
    return () => document.removeEventListener("rollDice", createRoll);
  });
  const removeRoll = (index: number) => () => {
    let removed = [...rolls];
    removed.splice(index, 1);
    console.log(removed);
    setRolls(removed);
  };
  return (
    <DiceRollerContainer>
      {rolls.map((roll, index) => (
        <RollNotif
          key={index}
          rollText={roll.rollText}
          onClick={removeRoll(index)}
          result={roll.result}
        />
      ))}
    </DiceRollerContainer>
  );
};

export default DiceRoller;
