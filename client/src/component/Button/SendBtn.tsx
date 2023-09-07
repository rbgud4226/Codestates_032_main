import React from "react";
import { styled } from "styled-components";

interface SendBtnProps {
  isDisable: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
const SendBtn: React.FC<SendBtnProps> = ({ isDisable, onClick }) => {
  return (
    <SBtn onClick={onClick} disabled={isDisable}>
      전송
    </SBtn>
  );
};

export default SendBtn;

export const SBtn = styled.button`
  width: 54px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e9eeff;
  border-radius: 4px;
  border: 1px solid #595959;
  cursor: pointer;
  &:disabled {
    background-color: #f6f8ff;
    color: #a6a6a6;
    border: 1px solid #edf2ff;
  }
`;
