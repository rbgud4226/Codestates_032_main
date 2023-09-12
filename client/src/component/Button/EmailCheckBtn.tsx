import React from "react";
import { styled } from "styled-components";
import axios, { AxiosError } from "axios";

interface EmailCheckBtnProps {
  email: string;
  isValidEmail: boolean;
  isDuplicate: boolean;
  setDuplicate: (isDuplicate: boolean) => void;
}
const EmailCheckBtn: React.FC<EmailCheckBtnProps> = ({
  email,
  isValidEmail,
  isDuplicate,
  setDuplicate,
}) => {
  const validEmailhdr = async () => {
    try {
      const res = await axios.post(
        "https://a068-121-162-236-116.ngrok-free.app/check",
        {
          email: email,
        },
      );
      setDuplicate(true);
      //여기 구현은 실제 서버 돌리면서 실험할 필요가 있음.
      console.log(res.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(axios.isAxiosError(error));
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          console.log("중복 있음", axiosError.response.data);
          setDuplicate(false);
        } else {
          console.error("요청 실패함", axiosError.message);
          setDuplicate(false);
        }
      } else {
        console.error("알수 없는 에러가 발생");
        setDuplicate(false);
      }
    }
  };
  return (
    <ECBtnCtn>
      <ECBtn
        onClick={() => validEmailhdr()}
        disabled={isValidEmail ? false : true}
      >
        체크
      </ECBtn>
      {isDuplicate ? (
        <p style={{ color: "green", fontSize: "12px", marginTop: "4px" }}>
          pass
        </p>
      ) : (
        <p style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
          false
        </p>
      )}
    </ECBtnCtn>
  );
};

export default EmailCheckBtn;

export const ECBtnCtn = styled.div``;

export const ECBtn = styled.button`
  width: 54px;
  height: 31px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e9eeff;
  border-radius: 4px;
  border: 1px solid #595959;
  cursor: pointer;
  &:disabled {
    background-color: #f6f8ff;
    color: #a6a6a6;
    border: 1px solid #edf2ff;
  }
`;
