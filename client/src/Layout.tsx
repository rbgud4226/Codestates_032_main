import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

export default function Layout({ children }: any) {
  const { pathname } = useLocation();

  return (
    <Body>
      <Container>
        {pathname === "/" || pathname === "/chat" ? (
          children
        ) : (
          <Wrapper>{children}</Wrapper>
        )}
      </Container>
    </Body>
  );
}

const Body = styled.div`
  width: 100%;
`;

const Container = styled.div`
  width: 100%;
  min-height: calc(100vh - 70px - 70px);
`;

const Wrapper = styled.div`
  margin: 16px;
`;
