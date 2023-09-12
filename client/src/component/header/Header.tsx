import React from "react";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import petalkText from "../../asset/LogoAsset/petalk-text.png";

const menuList = [
  { text: "Sign Up", link: "/memberAgree" },
  { text: "Login", link: "/login" },
];

const Header = () => {
  return (
    <HeaderContainer>
      <LogoLink to={"/"}>
        <HeadLogo src={petalkText} alt="petTalk"></HeadLogo>
      </LogoLink>
      <HeaderBtnContainer>
        {menuList.map(el => (
          <MenuLink to={el.link} key={el.text}>
            {el.text}
          </MenuLink>
        ))}
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
  min-width: 320px;
  max-width: 500px;
  /* width: 100%;  이거 설정하면 컨테이너 뚫고 나감*/
  box-shadow: 0px 10px 34px #272c5614;
  background-color: white;
  z-index: 999;
`;
export const LogoLink = styled(Link)`
  margin-left: 20px;
`;

export const HeadLogo = styled.img`
  height: 28px;
`;

export const HeaderBtnContainer = styled.div`
  display: flex;
  align-items: end;
  padding-right: 20px;
`;

export const MenuLink = styled(Link)`
  margin-right: 24px;
  color: #279eff;
`;
