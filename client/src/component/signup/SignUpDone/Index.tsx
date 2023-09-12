import React from "react";
import { styled } from "styled-components";
import PetTalkLogo from "../../petalkLogo/PetTalkLogo";
import SignUpDoneForm from "./SignUpDone.Form";
const SignUpDone = () => {
  return (
    <DoneCtn>
      <PetTalkLogo />
      <SignUpDoneForm />
    </DoneCtn>
  );
};

export default SignUpDone;

export const DoneCtn = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 60px;
  align-items: center;
`;
