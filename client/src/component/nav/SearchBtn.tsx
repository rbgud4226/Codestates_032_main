import React, { useState } from "react";
import { styled } from "styled-components";
import searchIcon from "../../asset/NavAsset/search-icon.png";

const SearchBtn = () => {
  const [active, setActive] = useState(false);

  return (
    <SearchContainter
      active={active}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      onMouseLeave={() => setActive(false)}
    >
      <SearchIcon active={active} src={searchIcon} />
      <SerachLb active={active}>검색</SerachLb>
    </SearchContainter>
  );
};

export default SearchBtn;

const BaseStyledComponent = styled.button`
  border: 0px;
  cursor: pointer;
`;
interface SearchBtnProps {
  active: boolean;
}

export const SearchContainter = styled(BaseStyledComponent)<SearchBtnProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 25%;
  background-color: white;
  &:active {
    background-color: #d9d9d9;
  }
`;
interface SearchIconProps {
  active: boolean;
}
export const SearchIcon = styled.img<SearchIconProps>`
  margin-top: 12px;
  width: ${props => (props.active ? "20px" : "24px")};
  transition: width 0.2s;
`;
interface SerachLbProps {
  active: boolean;
}

export const SerachLb = styled.label<SerachLbProps>`
  color: #279eff;
  margin-top: 7px;
  font-size: ${props => (props.active ? "10px" : "12px")};
  transition: font-size 0.2s;
`;
