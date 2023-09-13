import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import LoginPage from "./page/LoginPage";
import MemberAgreePage from "./page/signup/MemberAgreePage";
import SignUpPage from "./page/signup/SignUpPage";
import SignUpDonePage from "./page/signup/SignUpDonePage";
import Mypage from "./page/Mypage";
import Header from "./component/header/Header";
import Nav from "./component/nav/Nav";
import PetSitterPage from "./page/PetsitterRegisterPage";
import MainPage from "./page/MainPage";

import BorderListPage from "./page/PostList";
import WritePostPage from "./page/WritePostPage";
import PostDetailPage from "./page/PostDetailPage";



function App() {
  return (
    <>
      <Router>
        <GlobalStyles />
        <Body>
          <Container>
            <Header />
            <Layout>
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/memberAgree" element={<MemberAgreePage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/signupDone" element={<SignUpDonePage />} />
                <Route path="/" element={<MainPage />} />
                <Route
                  path="/members"
                  element={
                    window.localStorage.getItem("accessToken") ? (
                      <Mypage />
                    ) : (
                      <LoginPage />
                    )
                  }
                />
                <Route path="/petsitter" element={<PetSitterPage />} />
                <Route path="/petsitter/edit" element={<PetSitterPage />} />

                <Route path="/mainpage" element={<BorderListPage />} />
                <Route path="/writpost" element={<WritePostPage />} />
                <Route path="/board" element={<PostDetailPage />} />
              </Routes>
            </Layout>
            <Nav />
          </Container>
        </Body>
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
const Body = styled.body`
  width: 100vw;
  margin: 0px;
  display: flex;
  justify-content: center;
`;
const Container = styled.div`
  width: 500px;
  min-width: 320px;
  min-height: 100vh;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 8px 36px;
`;
