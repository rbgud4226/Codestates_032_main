import React from "react";
import { styled } from "styled-components";
import HeaderLogo from "./HeaderLogo";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderLogo />
      <HeaderBtnContainer>
        <CustomLink to={"/signup"}>Signup</CustomLink>
        <CustomLink to={"/login"}>Login</CustomLink>
      </HeaderBtnContainer>
    </HeaderContainer>
  );
};

export default Header;

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  width: 100%;
  top: 0;
  position: sticky;
  width: 100%;
  box-shadow: 0px 10px 34px #272c56;
  background-color: white;
  padding: 0 20px;
`;

export const HeaderBtnContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const CustomLink = styled(Link)`
  color: #279eff;
`;
