import React, { useState } from "react";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import LargeBtn from "../Button/LargeCheckBtn";

const api = process.env.REACT_APP_DB_HOST;

type FormData = {
  email: string;
  password: string;
};

// type T = {
//   nickName: string;
//   profileImage: string;
//   accessToken: string;
//   refreshToken: string;
// };
const schema = yup.object().shape({
  email: yup
    .string()
    .email("email형식으로 입력하세요")
    .required("Email is required"),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/,
      "영문자 숫자조합 8글자 이상입니다.",
    )
    .required("Pw is required"),
});

const LoginForm = () => {
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const loginHdr = async (data: FormData) => {
    try {
      const res: any = await axios.post(`${api}/members/login`, data);
      console.log(res.data);
      const userData = {
        nickName: res.data.nickName,
        profileImage: res.data.profileImage,
        accessToken: res.headers.authorization,
        refreshToken: res.headers.refresh,
      };
      localStorage.setItem("nickName", userData.nickName);
      localStorage.setItem("profileImage", userData.profileImage);
      localStorage.setItem("refreshToken", userData.refreshToken);
      localStorage.setItem("accessToken", userData.accessToken);
      window.location.href = "/";
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.response?.data.error.message) {
          setErrorMsg("로그인 정보를 확인하세요");
        }
      }
    }
  };

  return (
    <LoginContainer>
      <LForm onSubmit={handleSubmit(loginHdr)}>
        <InputWrapper>
          <TextInput placeholder="email" {...register("email")} />
          {!errors.email ? (
            <Span>email을 입력하세요</Span>
          ) : (
            <ErrMsg>{errors?.email?.message}</ErrMsg>
          )}
        </InputWrapper>
        <InputWrapper>
          <TextInput
            placeholder="password"
            type="password"
            {...register("password")}
          />
          {!errors.password ? (
            <Span>비밀번호를 입력하세요.</Span>
          ) : (
            <ErrMsg>{errors?.password?.message}</ErrMsg>
          )}
        </InputWrapper>
        <div style={{ marginTop: "12px", width: "100%" }}>
          <LargeBtn name={"로그인"} />
        </div>
        <ErrMsg>{errorMsg}</ErrMsg>
        <SignUpLink to={"/memberAgree"}>회원가입</SignUpLink>
      </LForm>
    </LoginContainer>
  );
};

export default LoginForm;

export const LoginContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  width: 240px;
`;

export const LForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 240px;
`;
export const InputWrapper = styled.div`
  width: 100%;
  margin-bottom: 8px;
`;

export const TextInput = styled.input`
  height: 31px;
  width: 100%;
  border: 1px inset #595959;
  border-radius: 4px;
  padding-left: 10px;
  &:focus {
    outline: none;
  }
`;

export const Span = styled.span`
  justify-content: flex-start;
  margin-top: 5px;
  color: #279eff;
  font-size: 10px;
  margin-bottom: 6px;
`;

export const ErrMsg = styled.div`
  justify-content: flex-start;
  margin-top: 4px;
  color: #ff2727;
  font-size: 10px;
  margin-bottom: 6px;
`;

export const SignUpLink = styled(Link)`
  margin-top: 6px;
  font-size: 12px;
  color: #636262;
`;
