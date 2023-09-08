import React, { useState } from "react";
import { styled } from "styled-components";
import EmailInput from "../../InputBox/EmailInput";
import EmailCheckBtn from "../../Button/EmailCheckBtn";
import NickNameInput from "../../InputBox/NickNameInput";
import PasswordInput from "../../InputBox/PasswordInput";
import PasswordCfInput from "../../InputBox/PasswordCfInput";
import ConfirmBtn from "../../Button/ConfirmBtn";
import MobileCertify from "./MobileCertify";
import axios, { AxiosError } from "axios";
import { iconImg } from "../../../Data/IconImg";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(""); //email인풋에 입력
  const [isValidEmail, setValidEmail] = useState(false); //email형식에 유효한지 확인
  const [isDuplicate, setDuplicate] = useState(false); //이메일 중복체크 확인
  const [nickName, setNickName] = useState(""); //닉넴인풋에 입력
  const [password, setPassword] = useState(""); //pw입력
  const [isValidPw, setValidPw] = useState(false); //유효성검사 통과한 pw확인.
  const [passwordCf, setPasswordCf] = useState(""); //Pw재입력에 입력
  const [isSamePw, setIsSamePw] = useState(false); //pw재입력과 동일한지확인.
  const [phoneNum, setPhoneNum] = useState(""); //전번인증에 입력
  const [certifyNum, setCertifyNum] = useState(""); //인증번호 입력
  const [isCertify, setCertify] = useState(false); //전송버튼 누른후 인증성공시 인증을true로
  const [image, setImage] = useState(""); //image세팅

  //http://localhost:8080

  //랜덤으로 1~18번 아이콘중 하나 뽑음
  const imageHdr = () => {
    const iconId = Math.floor(Math.random() * (18 - 1)) + 1;
    const randomImg = iconImg[iconId].img;
    console.log(iconId);
    console.log(typeof randomImg);
    setImage(randomImg);
  };

  //인증버튼클릭시 수행 API주소 바꿀것 지금 꺼둔상태라 아무거나 입력하면 맨밑확인버튼 활성화됩니다.
  const certifyHdr = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    imageHdr();
    console.log(phoneNum);
    // try {
    //   const res = await axios.post(
    //     " https://7fdc-218-155-160-190.ngrok-free.app/sendSms",
    //     {
    //       phone: phoneNum,
    //     },
    //   );
    //   console.log(res.data);
    // } catch (err) {
    //   console.log("인증 실패");
    // }
  };
  //전송버튼 클릭시 수행 api주소 바꿀것. 위에 활성화 시키면 이후 밑에 ConfirmBtn컴포넌트의 주석처리한거 해제하면됨.
  const sendHdr = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        ` https://7fdc-218-155-160-190.ngrok-free.app/registration?authCode=${certifyNum}&phone=${phoneNum}`,
      );
      console.log(res.data);
      if (res.data) {
        setCertify(true);
      }
    } catch (err) {
      console.log("인증번호 잘못보냄");
    }
  };
  //확인버튼 클릭시 수행 APi주소 수정!
  const signUpHdr = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const data = {
        email: email,
        nickName: nickName,
        password: password,
        profileImage: image,
        phone: phoneNum,
      };

      console.log(data);
      //회원가입 api 주소 확인하고 변경해야함.  react Query 사용시 바꿔야할 가능성 높음.
      const res = await axios.post(
        "https://7fdc-218-155-160-190.ngrok-free.app/members",
        data,
      );
      const successMsg = res.data;
      console.log(successMsg);
      navigate("/signupDone");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          console.log("회원가입 정보 확인바람", axiosError.response.data);
        } else {
          console.error("요청 실패함", axiosError.message);
        }
      } else {
        console.error("알수 없는 에러가 발생");
      }
    }
  };
  return (
    <SignUpFormSection>
      <div>
        <AgreeSpan>이용약관</AgreeSpan>
        <InputSpan>정보입력</InputSpan>
        <DoneSpan>완료</DoneSpan>
      </div>
      <InputCtn>
        <EmailCtn>
          <EmailInput
            setEmail={setEmail}
            email={email}
            setValidEmail={setValidEmail}
            setDuplicate={setDuplicate}
          />
          <EmailCheckBtn
            email={email}
            isValidEmail={isValidEmail}
            isDuplicate={isDuplicate}
            setDuplicate={setDuplicate}
          />
        </EmailCtn>
        <NickNameInput setNickName={setNickName} />
        <PasswordInputWrapper>
          <PasswordInput
            password={password}
            setPassword={setPassword}
            setValidPw={setValidPw}
          />
        </PasswordInputWrapper>
        <PasswordCfWrapper>
          <PasswordCfInput
            password={password}
            isSamePw={isSamePw}
            setIsSamePw={setIsSamePw}
            passwordCf={passwordCf}
            setPasswordCf={setPasswordCf}
          />
        </PasswordCfWrapper>
      </InputCtn>
      <MobileCertify
        certifyHdr={certifyHdr}
        phoneNum={phoneNum}
        setPhoneNum={setPhoneNum}
        setCertifyNum={setCertifyNum}
        certifyNum={certifyNum}
        sendHdr={sendHdr}
      />
      <ConfirmBtn
        onClick={e => signUpHdr(e)}
        isDisable={
          isDuplicate &&
          // isCertify &&
          isValidPw &&
          passwordCf &&
          email &&
          password &&
          nickName
            ? false
            : true
        }
      />
    </SignUpFormSection>
  );
};

export default SignUpForm;

export const SignUpFormSection = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 38px;
  width: 239px;
`;
export const AgreeSpan = styled.span`
  font-size: 12px;
  color: #595959;
  margin-right: 5px;
`;

export const InputSpan = styled.span`
  font-weight: 600;
  font-size: 12px;
  margin-right: 5px;
`;

export const EmailCtn = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const PasswordInputWrapper = styled.div`
  margin-top: 4px;
`;

export const PasswordCfWrapper = styled.div`
  margin-top: 4px;
`;
export const DoneSpan = styled.span`
  font-size: 12px;
  color: #595959;
`;

export const InputCtn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 36px;
`;
