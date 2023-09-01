import React from "react";
import styled, { createGlobalStyle } from "styled-components";
<<<<<<< HEAD
import { BrowserRouter as Router } from "react-router-dom";
=======
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./component/nav/Nav";
import Header from "./component/header/Header";
import LoginPage from "./page/LoginPage";
import MemberAgreePage from "./page/memberAgreePage";
import SignUpPage from "./page/SignUpPage";
import MainPage from "./page/MainPage";

>>>>>>> 27a48d4 (feat:Nav 뷰 구현)
function App() {
  return (
    <>
      <Router>
        <GlobalStyles />
        <Main>
          <Container>
<<<<<<< HEAD
            <Wrapper></Wrapper>
=======
            <Header />
            <Wrapper>
              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/memberAgree" element={<MemberAgreePage />} />
                <Route path="/signup" element={<SignUpPage />} />
              </Routes>
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
