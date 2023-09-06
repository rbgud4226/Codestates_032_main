import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

export default function Layout({ children }: any) {
  const { pathname } = useLocation();

  return (
    <Body>
      <Container>
        {pathname === "/" ? children : <Wrapper>{children}</Wrapper>}
      </Container>
    </Body>
  );
}

const Body = styled.div`
  height: 100%;
  margin: 0px;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  width: 500px;
  min-width: 320px;
  min-height: 100vh;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 8px 36px;
  /* background-color: pink; 식별하기 위해 색 넣음. 빼시면 됩니다! */
`;

const Wrapper = styled.div`
  min-height: 100%;
  margin: 16px; /* Wrapper에만 마진을 적용 */
`;
