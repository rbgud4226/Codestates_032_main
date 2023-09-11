import React from "react";
import { styled } from "styled-components";

interface NickNameInputProps {
  setNickName: (nickName: string) => void;
}

const NickNameInput: React.FC<NickNameInputProps> = ({ setNickName }) => {
  const nickNameHdr = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickName(e.target.value);
  };

  return (
    <NNCtn>
      <InputBox
        type="text"
        placeholder="닉네임"
        onChange={e => nickNameHdr(e)}
      ></InputBox>
      <InputMsg>닉네임을 입력하세요</InputMsg>
    </NNCtn>
  );
};

export default NickNameInput;

export const NNCtn = styled.section`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
`;

export const InputBox = styled.input`
  height: 31px;
  border: 1px solid #595959;
  border-radius: 4px;
  padding-left: 10px;
  &:focus {
    outline: none;
  }
`;

export const InputMsg = styled.label`
  color: #279eff;
  margin-top: 4px;
  font-size: 10px;
`;
