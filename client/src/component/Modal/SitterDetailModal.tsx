import React, { useState } from "react";
import ReactModal from "react-modal";
import styled from "styled-components";
import global from "../../Data/global";

interface P {
  profileImage: string;
  name: string;
  nowJob: string;
  smoking: string;
  phone: string;
  email: string;
  exAnimal?: Array<string>;
  info: string;
}

interface T {
  index: number;
  item: P;
}
const PostDetailModal = ({ item, index }: T) => {
  const [modalItem, setModalItem] = useState<P | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const openModalHdr = (item: P) => {
    setModalItem(item);
    setModalOpen(true);
    console.log(modalItem);
  };
  return (
    <SitterCtn>
      <SitterBtn
        onClick={() => {
          openModalHdr(item);
        }}
      >
        <InfoCtn>
          <p style={{ fontSize: "20px", fontWeight: "600" }}>{item.name}</p>
          <p style={{ fontSize: "20px", color: `${global.Gray[1].value}` }}>
            {item.nowJob}
          </p>
          <p
            style={{
              fontSize: "20px",
              color: `${global.PrimaryLight.value}`,
            }}
          >
            {item.smoking}
          </p>
        </InfoCtn>
        <ImgCtn>
          <img
            src={item.profileImage}
            alt="프로필이미지"
            style={{ height: "64px", width: "64px" }}
          ></img>
        </ImgCtn>
      </SitterBtn>
      <ReactModal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        style={customModalStyles}
        ariaHideApp={false}
        contentLabel="Pop up Message"
        shouldCloseOnOverlayClick={true}
      >
        {/* /*Modal창에 담을 컴포넌트 구성하기*/}
        <ModalCtn>
          <div style={{ width: "100%", cursor: "pointer" }}>
            <BackBtn onClick={() => setModalOpen(false)}>{"뒤로가기"}</BackBtn>
          </div>
          <ImgCtn>
            <img
              src={modalItem?.profileImage}
              alt="프로필이미지"
              style={{ height: "64px", width: "64px" }}
            ></img>
          </ImgCtn>
          <p
            style={{
              fontSize: "16px",
              fontWeight: "600",
              marginTop: "12px",
            }}
          >
            {modalItem?.name}
          </p>
          <SitterInfoCtn>
            <SitterInfo>{modalItem?.nowJob}</SitterInfo>
          </SitterInfoCtn>
          <SitterInfoCtn>
            <SitterInfo>{modalItem?.phone}</SitterInfo>
          </SitterInfoCtn>
          <SitterInfoCtn>
            <SitterInfo>{modalItem?.email}</SitterInfo>
          </SitterInfoCtn>
          <SitterInfoCtn>
            <SitterInfo>{modalItem?.smoking}</SitterInfo>
          </SitterInfoCtn>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              marginTop: "4px",
            }}
          >
            {modalItem?.exAnimal.map((el, i) => (
              <p
                key={i}
                style={{
                  color: `${global.PrimaryLight.value}`,
                  fontSize: "16px",
                  marginRight: "8px",
                }}
              >
                {el}
              </p>
            ))}
            {modalItem?.exAnimal ? (
              <p style={{ fontSize: "16px" }}>반려경험 유</p>
            ) : (
              <p style={{ fontSize: "16px" }}>반려경험 무</p>
            )}
          </div>
          <div style={{ marginTop: "16px", width: "100%" }}>
            <SitterInfo>{modalItem?.info}</SitterInfo>
          </div>
        </ModalCtn>
        <RegisterBtn>지원하기</RegisterBtn>
      </ReactModal>
    </SitterCtn>
  );
};

export default PostDetailModal;

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

const ModalCtn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
const SitterCtn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 135px;
  width: 100%;
  border-radius: 8px;
  box-shadow: 4px 4px 30px 0px #272c564d;
  margin-top: 20px;
  padding: 16px 28px;
  cursor: pointer;
`;

const SitterBtn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;

const InfoCtn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ImgCtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 102px;
  height: 102px;
  background-color: ${global.Primary.value};
  border-radius: 50%;
`;

//여기서부터 모달 스타일

const BackBtn = styled.button`
  background-color: white;
  border: 0px;
  font-size: 20px;
  color: ${global.Primary.value};
  &:active {
    outline: none;
  }
`;

const SitterInfoCtn = styled.div`
  margin-top: 8px;
  width: 100%;
`;

const SitterInfo = styled.p`
  font-size: 16px;
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
