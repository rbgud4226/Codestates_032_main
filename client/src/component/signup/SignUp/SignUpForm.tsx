import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import * as yup from "yup";
import LargeBtn from "../../Button/LargeCheckBtn";
import axios from "axios";
import { iconImg } from "../../../Data/IconImg";

interface T {
  phoneNum: string;
}

const api = process.env.REACT_APP_DB_HOST;

type FormData = {
  email: string;
  nickName: string;
  password: string;
  passwordCf: string;
  phone: string;
};

const schema = yup.object().shape({
  email: yup.string().email().required("email형식으로 입력하세요"),
  nickName: yup.string().trim().required("닉네임을 입력해주세요"),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/,
      "영문자 숫자조합 8글자 이상입니다.",
    )
    .required("Pw is required"),
  passwordCf: yup
    .string()
    .test("passwords-match", "비밀번호가 일치해야 합니다", function (value) {
      return this.parent.password === value;
    })
    .required("Pw is required"),
  // phone: yup.string().trim().required("전화번호인증 해야합니다."),
});

const SignUpForm = ({ phoneNum }: T) => {
  const [emailErr, setEmailErr] = useState("");
  const [err, setErr] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  // 랜덤으로 이미지 추출하는 함수
  const imageHdr = () => {
    const iconId = Math.floor(Math.random() * (18 - 1)) + 1;
    const randomImg = iconImg[iconId].img;
    return randomImg;
  };
  //회원가입
  const signupHdr = async (data: FormData) => {
    try {
      imageHdr();
      const resData = await axios.post(`${api}/check`, { email: data.email });

      if (resData.data) {
        try {
          const sendData = {
            email: data.email,
            nickName: data.nickName,
            password: data.password,
            profileImage: imageHdr(),
            phone: phoneNum,
          };
          console.log(sendData);
          const resData2 = await axios.post(`${api}/members`, sendData);
          if (resData2) {
            window.location.replace("/signupDone");
          }
        } catch (e) {
          setErr("알수 없는 에러가 발생");
        }
      }
    } catch (e) {
      setEmailErr("중복된 email 입니다.");
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
        {!errors.nickName ? (
          <Span>닉네임을 입력하세요.</Span>
        ) : (
          <ErrMsg>{errors.nickName.message}</ErrMsg>
        )}
      </InputWrapper>
      <InputWrapper>
        <TextInput
          placeholder="password"
          type="password"
          {...register("password")}
        />
        {!errors.password ? (
          <Span>패스워드를 입력하세요.</Span>
        ) : (
          <ErrMsg>{errors.password.message}</ErrMsg>
        )}
      </InputWrapper>
      <InputWrapper>
        <TextInput
          placeholder="password확인"
          type="password"
          {...register("passwordCf")}
        />
        {!errors.passwordCf ? (
          <Span>패스워드 재입력하세요.</Span>
        ) : (
          <ErrMsg>{errors.passwordCf.message}</ErrMsg>
        )}
      </InputWrapper>
      <div style={{ marginTop: "12px", width: "100%" }}>
        <LargeBtn name={"회원가입"} />
        {/* {!errors.phone ? (
          err ? (
            <ErrMsg>{err}</ErrMsg>
          ) : (
            ""
          )
        ) : (
          <ErrMsg>{errors.phone.message}</ErrMsg>
        )} */}
      </div>
    </SUForm>
  );
};

export default SignUpForm;

export const SUForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 240px;
  margin-top: 20px;
`;

export const InputWrapper = styled.div`
  width: 100%;
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

export const PhoneForm = styled.form`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-bottom: 8px;
`;
