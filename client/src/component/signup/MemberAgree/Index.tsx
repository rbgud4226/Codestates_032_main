import React, { useState } from "react";
import { styled } from "styled-components";
import PetTalkLogo from "../../petalkLogo/PetTalkLogo";
import MemberAgreeForm from "./MemberAgreeForm";
import CheckLogin from "./CheckLogin";

const MemberAgree = () => {
  return (
    <MAContainer>
      <PetTalkLogo />
      <MemberAgreeForm />
      <CheckLogin />
    </MAContainer>
  );
};

export default MemberAgree;

export const MAContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
`;
