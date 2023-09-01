import React from "react";
import { styled } from "styled-components";
import { Link } from "react-router-dom";

const LoginHeader = () => {
  return <Login to="/login">Login</Login>;
};

export default LoginHeader;

export const Login = styled(Link)`
  color: #279eff;
  cursor: pointer;
`;
