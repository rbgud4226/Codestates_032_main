import React from "react";
import styled from "styled-components";
interface T {
  name: string;
}
const LargeBtn = ({ name }: T) => {
  return <Btn>{name}</Btn>;
};

export default LargeBtn;

export const Btn = styled.button`
  width: 100%;
  height: 30px;
  background-color: #279eff;
  align-items: center;
  font-size: 16px;
  justify-content: center;
  color: white;
  border: 0px;
  border-radius: 4px;
  cursor: pointer;
  &:active {
    background-color: #1d8ce7;
  }
  &:disabled {
    background-color: #9ac5f4;
  }
`;
