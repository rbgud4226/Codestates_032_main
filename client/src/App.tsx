import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <GlobalStyles />
        <Main>
          <Container>
            <Header />
            <Wrapper>배고파</Wrapper>
          </Container>
        </Main>
      </Router>
    </>
  );
}
export default App;

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-decoration: none;
    font-family: 'Roboto';
  }
`;
const Main = styled.main`
  width: 100vw;
  height: 100vh;
  margin: 0px;
  display: flex;
  justify-content: center;
`;
const Container = styled.div`
  width: 393px;
  min-width: 320px;
  min-height: 100vh;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 8px 36px;
`;

const Header = styled.div`
  min-height: 70px;
  min-width: 320px;
  background-color: aqua;
`;

const Wrapper = styled.div`
  min-height: 100%;
  margin: 28px;
  background-color: pink;
`;
