import React from "react";
import { styled } from "styled-components";

interface ConsfirmBtnProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isDisable: boolean;
}

const ConfirmBtn: React.FC<ConsfirmBtnProps> = ({ onClick, isDisable }) => {
  return (
    <CFBtn onClick={onClick} disabled={isDisable}>
      확인
    </CFBtn>
  );
};

export default ConfirmBtn;

export const CFBtn = styled.button`
  width: 240px;
  height: 30px;
  background-color: #279eff;
  align-items: center;
  font-size: 16px;
  justify-content: center;
  color: white;
  border: 0px;
  border-radius: 4px;
  margin-top: 12px;
  cursor: pointer;
  &:active {
    background-color: #1d8ce7;
  }
  &:disabled {
    background-color: #9ac5f4;
  }
`;
