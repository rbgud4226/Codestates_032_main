import React, { useState } from "react";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import LargeBtn from "../Button/LargeCheckBtn";
import { apiServer } from "../../lib/api";

type FormData = {
  email: string;
  password: string;
};

const schema = yup.object().shape({
  email: yup
    .string()
    .email("email형식으로 입력하세요.")
    .required("이메일은 필수입니다."),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/,
      "영문자 숫자조합 8글자 이상입니다.",
    )
    .required("이메일은 필수입니다."),
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
      const res: any = await apiServer.post(`/members/login`, data);
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
      setErrorMsg("로그인 정보를 확인하세요");
    }
  };
  console.log(errors);

  return (
    <LoginContainer>
      <LForm onSubmit={handleSubmit(loginHdr)}>
        <InputWrapper>
          <TextInput placeholder="email" {...register("email")} />
          {errors?.email?.message && <ErrMsg>{errors.email.message}</ErrMsg>}
        </InputWrapper>
        <InputWrapper>
          <TextInput
            placeholder="password"
            type="password"
            {...register("password")}
          />
          {errors?.password?.message && (
            <ErrMsg>{errors.password.message}</ErrMsg>
          )}
        </InputWrapper>
        <ErrMsg>{errorMsg}</ErrMsg>
        <LargeBtn margin={"12px 0px 0px 0px"} name={"로그인"} />
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
  width: 100%;
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
`;

export const SignUpLink = styled(Link)`
  margin-top: 6px;
  font-size: 12px;
  color: #636262;
`;
