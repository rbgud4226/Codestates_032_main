import React from "react";
import { styled } from "styled-components";
import PetTalkLogo from "../../petalkLogo/PetTalkLogo";
import SignUpForm from "./SignUpForm";

const SignUp = () => {
  return (
    <SignUpCtn>
      <PetTalkLogo />
      <SignUpForm />
    </SignUpCtn>
  );
};

export default SignUp;

export const SignUpCtn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
`;
