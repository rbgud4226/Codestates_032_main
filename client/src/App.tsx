import React from "react";
import styled, { createGlobalStyle } from "styled-components";
<<<<<<< HEAD
<<<<<<< HEAD
import { BrowserRouter as Router } from "react-router-dom";
=======
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
=======
import { BrowserRouter as Router } from "react-router-dom";
>>>>>>> a06214b (fix:nav를 제외한 헤더및 페이지 삭제)
import Nav from "./component/nav/Nav";
import LoginPage from "./page/LoginPage";
<<<<<<< HEAD
import MemberAgreePage from "./page/memberAgreePage";
import SignUpPage from "./page/SignUpPage";
import MainPage from "./page/MainPage";

>>>>>>> 27a48d4 (feat:Nav 뷰 구현)
=======
>>>>>>> a06214b (fix:nav를 제외한 헤더및 페이지 삭제)
function App() {
  return (
    <>
      <Router>
        <GlobalStyles />
        <Main>
          <Container>
<<<<<<< HEAD
<<<<<<< HEAD
            <Wrapper></Wrapper>
=======
            <Header />
=======
>>>>>>> a06214b (fix:nav를 제외한 헤더및 페이지 삭제)
            <Wrapper>
              <LoginPage />
            </Wrapper>
            <Nav />
>>>>>>> 27a48d4 (feat:Nav 뷰 구현)
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

const Wrapper = styled.div`
  min-height: 100%;
  margin: 28px;
`;
