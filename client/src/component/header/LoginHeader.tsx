import React from "react";
import { styled } from "styled-components";

const LoginHeader = () => {
  return (
    <a>
      <Login>Login</Login>
    </a>
  );
};

export default LoginHeader;

export const Login = styled.div`
  color: #279eff;
`;
