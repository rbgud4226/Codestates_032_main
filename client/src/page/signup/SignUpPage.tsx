import React, { useState } from "react";
import PetTalkLogo from "../../component/petalkLogo/PetTalkLogo";
import MobileVerify from "../../component/signup/MobileVerify";
import SignUpForm from "../../component/signup/SignUpForm";
import VerifyNumber from "../../component/signup/VerifyNumber";
import styled from "styled-components";
import { Link } from "react-router-dom";

const SignUpPage = () => {
  const [phoneNum, setPhoneNum] = useState("");
  return (
    <SignUpCtn>
      <PetTalkLogo />
      <MobileVerify setPhoneNum={setPhoneNum} />
      <VerifyNumber phoneNum={phoneNum} />
      <SignUpForm phoneNum={phoneNum} />
      <LoginCtn>
        <LoginSpan>계정이 있으시다면?</LoginSpan>
        <LoginLink to={"/login"}>로그인</LoginLink>
      </LoginCtn>
    </SignUpCtn>
  );
};

export default SignUpPage;

const SignUpCtn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
`;

const LoginCtn = styled.div`
  display: flex;
  margin-top: 12px;
`;

const LoginSpan = styled.span`
  font-size: 12px;
  margin-right: 4px;
`;
const LoginLink = styled(Link)`
  font-size: 12px;
  color: #595959;
`;
