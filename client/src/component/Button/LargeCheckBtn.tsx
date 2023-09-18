import React from "react";
import styled from "styled-components";
interface T {
  name: string;
  margin?: string;
  disabled?: boolean;
}
const LargeBtn = ({ name, margin, disabled }: T) => {
  return (
    <Btn disabled={disabled} style={{ margin: margin }}>
      {name}
    </Btn>
  );
};

export default LargeBtn;

const Btn = styled.button`
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
