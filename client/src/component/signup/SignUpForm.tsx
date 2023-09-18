import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import * as yup from "yup";
import LargeBtn from "../Button/LargeCheckBtn";
import axios from "axios";
import { iconImg } from "../../Data/IconImg";
import global from "../../Data/global";

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
  email: yup
    .string()
    .email("email형식으로 입력하세요")
    .required("이메일은 필수입니다"),
  selectAll: yup.bool(),
  check1: yup.boolean().oneOf([true], "필수 약관에 동의해야 합니다."),
  check2: yup.boolean().oneOf([true], "필수 약관에 동의해야 합니다."),
  check3: yup.boolean(),
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
    .required("비밀번호가 일치하지 않습니다."),
});

const SignUpForm = ({ phoneNum }: T) => {
  const [emailErr, setEmailErr] = useState("");
  const [phoneErr, setPhoneErr] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({ resolver: yupResolver(schema), mode: "onChange" });
  // 랜덤으로 이미지 추출하는 함수
  const imageHdr = () => {
    const iconId = Math.floor(Math.random() * (18 - 1)) + 1;
    const randomImg = iconImg[iconId].img;
    return randomImg;
  };
  //회원가입
  const signupHdr = async (data: FormData) => {
    if (phoneNum) {
      try {
        imageHdr();
        const resData = await axios.post(`${api}/check`, { email: data.email });
        // const resData = await axios.post(`${api}/check/nickname`, {
        //   nickName: data.nickName,
        // });

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
          } catch (e) {}
        }
      } catch (e) {
        setEmailErr("중복된 email 입니다.");
      }
    } else {
      setPhoneErr("전화번호를 인증해주세요");
    }
  };

  const handleCheckAll = () => {
    if (getValues("selectAll")) {
      setValue("check1", false);
      setValue("check2", false);
      setValue("check3", false);
      console.log(getValues("check1"), getValues("check2"));
    } else {
      setValue("check1", true);
      setValue("check2", true);
      setValue("check3", true);

      console.log(getValues("check1"), getValues("check2"));
    }
  };
  return (
    <SUForm onSubmit={handleSubmit(signupHdr)}>
      <InputWrapper>
        <TextInput placeholder="이메일을 입력하세요" {...register("email")} />
        <ErrMsg>{errors.email?.message}</ErrMsg>
        <ErrMsg>{emailErr}</ErrMsg>
      </InputWrapper>
      <InputWrapper>
        <TextInput
          placeholder="닉네임을 입력하세요"
          {...register("nickName")}
        />
        <ErrMsg>{errors.nickName?.message}</ErrMsg>
      </InputWrapper>
      <InputWrapper>
        <TextInput
          placeholder="패스워드 입력하세요"
          type="password"
          {...register("password")}
        />
        <ErrMsg>{errors.password?.message}</ErrMsg>
      </InputWrapper>
      <InputWrapper>
        <TextInput
          placeholder="패스워드를 재입력하세요"
          type="password"
          {...register("passwordCf")}
        />
        <ErrMsg>{errors.passwordCf?.message}</ErrMsg>
      </InputWrapper>
      <MASection>
        <AllAgree onClick={handleCheckAll}>
          <input
            onChange={handleCheckAll}
            type="checkbox"
            {...register("selectAll")}
          ></input>
          모두 동의 합니다.
        </AllAgree>
        <ServiceAgree>
          <input type="checkbox" {...register("check1")}></input>
          이용약관에 동의합니다.(필수)
        </ServiceAgree>
        <ServiceAgree>
          <input type="checkbox" {...register("check2")}></input>
          개인정보처리방침에 동의합니다.(필수)
        </ServiceAgree>
        <ServiceAgree>
          <input type="checkbox" {...register("check3")}></input>
          유용한 소식 받기.(선택)
        </ServiceAgree>
        <ErrMsg>{errors.check1?.message || errors.check2?.message}</ErrMsg>
      </MASection>
      <div style={{ marginTop: "12px", width: "100%" }}>
        <LargeBtn
          name={"회원가입"}
          disabled={!getValues("check1") && !getValues("check2")}
        />
        {!phoneNum ? <ErrMsg>{phoneErr}</ErrMsg> : ""}
      </div>
    </SUForm>
  );
};

export default SignUpForm;

const SUForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 240px;
  margin-top: 20px;
`;

const InputWrapper = styled.div`
  width: 100%;
  margin-bottom: 8px;
`;
const ErrMsg = styled.div`
  justify-content: flex-start;
  margin-top: 4px;
  color: ${global.ErrorMsgRed.value};
  font-size: 10px;
  margin-bottom: 6px;
`;
const TextInput = styled.input`
  height: 31px;
  width: 100%;
  border: 1px inset ${global.Gray[1].value};
  border-radius: 4px;
  padding-left: 10px;
  &:focus {
    outline: none;
  }
`;

const MASection = styled.section`
  display: flex;
  flex-direction: column;
  width: 239px;
`;
const AllAgree = styled.label`
  display: flex;
  cursor: pointer;
  gap: 4px;
  align-items: center;
  border: 1px solid #bdbdbd;
  background-color: #e9eeff;
  border-radius: 4px;
  height: 30px;
  font-size: 12px;
  color: #2a2a2a;
  padding-left: 18px;
  margin-top: 14px;
`;

const ServiceAgree = styled.label`
  display: flex;
  gap: 4px;
  align-items: center;
  background-color: #ffffff;
  border-radius: 4px;
  font-size: 12px;
  color: #2a2a2a;
  padding-left: 18px;
  cursor: pointer;
  margin-top: 12px;
`;
