import React from "react";
import styled, { CSSProperties } from "styled-components";

import { Pad } from "../../types/pad";

const Header = styled.header`
  background: var(--padHeader);
  height: 100%;
  width: 100%;
  border-bottom: var(--mainBorder);
  padding: 16px;
`;

const Title = styled.h1`
  display: inline-flex;
  align-items: center;
  font-size: 1rem;
  font-weight: 300;
  background: rgba(0, 0, 0, 0.3);
  color: var(--white);
  padding: 10px 16px 8px;
  border-radius: 16px;
`;

type PadHeaderProps = {
  pad: Pad;
};

const PadHeader: React.FC<PadHeaderProps> = ({ pad }) => {
  const { headerImage, title, icon = "⚔️" } = pad;
  const background = "#f1f1f1";
  return (
    <Header style={{ "--padHeader": background } as CSSProperties}>
      <Title>
        {icon} {title}
      </Title>
    </Header>
  );
};

export default PadHeader;
