import React from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";

const LoginHeader = () => {
  return <Login to={"/login"}>Login</Login>;
};

export default LoginHeader;

export const Login = styled(Link)`
  margin-right: 24px;
  color: #279eff;
`;
