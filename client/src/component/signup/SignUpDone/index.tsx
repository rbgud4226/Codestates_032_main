import React from "react";
import { styled } from "styled-components";
import PetTalkLogo from "../../PetTalkLogo/PetTalkLogo";
import SignUpDoneForm from "./SignUpDoneForm";
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
  margin-top: 269px;
  align-items: center;
`;
