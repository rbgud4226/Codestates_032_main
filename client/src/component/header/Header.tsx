import React from "react";
import { styled } from "styled-components";
import HeaderLogo from "./HeaderLogo";
import SignUpHeader from "./SignUpHeader";
import LoginHeader from "./LoginHeader";

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderLogo />
      <HeaderBtnContainer>
        <SignUpHeader />
        <LoginHeader />
      </HeaderBtnContainer>
    </HeaderContainer>
  );
};

export default Header;

export const HeaderContainer = styled.header`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  min-width: 320px;
  width: 393px;
  /* width: 100%;  이거 설정하면 컨테이너 뚫고 나감*/
  box-shadow: 0px 10px 34px #272c5614;
  background-color: white;
`;

export const HeaderBtnContainer = styled.section`
  display: flex;
  align-items: end;
  padding-right: 20px;
`;
