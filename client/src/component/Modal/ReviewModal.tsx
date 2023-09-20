import React, { useState } from "react";
import ReactModal from "react-modal";
import styled from "styled-components";
import global from "../../Data/global";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import axios from "axios";

const api = process.env.REACT_APP_DB_HOST;

interface T {
  name: string;
  profileImage: string;
  email: string;
}

type FormData = {
  content: string;
};
const schema = yup.object().shape({
  check1: yup.boolean(),
  check2: yup.boolean(),
  check3: yup.boolean(),
  check4: yup.boolean(),
  check5: yup.boolean(),
  content: yup.string().trim().required("후기를 입력해주세요"),
});

const ReviewModal = ({ name, profileImage, email }: T) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    watch,
  } = useForm({ resolver: yupResolver(schema), mode: "onChange" });
  const [modalOpen, setModalOpen] = useState(false);
  const [point, setPoint] = useState("0");

  const check1 = watch("check1", false);
  const check2 = watch("check2", false);
  const check3 = watch("check3", false);
  const check4 = watch("check4", false);
  const check5 = watch("check5", false);

  //완료버튼 누를시 모달팝업
  const doneHdr = () => {
    setModalOpen(true);
  };

  //각버튼 눌렀을때 이미지 표현
  const check1Hdr = () => {
    setValue("check1", !getValues("check1"));
    setValue("check2", false);
    setValue("check3", false);
    setValue("check4", false);
    setValue("check5", false);
    console.log(point);
  };

  const check2Hdr = () => {
    setValue("check1", !getValues("check2"));
    setValue("check2", !getValues("check2"));
    setValue("check3", false);
    setValue("check4", false);
    setValue("check5", false);
    console.log(point);
  };
  const check3Hdr = () => {
    setValue("check1", !getValues("check3"));
    setValue("check2", !getValues("check3"));
    setValue("check3", !getValues("check3"));
    setValue("check4", false);
    setValue("check5", false);
    console.log(point);
  };

  const check4Hdr = () => {
    setValue("check1", !getValues("check4"));
    setValue("check2", !getValues("check4"));
    setValue("check3", !getValues("check4"));
    setValue("check4", !getValues("check4"));
    setValue("check5", false);
    console.log(point);
  };

  const check5Hdr = () => {
    setValue("check1", !getValues("check5"));
    setValue("check2", !getValues("check5"));
    setValue("check3", !getValues("check5"));
    setValue("check4", !getValues("check5"));
    setValue("check5", !getValues("check5"));
    console.log(check5);
  };

  //점수계산
  const pointHdr = () => {
    if (check5) {
      setPoint("5");
      return;
    }
    if (check4) {
      setPoint("4");
      return;
    }
    if (check3) {
      setPoint("3");
      return;
    }
    if (check2) {
      setPoint("2");
      return;
    }
    if (check1) {
      setPoint("1");
      return;
    }
    setPoint("0"); // 모든 조건을 만족하지 않는 경우
  };
  //후기제출 hdr 클릭시 메인페이지이동, 및 채팅방폭파, 및 후기작성및 별점 보내야됨.
  const assessHdr = async (data: FormData) => {
    console.log(pointHdr());
    const sendData = {
      petSitterImage: profileImage,
      email: email,
      content: data.content,
      name: name,
      star: pointHdr(),
    };
    try {
      const res = await axios.post(`${api}/review`, sendData, {
        headers: {
          Authorization: `${localStorage.getItem("accessToken")}`,
          Accept: "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
      });
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  const checkArr = [
    { name: "check1", value: getValues("check1"), hdr: check1Hdr },
    { name: "check2", value: getValues("check2"), hdr: check2Hdr },
    { name: "check3", value: getValues("check3"), hdr: check3Hdr },
    { name: "check4", value: getValues("check4"), hdr: check4Hdr },
    { name: "check5", value: getValues("check5"), hdr: check5Hdr },
  ] as const;

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
              {checkArr.map((el, idx) =>
                !getValues(el.name) ? (
                  <img
                    key={idx}
                    onClick={el.hdr}
                    style={{ cursor: "pointer" }}
                    src={"/blackfoot.png"}
                    {...register(el.name)}
                  />
                ) : (
                  <img
                    key={idx}
                    onClick={el.hdr}
                    style={{ cursor: "pointer" }}
                    src={"/bluefoot.png"}
                    {...register(el.name)}
                  />
                ),
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

export default ReviewModal;

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
