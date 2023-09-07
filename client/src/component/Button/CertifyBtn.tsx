import React from "react";
import { styled } from "styled-components";

interface CertifyBtnProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isDisable: boolean;
}
const CertifyBtn: React.FC<CertifyBtnProps> = ({ onClick, isDisable }) => {
  return (
    <CFBtn onClick={onClick} disabled={isDisable}>
      인증
    </CFBtn>
  );
};

export default CertifyBtn;

export const CFBtn = styled.button`
  width: 54px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e9eeff;
  border-radius: 4px;
  border: 1px inset #595959;
  cursor: pointer;
  &:disabled {
    background-color: #f6f8ff;
    color: #a6a6a6;
    border: 1px inset #edf2ff;
  }
`;
