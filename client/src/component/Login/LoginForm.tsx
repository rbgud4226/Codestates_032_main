import React, { useState } from "react";
import { styled } from "styled-components";
import EmailInput from "../InputBox/EmailInput";
import PasswordInput from "../InputBox/PasswordInput";
import LoginBtn from "../Button/LoginBtn";
import TokenProvider from "../../util/tokenProvider";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  //로그인버튼 클릭시 수행 , 현재 문제가 있음 고칠 필요가 있음. 리스트페이지 등록시 navigate에 엔드포인트 입력.
  const loginHdr = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    TokenProvider({ email, password }, setErrorMsg);
    if (!errorMsg) {
      setErrorMsg("");
    } else {
      navigate("/");
    }
  };
  return (
    <LoginContainer>
      <EmailInput setEmail={setEmail} />
      <PasswordInput setPassword={setPassword} />
      <LoginBtn onClick={e => loginHdr(e)} />
      {errorMsg ? (
        <span style={{ fontSize: "12px", marginTop: "4px", color: "red" }}>
          {errorMsg}
        </span>
      ) : (
        ""
      )}
      <SignUpLink to={"/memberAgree"}>회원가입</SignUpLink>
    </LoginContainer>
  );
};

export default LoginForm;

export const LoginContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
  width: 240px;
`;

export const SignUpLink = styled(Link)`
  margin-top: 6px;
  font-size: 12px;
  color: #636262;
`;
