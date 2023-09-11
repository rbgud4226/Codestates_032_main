import React from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";

const SignUpHeader = () => {
  return <SignUp to={"/memberAgree"}>Sign up</SignUp>;
};

export default SignUpHeader;

export const SignUp = styled(Link)`
  margin-right: 24px;
  color: #279eff;
`;
