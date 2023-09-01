import React, { useState } from "react";
import { styled } from "styled-components";
import bookIcon from "../../asset/NavAsset/book-icon.png";

const BookBtn = () => {
  const [active, setActive] = useState(false);
  return (
    <BookContainer
      active={active}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      onMouseLeave={() => setActive(false)}
    >
      <BookIcon active={active} src={bookIcon}></BookIcon>
      <BookLb active={active}>예약하기</BookLb>
    </BookContainer>
  );
};

export default BookBtn;

const BaseStyledComponent = styled.button`
  border: 0px;
  cursor: pointer;
`;
interface BookContainerProps {
  active: boolean;
}

export const BookContainer = styled(BaseStyledComponent)<BookContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 25%;
  background-color: white;
  &:active {
    background-color: #d9d9d9;
  }
`;
interface BookIconProps {
  active: boolean;
}
export const BookIcon = styled.img<BookIconProps>`
  margin-top: 12px;
  width: ${props => (props.active ? "20px" : "24px")};
  transition: width 0.2s;
`;
interface BookLbProps {
  active: boolean;
}

export const BookLb = styled.label<BookLbProps>`
  color: #279eff;
  margin-top: 7px;
  font-size: ${props => (props.active ? "10px" : "12px")};
  transition: font-size 0.2s;
`;
