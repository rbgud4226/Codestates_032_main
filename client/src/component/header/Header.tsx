import React from "react";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import petalkText from "../../asset/LogoAsset/petalk-text.png";
import global from "../../Data/global.js";
import axios from "axios";

const api = process.env.REACT_APP_DB_HOST;

const menuList = [
  { text: "Sign Up", link: "/memberAgree" },
  { text: "Login", link: "/login" },
];

const Header = () => {
  //로그아웃 Hdr
  const logoutHdr = async () => {
    try {
      const res = await axios.post(`${api}/members/logout`, {
        headers: {
          Authorization: `${localStorage.getItem("accessToken")}`,
          Accept: "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
      });
      console.log(res);
      window.localStorage.clear();
      window.location.href = "/";
    } catch (error) {
      console.log("로그아웃에러", error);
    }
  };

  return (
    <HeaderContainer>
      <Link to={"/"}>
        <HeadLogo src={petalkText} alt="petTalk"></HeadLogo>
      </Link>
      <HeaderBtnContainer>
        {!window.localStorage.getItem("accessToken") ? (
          menuList.map(el => (
            <MenuLink to={el.link} key={el.text}>
              {el.text}
            </MenuLink>
          ))
        ) : (
          <div
            style={{
              color: `${global.Primary.value}`,
              cursor: "pointer",
            }}
            onClick={() => logoutHdr()}
          >
            Logout
          </div>
        )}
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
  box-shadow: 0px 10px 34px #272c5614;
  background-color: white;
  z-index: 999;
  padding: 0px 20px;
`;

export const HeadLogo = styled.img`
  height: 28px;
`;

export const HeaderBtnContainer = styled.div`
  display: flex;
  gap: 16px;
  align-items: end;
`;

export const MenuLink = styled(Link)`
  color: ${global.Primary.value};
`;
