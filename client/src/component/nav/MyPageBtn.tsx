import React, { useState } from "react";
import { styled } from "styled-components";
import myPageIcon from "../../asset/NavAsset/mypage-icon.png";

const MyPageBtn = () => {
  const [active, setActive] = useState(false);

  return (
    <MyPageContainer
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      onMouseLeave={() => setActive(false)}
    >
      <MyPageIcon $active={active} src={myPageIcon} />
      <MyPageLb $active={active}>검색</MyPageLb>
    </MyPageContainer>
  );
};

export default MyPageBtn;

const BaseStyledComponent = styled.button`
  border: 0px;
  cursor: pointer;
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
interface MyPageIconProps {
  $active: boolean;
}
export const MyPageIcon = styled.img<MyPageIconProps>`
  margin-top: 12px;
  width: ${props => (props.$active ? "20px" : "24px")};
  transition: width 0.2s;
`;
interface MyPageLbProps {
  $active: boolean;
}

export const MyPageLb = styled.label<MyPageLbProps>`
  color: #279eff;
  margin-top: 7px;
  font-size: ${props => (props.$active ? "10px" : "12px")};
  transition: font-size 0.2s;
`;
