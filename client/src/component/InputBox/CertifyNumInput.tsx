import React from "react";
import { styled } from "styled-components";

interface CertifyNumInputProps {
  setCertifyNum: (certifyNum: string) => void;
}

const CertifyNumInput: React.FC<CertifyNumInputProps> = ({ setCertifyNum }) => {
  const certifyNumHdr = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCertifyNum(e.target.value);
  };
  return (
    <CFNumInput
      type="text"
      placeholder="인증번호를 입력하세요"
      onChange={e => certifyNumHdr(e)}
    ></CFNumInput>
  );
};

export default CertifyNumInput;

export const CFNumInput = styled.input`
  height: 30px;
  width: 160px;
  padding-left: 8px;
  font-size: 12px;
  border: 1px inset #595959;
  border-radius: 4px;
  ::placeholder {
    font-size: 12px;
    color: #5c5858;
  }
`;
