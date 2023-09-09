import React from "react";
import { styled } from "styled-components";

const SignUpHeader = () => {
  return (
    <SignUpLink>
      <SignUp>signup</SignUp>
    </SignUpLink>
  );
};

export default SignUpHeader;

export const SignUpLink = styled.a`
  padding-right: 20px;
`;

export const SignUp = styled.div`
  color: #279eff;
`;
