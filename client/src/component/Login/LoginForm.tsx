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
    navigate("/");

    // try {
    //   const res = await axios.post("http://localhost:8080/members/login", {
    //     email: email,
    //     password: password,
    //   });
    //   const token = res;
    //   console.log(token);
    // } catch (error) {
    //   if (axios.isAxiosError(error)) {
    //     const axiosError = error as AxiosError;
    //     if (axiosError.response) {
    //       console.log("로그인 정보 확인바람", axiosError.response.data);
    //     } else {
    //       console.error("요청 실패함", axiosError.message);
    //     }
    //   } else {
    //     console.error("알수 없는 에러가 발생");
    //   }
    // }
  };
  return (
    <LoginContainer>
      <EmailInput setEmail={setEmail} />
      <PasswordInput setPassword={setPassword} />
      <LoginBtn onClick={e => loginHdr(e)} />
      {errorMsg ? (
        <span style={{ fontSize: "12px", marginTop: "4px" }}>
          로그인정보를 확인하세요{" "}
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
