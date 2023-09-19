import React, { useState } from "react";
import ReactModal from "react-modal";
import styled from "styled-components";
import global from "../../Data/global";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import axios from "axios";

interface T {
  name: string;
  profileImage: string;
  email: string;
}

const schema = yup.object().shape({
  content: yup.string().trim().required("후기를 입력해주세요"),
});

const AfterChatModal = ({ name, profileImage, email }: T) => {
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);
  const [check4, setCheck4] = useState(false);
  const [check5, setCheck5] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), mode: "onChange" });
  const [modalOpen, setModalOpen] = useState(false);

  //완료버튼 누를시 모달팝업
  const doneHdr = () => {
    setModalOpen(true);
  };

  const check1Hdr = () => {
    setCheck1(!check1);
    setCheck2(false);
    setCheck3(false);
    setCheck4(false);
    setCheck5(false);
  };

  const check2Hdr = () => {
    setCheck1(!check2);
    setCheck2(!check2);
    setCheck3(false);
    setCheck4(false);
    setCheck5(false);
  };
  const check3Hdr = () => {
    setCheck1(!check3);
    setCheck2(!check3);
    setCheck3(!check3);
    setCheck4(false);
    setCheck5(false);
  };

  const check4Hdr = () => {
    setCheck1(!check4);
    setCheck2(!check4);
    setCheck3(!check4);
    setCheck4(!check4);
    setCheck5(false);
  };

  const check5Hdr = () => {
    setCheck1(!check5);
    setCheck2(!check5);
    setCheck3(!check5);
    setCheck4(!check5);
    setCheck5(!check5);
  };

  const assessHdr = async () => {
    console.log("임시");
  };

  return (
    <>
      <DoneBtn onClick={() => doneHdr()}>완료</DoneBtn>
      <ReactModal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        style={customModalStyles}
        ariaHideApp={false}
        contentLabel="Pop up Message"
        shouldCloseOnOverlayClick={false}
      >
        <ModalCtn>
          <div style={{ width: "100%", cursor: "pointer" }}>
            <BackBtn onClick={() => setModalOpen(false)}>{"뒤로가기"}</BackBtn>
          </div>
          <p style={{ fontSize: "16px", marginTop: "16px" }}>
            후기를 작성해주세요
          </p>
          <ImgCtn>
            <img
              src={profileImage}
              alt="프로필이미지"
              style={{ height: "64px", width: "64px" }}
            ></img>
          </ImgCtn>
          <p style={{ fontSize: "16px", fontWeight: "600", marginTop: "4px" }}>
            {name}
          </p>
          <p style={{ fontSize: "16px", marginTop: "4px" }}>{email}</p>
          <AssessForm onSubmit={handleSubmit(assessHdr)}>
            <PointCtn>
              {!check1 ? (
                <img onClick={check1Hdr} src={"/blackfoot.png"} />
              ) : (
                <img onClick={check1Hdr} src={"/bluefoot.png"} />
              )}
              {!check2 ? (
                <img onClick={check2Hdr} src={"/blackfoot.png"} />
              ) : (
                <img onClick={check2Hdr} src={"/bluefoot.png"} />
              )}
              {!check3 ? (
                <img onClick={check3Hdr} src={"/blackfoot.png"} />
              ) : (
                <img onClick={check3Hdr} src={"/bluefoot.png"} />
              )}
              {!check4 ? (
                <img onClick={check4Hdr} src={"/blackfoot.png"} />
              ) : (
                <img onClick={check4Hdr} src={"/bluefoot.png"} />
              )}
              {!check5 ? (
                <img onClick={check5Hdr} src={"/blackfoot.png"} />
              ) : (
                <img onClick={check5Hdr} src={"/bluefoot.png"} />
              )}
            </PointCtn>
            <ContentInput
              placeholder="50자이내로 입력하세요"
              {...register("content")}
            />
            <div style={{ marginTop: "8px" }}>
              <RegisterBtn>작성완료</RegisterBtn>
              <ErrMsg>{errors.content?.message}</ErrMsg>
            </div>
          </AssessForm>
        </ModalCtn>
      </ReactModal>
    </>
  );
};

export default AfterChatModal;

const customModalStyles: ReactModal.Styles = {
  overlay: {
    backgroundColor: " rgba(0, 0, 0, 0.4)",
    width: "100%",
    height: "100vh",
    zIndex: "10",
    position: "fixed",
    top: "0",
    left: "0",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    width: "360px",
    height: "524px",
    zIndex: "150",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "12px",
    boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
    backgroundColor: "white",
    overflow: "auto",
  },
};

const DoneBtn = styled.button`
  justify-content: center;
  text-align: center;
  margin-bottom: 5px;
  height: 32px;
  width: 80px;
  border: 0px;
  border-radius: 8px;
  color: white;
  font-weight: 600;
  background-color: ${global.Primary.value};
  cursor: pointer;
  &:active {
    background-color: ${global.PrimaryActive.value};
  }
`;

const ModalCtn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  z-index: 5;
`;

const BackBtn = styled.button`
  background-color: white;
  border: 0px;
  font-size: 20px;
  cursor: pointer;
  color: ${global.Primary.value};
  &:active {
    outline: none;
  }
`;

const ImgCtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 102px;
  height: 102px;
  background-color: ${global.Primary.value};
  border-radius: 50%;
  margin-top: 12px;
`;
const AssessForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PointCtn = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 20px;
  align-items: center;
  width: 100%;
  height: 50px;
`;

const ContentInput = styled.textarea`
  display: flex;
  justify-content: flex-start;
  text-align: start;
  padding: 12px 12px;
  font-size: 12px;
  height: 120px;
  width: 100%;
  margin-top: 12px;
  border-radius: 8px;
  border: 1px solid ${global.Gray[1].value};
`;

const RegisterBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${global.Primary.value};
  color: white;
  font-size: 14px;
  font-weight: 600;
  border-radius: 8px;
  width: 120px;
  height: 36px;
  border: 0px;
  cursor: pointer;
  &:active {
    outline: none;
    background-color: ${global.PrimaryActive.value};
  }
`;

const ErrMsg = styled.div`
  justify-content: flex-start;
  margin-top: 4px;
  color: ${global.ErrorMsgRed.value};
  font-size: 10px;
  margin-bottom: 6px;
`;
