import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import global from "../../../Data/global";
import AfterChatModal from "../../Modal/ReviewModal";

interface T {
  other: userForm;
  disconnect: () => void;
}

type userForm = {
  nickName?: string;
  name?: string;
  phone?: string;
  email?: string;
  profileImage?: string;
};

const PersonInfo = ({ disconnect, other }: T) => {
  const [isAccept, setIsAccept] = useState(false);

  if (!other) {
    return <>로딩중...</>;
  }

  //거부처리 아마 채팅 폭파. api주소필요함.
  const refuseHdr = () => {
    disconnect();
    window.location.href = "/mainpage";
  };

  //수락시 처리 api주소 필요함.
  const acceptHdr = () => {
    setIsAccept(true);
  };

  return (
    <PersonInfoSection>
      {other.name ? (
        <ImgInfoWrapper>
          <ProfileImgWrapper>
            <img style={{ height: "40px" }} src={other.profileImage}></img>
          </ProfileImgWrapper>
          <InfoCtn>
            <p style={{ fontSize: "16px", marginLeft: "25px" }}>{other.name}</p>
            <p style={{ fontSize: "14px", color: `${global.Gray[1].value}` }}>
              {other.phone}
            </p>
            <p
              style={{
                fontSize: "14px",
                color: "rgba(89, 89, 89, 0.58)",
              }}
            >
              {other.email}
            </p>
          </InfoCtn>
        </ImgInfoWrapper>
      ) : (
        <ImgInfoWrapper>
          <ProfileImgWrapper>
            <img
              style={{ height: "40px" }}
              // {클라이언트 프로필사진 임시}
              src={"https://i.imgur.com/jeAOHnQ.png"}
            ></img>
          </ProfileImgWrapper>
          <InfoCtn>
            <p style={{ fontSize: "16px", marginLeft: "25px" }}>
              {other.nickName}
            </p>
          </InfoCtn>
        </ImgInfoWrapper>
      )}
      {other.name ? (
        !isAccept ? (
          <BtnCtn>
            <AcceptBtn onClick={() => acceptHdr()}>수락</AcceptBtn>
            <RefuseBtn onClick={() => refuseHdr()}>거절</RefuseBtn>
          </BtnCtn>
        ) : (
          <BtnCtn>
            <AfterChatModal
              name={other.name}
              email={other.email}
              profileImage={other.profileImage}
            />
          </BtnCtn>
        )
      ) : (
        <BtnCtn>
          <RefuseBtn onClick={() => refuseHdr()}>거절</RefuseBtn>
        </BtnCtn>
      )}
    </PersonInfoSection>
  );
};

export default PersonInfo;

const PersonInfoSection = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 92px;
  border-radius: 12px;
  margin: 0px 8px;
  box-shadow: 2px 4px 4px 2px rgba(39, 44, 86, 0.25);
  position: sticky;
  top: 138px;
  background-color: ${global.White.value};
  z-index: 1;
`;
const ImgInfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 16px;
`;
const ProfileImgWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  width: 60px;
  border-radius: 50%;
  background-color: ${global.Primary.value};
`;
const InfoCtn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 8px;
`;
const BtnCtn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
`;
const AcceptBtn = styled.button`
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
const RefuseBtn = styled.button`
  justify-content: center;
  text-align: center;
  height: 32px;
  width: 80px;
  border-radius: 8px;
  background-color: ${global.White.value};
  color: ${global.Gray[9].value};
  font-weight: 600;
  border: 1px solid ${global.Gray[5].value};
  cursor: pointer;
  &:active {
    background-color: ${global.Gray[5].value};
  }
`;
