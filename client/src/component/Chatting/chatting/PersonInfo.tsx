import React, { useState } from "react";
import { styled } from "styled-components";
import global from "../../../Data/global";
import AfterChatModal from "../../Modal/AfterChatModal";

interface T {
  disconnect: () => void;
}

const PersonInfo = ({ disconnect }: T) => {
  const [isAccept, setIsAccept] = useState(false);
  const [userData, setUserData] = useState({
    nickName: "아무개",
    phone: "01012345678",
    email: "amuge@gmail.com",
    profileImage: "https://i.imgur.com/d67J76L.png",
  });

  const refuseHdr = () => {
    disconnect();
    window.location.href = "/mainpage";
  };

  const acceptHdr = () => {
    setIsAccept(true);
  };

  return (
    <PersonInfoSection>
      <ImgInfoWrapper>
        <ProfileImgWrapper>
          <img style={{ height: "40px" }} src={userData.profileImage}></img>
        </ProfileImgWrapper>
        <InfoCtn>
          <p style={{ fontSize: "16px", marginLeft: "25px" }}>
            {userData.nickName}
          </p>
          <p style={{ fontSize: "14px", color: `${global.Gray[1].value}` }}>
            {userData.phone}
          </p>
          <p
            style={{
              fontSize: "14px",
              color: "rgba(89, 89, 89, 0.58)",
            }}
          >
            {userData.email}
          </p>
        </InfoCtn>
      </ImgInfoWrapper>
      {!isAccept ? (
        <BtnCtn>
          <AcceptBtn onClick={() => acceptHdr()}>수락</AcceptBtn>
          <RefuseBtn onClick={() => refuseHdr()}>거절</RefuseBtn>
        </BtnCtn>
      ) : (
        <BtnCtn>
          <AfterChatModal
            name={"고길동"}
            email={"ada@gmail.com"}
            profileImage={"https://i.imgur.com/5blwuBz.png"}
          />
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
