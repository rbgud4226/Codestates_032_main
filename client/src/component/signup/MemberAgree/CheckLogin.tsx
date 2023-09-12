import React from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";

const CheckLogin = () => {
  return (
    <LoginCtn>
      <LoginSpan>계정이 있으시다면?</LoginSpan>
      <LoginLink to={"/login"}>로그인</LoginLink>
    </LoginCtn>
  );
};

export default CheckLogin;

export const LoginCtn = styled.div`
  display: flex;
  margin-top: 12px;
`;

export const LoginSpan = styled.span`
  font-size: 12px;
  margin-right: 4px;
`;
export const LoginLink = styled(Link)`
  font-size: 12px;
  color: #595959;
`;
