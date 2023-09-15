import React from "react";
import styled from "styled-components";
import LoginForm from "../component/Login/LoginForm";
import PetTalkLogo from "../component/petalkLogo/PetTalkLogo";

const LoginPage = () => {
  return (
    <>
      <LoginContainer>
        <PetTalkLogo />
        <LoginForm />
      </LoginContainer>
    </>
  );
};

export default LoginPage;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
`;
