import React from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

const LoginHeader = () => {
  const navigate = useNavigate();

  return <Login onClick={(): void => navigate("/login")}>Login</Login>;
};

export default LoginHeader;

export const Login = styled.div`
  color: #279eff;
`;
