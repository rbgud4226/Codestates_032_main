import React, { useState } from "react";
import { styled } from "styled-components";
import show from "../../asset/PwAsset/show.png";
import hide from "../../asset/PwAsset/hide.png";

interface PasswordCfInputProps {
  password: string;
  isSamePw: boolean;
  setIsSamePw: (isSamePW: boolean) => void;
  passwordCf: string;
  setPasswordCf: (passwordCf: string) => void;
}

const PasswordCfInput: React.FC<PasswordCfInputProps> = ({
  password,
  isSamePw,
  passwordCf,
  setIsSamePw,
  setPasswordCf,
}) => {
  const [isHide, setHide] = useState(true);
  const pwCfHdr = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPw = e.target.value;
    e.preventDefault();
    setPasswordCf(e.target.value);
    if (password === newPw) {
      setIsSamePw(true);
    } else {
      setIsSamePw(false);
    }
  };

  const toggleHdr = () => {
    setHide(!isHide);
  };

  return (
    <PwCfCtn>
      <PwCfWrapper>
        <InputBox
          type={isHide ? "password" : "text"}
          placeholder="비밀번호 재입력"
          onChange={e => pwCfHdr(e)}
        ></InputBox>
        <ToggleIcon onClick={() => toggleHdr()}>
          {isHide ? <ShowIcon src={show} /> : <HideIcon src={hide} />}
        </ToggleIcon>
      </PwCfWrapper>
      {passwordCf ? (
        isSamePw ? (
          <p style={{ color: "green", fontSize: "12px" }}>pass</p>
        ) : (
          <p style={{ color: "red", fontSize: "12px" }}>fail</p>
        )
      ) : (
        <InputMsg>비밀번호를 입력하세요</InputMsg>
      )}
    </PwCfCtn>
  );
};

export default PasswordCfInput;

export const PwCfCtn = styled.section`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  width: 240px;
`;

export const InputCtn = styled.div``;

export const PwCfWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: 31px;
  border: 1px solid #595959;
  width: 240px;
  border-radius: 4px;
`;

export const InputBox = styled.input`
  height: 29px;
  margin-left: 10px;
  border: 0px;
  &:focus {
    outline: none;
  }
`;

export const InputMsg = styled.label`
  color: #279eff;
  margin-top: 4px;
  font-size: 10px;
`;

export const ToggleIcon = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 29px;
  margin-right: 8px;
  background-color: white;
  border: 0px;
`;

export const ShowIcon = styled.img`
  height: 24px;
`;

export const HideIcon = styled.img`
  height: 24px;
`;
