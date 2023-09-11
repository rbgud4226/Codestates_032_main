import React from "react";
import { styled } from "styled-components";
import BookCheckBtn from "./BookCheckBtn";
import BookBtn from "./BookBtn";
import SearchBtn from "./SearchBtn";
import MyPageBtn from "./MyPageBtn";

const Nav = () => {
  return (
    <NavContainer>
      <BookCheckBtn />
      <BookBtn />
      <SearchBtn />
      <MyPageBtn />
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
  min-width: 320px;
  max-width: 500px;
  box-shadow: 0px 10px 34px #272c5614;
  background-color: white;
`;
