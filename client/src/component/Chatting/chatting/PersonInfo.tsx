import React, { useState } from "react";
import { styled } from "styled-components";

const PersonInfo = () => {
  const [userData, setUserData] = useState({
    nickName: "아무개",
    phone: "01012345678",
    email: "amuge@gmail.com",
    profileImage: "https://i.imgur.com/d67J76L.png",
  });
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
          <p style={{ fontSize: "14px", color: "#595959" }}>{userData.phone}</p>
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
      <BtnCtn>
        <AcceptBtn>수락</AcceptBtn>
        <RefuseBtn>거절</RefuseBtn>
      </BtnCtn>
    </PersonInfoSection>
  );
};

export default PersonInfo;

export const PersonInfoSection = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 92px;
  width: 100%;
  border-radius: 12px;
  box-shadow: 2px 4px 4px 2px rgba(39, 44, 86, 0.25);
`;
export const ImgInfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 16px;
`;

export const ProfileImgWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  width: 60px;
  border-radius: 50%;
  background-color: #279eff;
`;

export const InfoCtn = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 8px;
`;

export const BtnCtn = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 16px;
`;

export const AcceptBtn = styled.button`
  justify-content: center;
  text-align: center;
  margin-bottom: 5px;
  height: 32px;
  width: 80px;
  border: 0px;
  border-radius: 8px;
  color: white;
  font-weight: 600;
  background-color: #279eff;
  cursor: pointer;
  &:active {
    background-color: #1d8ce7;
  }
`;

export const RefuseBtn = styled.button`
  justify-content: center;
  text-align: center;
  height: 32px;
  width: 80px;
  border-radius: 8px;
  background-color: white;
  color: #a4a4a4;
  font-weight: 600;
  border: 1px solid #dee2e9;
  cursor: pointer;
  &:active {
    background-color: #dee2e9;
  }
`;
