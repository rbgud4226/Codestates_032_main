import React from "react";
import { styled } from "styled-components";

interface T {
  name: string;
  onSubmit?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
const PhoneBtn = ({ name, onSubmit }: T) => {
  return <Btn onSubmit={onSubmit}>{name}</Btn>;
};

export default PhoneBtn;

const Btn = styled.button`
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
