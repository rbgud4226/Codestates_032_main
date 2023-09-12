import React, { useState } from "react";
import { styled } from "styled-components";
import PetTalkLogo from "../../petalkLogo/PetTalkLogo";
import SignUpForm from "./SignUpForm";
import MobileVerify from "./MobileVerify";
import VerifyNumber from "./VerifyNumber";

const SignUp = () => {
  const [phoneNum, setPhoneNum] = useState("");
  return (
    <SignUpCtn>
      <PetTalkLogo />
      <MobileVerify setPhoneNum={setPhoneNum} />
      <VerifyNumber phoneNum={phoneNum} />
      <SignUpForm phoneNum={phoneNum} />
    </SignUpCtn>
  );
};

export default SignUp;

export const SignUpCtn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
`;
