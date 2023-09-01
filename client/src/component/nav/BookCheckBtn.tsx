import React, { useState } from "react";
import { styled } from "styled-components";
import bookCheckIcon from "../../asset/NavAsset/book-check-icon.png";

const BookCheckBtn = () => {
  const [active, setActive] = useState(false);

  return (
    <BookCheckContainer
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      onMouseLeave={() => setActive(false)}
    >
      <BookCheckIcon $active={active} src={bookCheckIcon} />
      <BookCheckLb $active={active}>예약확인</BookCheckLb>
    </BookCheckContainer>
  );
};

export default BookCheckBtn;

const BaseStyledComponent = styled.button`
  border: 0px;
  cursor: pointer;
`;

export const BookCheckContainer = styled(BaseStyledComponent)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 25%;
  background-color: white;
  &:active {
    background-color: #d9d9d9;
  }
`;
interface BookCheckIconProps {
  $active: boolean;
}
export const BookCheckIcon = styled.img<BookCheckIconProps>`
  margin-top: 12px;
  width: ${props => (props.$active ? "20px" : "24px")};
  transition: width 0.2s;
`;
interface BookCheckLbProps {
  $active: boolean;
}

export const BookCheckLb = styled.label<BookCheckLbProps>`
  color: #279eff;
  margin-top: 7px;
  font-size: ${props => (props.$active ? "10px" : "12px")};
  transition: font-size 0.2s;
`;
