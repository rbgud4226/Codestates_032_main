import React from "react";
import { styled } from "styled-components";

interface PhoneNumberInputProps {
  setPhoneNum: (phoneNum: string) => void;
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({ setPhoneNum }) => {
  const PhoneNumHdr = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNum(e.target.value);
  };
  return (
    <PNInput
      type="text"
      placeholder="숫자만 입력하세요"
      onChange={e => PhoneNumHdr(e)}
    ></PNInput>
  );
};

export default PhoneNumberInput;

export const PNInput = styled.input`
  height: 30px;
  width: 160px;
  padding-left: 8px;
  font-size: 12px;
  border: 1px solid #595959;
  border-radius: 4px;
  ::placeholder {
    font-size: 12px;
    color: #5c5858;
  }
  &:focus {
    outline: none;
  }
`;
