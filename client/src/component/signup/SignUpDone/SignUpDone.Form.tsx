import React from "react";
import { styled } from "styled-components";
import LoginBtn from "../../Button/LoginBtn";
import { useNavigate } from "react-router-dom";

const SignUpDoneForm = () => {
  const navigate = useNavigate();

  const loginBtnHdr = () => {
    navigate("/login");
  };
  return (
    <SDSection>
      <div>
        <AgreeSpan>약관동의</AgreeSpan>
        <InputSpan>정보입력</InputSpan>
        <DoneSpan>완료</DoneSpan>
      </div>
      <WelcomeSpan>환영합니다!</WelcomeSpan>
      <LoginCtn>
        <LoginBtn onClick={loginBtnHdr} />
      </LoginCtn>
    </SDSection>
  );
};

export default SignUpDoneForm;

export const SDSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
`;

export const AgreeSpan = styled.span`
  font-size: 12px;
  margin-right: 5px;
  color: #595959;
`;

export const InputSpan = styled.span`
  font-size: 12px;
  color: #595959;
  margin-right: 5px;
`;

export const DoneSpan = styled.span`
  font-size: 12px;
  font-weight: 600;
`;

export const WelcomeSpan = styled.span`
  font-size: 20px;
  margin-top: 24px;
`;

export const LoginCtn = styled.div`
  margin-top: 80px;
`;
