import React, { useState } from "react";
import { styled } from "styled-components";
import show from "../../asset/PwAsset/show.png";
import hide from "../../asset/PwAsset/hide.png";

interface PasswordInputProps {
  password?: string;
  setPassword: (password: string) => void;
  setValidPw?: (isValidPw: boolean) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  password,
  setPassword,
  setValidPw,
}) => {
  const [isHide, setHide] = useState(true);
  const [isPassed, setPassed] = useState(false);

  const passwordHdr = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);

    if (password && setValidPw) {
      if (validInput(password)) {
        setPassed(true);
        setValidPw(true);
      } else {
        setPassed(false);
        setValidPw(false);
      }
    }
  };

  const toggleHdr = () => {
    setHide(!isHide);
  };

  // 대소문자 구분 없이 영문자와 숫자 조합으로 8글자 이상인지 검사
  const validInput = (input: string) => {
    const regex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;
    return regex.test(input);
  };

  return (
    <PwContainer>
      <PwWrapper>
        <PwInput
          type={isHide ? "password" : "text"}
          placeholder="비밀번호"
          onChange={e => passwordHdr(e)}
        ></PwInput>
        <ToggleIcon onClick={() => toggleHdr()}>
          {isHide ? <ShowIcon src={show} /> : <HideIcon src={hide} />}
        </ToggleIcon>
      </PwWrapper>
      {password ? (
        isPassed ? (
          <p style={{ fontSize: "10px", color: "green", marginTop: "4px" }}>
            pass
          </p>
        ) : (
          <p style={{ fontSize: "10px", color: "red", marginTop: "4px" }}>
            유효하지 않은 PW입니다.
          </p>
        )
      ) : (
        <p style={{ fontSize: "10px", color: "#279eff", marginTop: "4px" }}>
          영문자와 숫자조합, 8글자 이상입니다.
        </p>
      )}
    </PwContainer>
  );
};
export default PasswordInput;

export const PwContainer = styled.section`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  width: 240px;
`;
export const PwWrapper = styled.div`
  display: flex;
  height: 31px;
  border: 1px solid #595959;
  width: 240px;
  border-radius: 4px;
  justify-content: space-between;
`;
export const PwInput = styled.input`
  width: 240px;
  height: 29px;
  border: 0px;
  margin-left: 8px;
  &:focus {
    outline: none;
  }
`;

export const ToggleIcon = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 29px;
  background-color: white;
  border: 0px;
  margin-right: 8px;
`;

export const ShowIcon = styled.img`
  height: 24px;
`;

export const HideIcon = styled.img`
  height: 24px;
`;
