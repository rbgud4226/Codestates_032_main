import React from "react";
import { styled } from "styled-components";
import bookIcon from "../../asset/NavAsset/book-icon.png";
import bookCheckIcon from "../../asset/NavAsset/book-check-icon.png";
import searchIcon from "../../asset/NavAsset/search-icon.png";
import myPageIcon from "../../asset/NavAsset/mypage-icon.png";
import { Link } from "react-router-dom";
const BtnArr = [
  {
    text: "예약하기",
    src: bookIcon,
    link: "/reservation",
  },
  {
    text: "예약확인",
    src: bookCheckIcon,
    link: "/check",
  },
  {
    text: "검색",
    src: searchIcon,
    link: "/search",
  },
  {
    text: "마이페이지",
    src: myPageIcon,
    link: "/mypage",
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
  background-color: white;
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
  background-color: white;
  &:active {
    background-color: #d9d9d9;

    img {
      width: 20px;
    }
    label {
      font-size: 10px;
    }
  }
`;
export const BookIcon = styled.img`
  margin-top: 12px;
  width: 24px;
  transition: width 0.2s;
`;

export const BookLb = styled.label`
  color: #279eff;
  margin-top: 7px;
  font-size: 12px;
  transition: font-size 0.2s;
`;
export const MyPageContainer = styled(BaseStyledComponent)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 25%;
  background-color: white;
  &:active {
    background-color: #d9d9d9;
  }
`;
