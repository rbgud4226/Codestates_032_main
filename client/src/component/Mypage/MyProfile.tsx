import React from "react";
import styled from "styled-components";
// import { useState, useEffect } from "react"''
// import axios from "axios";
import edit from "../../asset/MypageAsset/edit.png";
import ProfileImg from "./ProfileImg";

const MyProfile = () => {
  const userData = {
    nickName: "홍길동",
    email: "hgd123@gmail.com",
    phone: "01012345678",
  };

  const formattedPhoneNumber = userData.phone.replace(
    /(\d{3})(\d{4})(\d{4})/,
    "$1-$2-$3",
  );
  //서버 통신 임시 구현
  // const [userData, setUserData] = useState({
  //   nickName: "",
  //   email: "",
  //   phone: "",
  //   petSitter: false,
  // });

  // useEffect(() => {
  //   fetchUserData();
  // }, []);

  // const fetchUserData = async () => {
  //   try {
  //     const response = await axios.get("/members"); // 서버의 엔드포인트에 맞게 수정해야 함
  //     setUserData(response.data);
  //   } catch (error) {
  //     console.error("Error fetching user data:", error);
  //   }
  // };

  return (
    <Container>
      <HeaderText>마이페이지</HeaderText>
      <ImgContainer>
        <ProfileImg />
      </ImgContainer>
      <UserInfo>
        <UserName>
          {/* edit 아이콘 클릭 시 닉네임 수정 기능 추가해야함 */}
          {userData.nickName}님
          <EditIcon src={edit} alt="Name Edit" />
        </UserName>
        <UserEmail>{userData.email}</UserEmail>
        <Separator />
        <UserPhone>
          휴대폰 번호
          <br />
          <PhoneNumber>{formattedPhoneNumber}</PhoneNumber>
        </UserPhone>
        <Separator />
      </UserInfo>
    </Container>
  );
};

export default MyProfile;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;

const HeaderText = styled.p`
  font-size: 20px;
  margin-bottom: 8px;
  color: #000000;
`;

const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 104px;
  height: 104px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: #279eff;
  border-radius: 50%;
`;

const UserInfo = styled.div`
  text-align: center;
`;

const UserName = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  margin-bottom: 8px;
`;

const EditIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const UserEmail = styled.div`
  font-size: 16px;
  margin-bottom: 8px;
`;

const UserPhone = styled.div`
  font-size: 16px;
  margin-bottom: 8px;
  text-align: left;
`;

const PhoneNumber = styled.span`
  margin-top: 8px;
  display: block;
`;

const Separator = styled.div`
  width: 320px;
  height: 1px;
  background-color: #ccc;
  margin-bottom: 8px;
`;
