import React, { ReactElement } from "react";
import styled from "styled-components";
import { lightGray, white } from "../../styles/tokens";

const Sidebar = styled.aside`
  height: 100vh;
  padding: 16px;
  border-right: var(--mainBorder);
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    li {
      width: 100%;
      &.active {
        background: var(--white);
      }
    }
  }
`;

const Content = styled.main``;

const Container = styled.section`
  display: grid;
  grid-template-columns: 20vw 1fr;
  height: 100vh;
  width: 100vw;
`;

type LayoutProps = {
  sidebar: ReactElement;
};

const Layout: React.FC<LayoutProps> = ({ sidebar, children }) => {
  return (
    <Container>
      <Sidebar>{sidebar}</Sidebar>
      <Content>{children}</Content>
    </Container>
  );
};

export default Layout;
