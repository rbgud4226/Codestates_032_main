import React, { useState } from "react";
import { styled } from "styled-components";

interface EmailInputProps {
  email?: string;
  setEmail: (email: string) => void;
  setValidEmail?: (isValidEmail: boolean) => void;
  setDuplicate?: (isDuplicate: boolean) => void;
}

const EmailInput: React.FC<EmailInputProps> = ({
  email,
  setEmail,
  setValidEmail,
  setDuplicate,
}) => {
  const [isValid, setValid] = useState(false);

  const validateEmail = (email: any) => {
    // 이메일 유효성을 검사하는 정규 표현식
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const emailHdr = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (setValidEmail && setDuplicate) {
      setValidEmail(false);
      setDuplicate(false);
    }
    if (validateEmail(email)) {
      setValid(true);
      if (setValidEmail) {
        setValidEmail(true);
      }
    } else {
      setValid(false);
      if (setValidEmail && setDuplicate) {
        setValidEmail(false);
        setDuplicate(false);
      }
    }
  };

  return (
    <EIContainer>
      <InputBox
        type="email"
        placeholder="email"
        onChange={e => emailHdr(e)}
      ></InputBox>
      <InputMsg>email을 입력하세요</InputMsg>
    </EIContainer>
  );
};

export default EmailInput;

export const EIContainer = styled.section`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  width: 240px;
`;

export const InputBox = styled.input`
  height: 31px;
  border: 1px inset #595959;
  border-radius: 4px;
  padding-left: 10px;
  &:focus {
    outline: none;
  }
`;

export const InputMsg = styled.label`
  margin-top: 4px;
  color: #279eff;
  font-size: 10px;
  margin-bottom: 6px;
`;
