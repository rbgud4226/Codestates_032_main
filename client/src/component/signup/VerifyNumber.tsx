import React, { useState } from "react";
import styled from "styled-components";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import PhoneBtn from "../Button/PhoneBtn";
import global from "../../Data/global";

const api = process.env.REACT_APP_DB_HOST;

interface T {
  phoneNum: string;
}
type DataForm = {
  verifyNum: string;
};

const schema = yup.object().shape({
  verifyNum: yup.string().trim().required("전화번호 입력해주세요"),
});
//전화번호 전송 함수.

const VerifyNumber = ({ phoneNum }: T) => {
  const { register, handleSubmit } = useForm({ resolver: yupResolver(schema) });
  const [resMsg, setResMsg] = useState("");

  //인증번호 전송 함수
  const certifyHdr = async (data: DataForm) => {
    try {
      const res = await axios.post(
        `${api}/registration?authCode=${data.verifyNum}&phone=${phoneNum}`,
      );
      setResMsg(res.data);
    } catch (err) {
      console.log("인증번호 잘못보냄");
    }
  };
  return (
    <MVForm onSubmit={handleSubmit(certifyHdr)}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <TextInput
          placeholder="인증번호를 입력하세요"
          {...register("verifyNum")}
        />
        <span style={{ fontSize: "10px" }}>{resMsg}</span>
      </div>

      <PhoneBtn name={"전송"} />
    </MVForm>
  );
};

export default VerifyNumber;

const MVForm = styled.form`
  display: flex;
  flex-direction: row;
  width: 240px;
  margin-bottom: 8px;
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
