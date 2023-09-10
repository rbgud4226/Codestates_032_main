import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import * as yup from "yup";
import LargeBtn from "../../Button/LargeBtn";
import axios, { AxiosError } from "axios";
import { iconImg } from "../../../Data/IconImg";

const api = process.env.REACT_APP_DB_HOST;

type FormData = {
  email: string;
  nickName: string;
  password: string;
  passwordCf: string;
  phoneNumber: string;
};

const schema = yup.object().shape({
  email: yup.string().email().required("email형식으로 입력하세요"),
  nickName: yup.string(),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/,
      "영문자 숫자조합 8글자 이상입니다.",
    )
    .required("Pw is required"),
  passwordCf: yup
    .string()
    .matches(
      /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/,
      "영문자 숫자조합 8글자 이상입니다.",
    )
    .required("Pw is required"),
});

const SignUpForm = () => {
  const [emailErr, setEmailErr] = useState("");
  const [pwErrMsg, setPwErrMsg] = useState("");
  const [randomImg, setRandomImg] = useState("");
  const [err, setErr] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const imageHdr = () => {
    const iconId = Math.floor(Math.random() * (18 - 1)) + 1;
    const randomImg = iconImg[iconId].img;
    console.log(iconId);
    console.log(typeof randomImg);
    setRandomImg(randomImg);
  };

  const signupHdr = async (data: FormData) => {
    if (data.password === data.passwordCf) {
      try {
        const resData = await axios.post(`${api}/check`, { email: data.email });
        imageHdr();
        if (resData.data) {
          try {
            const sendData = {
              email: data.email,
              nickName: data.nickName,
              password: data.password,
              profileImage: randomImg,
              phone: data.phoneNumber,
            };
            const resData2 = await axios.post(`${api}/members`, sendData);
            if (resData2) {
              window.location.replace("/signupDone");
            }
          } catch (e: AxiosError | unknown) {
            setErr("알수 없는 에러가 발생");
          }
        }
      } catch (e: AxiosError | unknown) {
        setEmailErr("중복된 email 입니다.");
      }
    } else {
      setPwErrMsg("비밀번호를 확인하세요");
    }
  };

  return (
    <SUForm onSubmit={handleSubmit(signupHdr)}>
      <InputWrapper>
        <TextInput placeholder="email" {...register("email")} />
        {emailErr ? (
          <ErrMsg> {emailErr}</ErrMsg>
        ) : (
          <Span>email을 입력하세요.</Span>
        )}
      </InputWrapper>
      <InputWrapper>
        <TextInput placeholder="nickname" {...register("nickName")} />
        <Span>닉네임을 입력하세요.</Span>
      </InputWrapper>
      <InputWrapper>
        <TextInput
          placeholder="password"
          type="password"
          {...register("password")}
        />
        <Span>패스워드를 입력하세요.</Span>
      </InputWrapper>
      <InputWrapper>
        <TextInput
          placeholder="password확인"
          type="password"
          {...register("passwordCf")}
        />
        <Span>패스워드 재입력하세요.</Span>
      </InputWrapper>
      <div style={{ marginTop: "12px", width: "100%" }}>
        <LargeBtn name={"회원가입"} />
      </div>
    </SUForm>
  );
};

export default SignUpForm;

export const SUForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
  width: 240px;
`;

export const InputWrapper = styled.div`
  margin-bottom: 8px;
`;
export const ErrMsg = styled.div`
  justify-content: flex-start;
  margin-top: 4px;
  color: #ff2727;
  font-size: 10px;
  margin-bottom: 6px;
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
  margin-top: 4px;
  color: #279eff;
  font-size: 10px;
  margin-bottom: 6px;
`;
