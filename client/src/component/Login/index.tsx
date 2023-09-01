import React from "react";
import LoginForm from "./LoginForm";
import PetTalkLogo from "./PetTalkLogo";
import { styled } from "styled-components";
const Login = () => {
  return (
    <div>
      <PetTalkLogo />
      <LoginForm />
    </div>
  );
};

export default Login;

export const LoginContainer = styled.div``;
