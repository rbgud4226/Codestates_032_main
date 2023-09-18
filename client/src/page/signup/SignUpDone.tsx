import React from "react";
import { styled } from "styled-components";
import PetTalkLogo from "../../component/petalkLogo/PetTalkLogo";
import LargeBtn from "../../component/Button/LargeCheckBtn";

const SignUpDone = () => {
  const loginBtnHdr = () => {
    window.location.replace("/login");
  };
  return (
    <DoneCtn>
      <PetTalkLogo />
      <SDSection>
        <WelcomeSpan>환영합니다!</WelcomeSpan>
        <LoginCtn onClick={() => loginBtnHdr()}>
          <LargeBtn name={"로그인"} />
        </LoginCtn>
      </SDSection>
    </DoneCtn>
  );
};

export default SignUpDone;

const DoneCtn = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 60px;
  align-items: center;
`;

const SDSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
`;

const WelcomeSpan = styled.span`
  font-size: 20px;
  margin-top: 24px;
`;

const LoginCtn = styled.div`
  width: 240px;
  margin-top: 80px;
`;
