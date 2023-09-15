import React from "react";
import { styled } from "styled-components";
import bookIcon from "../../asset/NavAsset/book-icon.png";
import bookCheckIcon from "../../asset/NavAsset/book-check-icon.png";
import searchIcon from "../../asset/NavAsset/search-icon.png";
import myPageIcon from "../../asset/NavAsset/mypage-icon.png";
import { Link } from "react-router-dom";
import global from "../../Data/global.json";

const BtnArr = [
  {
    text: "예약하기",
    src: bookIcon,
    link: "/reservation",
  },
  {
    text: "예약확인",
    src: bookCheckIcon,
    link: "/members/recent",
  },
  {
    text: "검색",
    src: searchIcon,
    link: "/search",
  },
  {
    text: "마이페이지",
    src: myPageIcon,
    link: "/members",
  },
];

const Nav = () => {
  return (
    <NavContainer>
      {BtnArr.map(data => (
        <BookContainer key={data.text} to={data.link}>
          <BookIcon src={data.src}></BookIcon>
          <BookLb>{data.text}</BookLb>
        </BookContainer>
      ))}
    </NavContainer>
  );
};

export default Nav;

export const NavContainer = styled.nav`
  display: flex;
  height: 70px;
  width: 100%;
  bottom: 0;
  position: sticky;
  width: 100%;
  box-shadow: 0px 10px 34px #272c5614;
  background-color: ${global.White.value};
`;

const BaseStyledComponent = styled(Link)`
  border: 0px;
  cursor: pointer;
`;

export const BookContainer = styled(BaseStyledComponent)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 25%;
  background-color: ${global.White.value};
  &:active {
    background-color: #d9d9d9;

    img {
      width: ${global.Spacing[20].value}px;
    }
    label {
      font-size: ${global.fontSize[10]}px;
    }
  }
`;
export const BookIcon = styled.img`
  margin-top: ${global.Spacing[12].value}px;
  width: 24px;
  transition: width 0.2s;
`;

export const BookLb = styled.label`
  color: ${global.Primary.value};
  margin-top: ${global.Spacing[8].value}px;
  font-size: ${global.fontSize[12].value}px;
  transition: font-size 0.2s;
`;
export const MyPageContainer = styled(BaseStyledComponent)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 25%;
  background-color: ${global.White.value};
  &:active {
    background-color: ${global.Gray[7]};
  }
`;
