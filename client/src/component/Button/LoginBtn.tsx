import React from "react";
import { styled } from "styled-components";

interface LoginBtnProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const LoginBtn: React.FC<LoginBtnProps> = ({ onClick }) => {
  return <LIBtn onClick={onClick}>로그인</LIBtn>;
};

export default LoginBtn;

export const LIBtn = styled.button`
  width: 240px;
  height: 30px;
  background-color: #279eff;
  align-items: center;
  font-size: 16px;
  justify-content: center;
  color: white;
  border: 0px;
  border-radius: 4px;
  margin-top: 12px;
`;
