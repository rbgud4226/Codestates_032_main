import React from "react";
import styled from "styled-components";
import { useState } from "react";
// import axios from "axios";
import edit from "../../asset/MypageAsset/edit.png";
import ProfileImg from "./ProfileImg";

const MyProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [newNickname, setNewNickname] = useState("");
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

  const handleEditClick = () => {
    setNewNickname(userData.nickName); // 편집 시작 시 현재 닉네임으로 초기화
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      // const response = await axios.put("/members", {
      //   newNickname,
      // });

      // if (response.data.success) {
      //   setUserData({ ...userData, nickName: newNickname });
      //   setIsEditing(false);
      // } else {
      //   console.error("Nickname update failed.");
      // }

      // setUserData({ ...userData, nickName: newNickname });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating nickname:", error);
      // 업데이트에 실패한 경우에 대한 처리
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  return (
    <Container>
      <HeaderText>마이페이지</HeaderText>
      <ImgContainer>
        <ProfileImg />
      </ImgContainer>
      <UserInfo>
        <UserName>
          {isEditing ? (
            <NicknameEdit>
              <Input
                type="text"
                value={newNickname}
                onChange={e => setNewNickname(e.target.value)}
              />
              <ButtonContainer>
                <SaveButton onClick={handleSaveClick}>저장</SaveButton>
                <CancelButton onClick={handleCancelClick}>취소</CancelButton>
              </ButtonContainer>
            </NicknameEdit>
          ) : (
            <>
              {userData.nickName}님
              <EditIcon src={edit} alt="Name Edit" onClick={handleEditClick} />
            </>
          )}
        </UserName>
        <UserEmail>{userData.email}</UserEmail>
        <Separator />
        <UserPhone>
          휴대폰 번호
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
`;

const HeaderText = styled.h2`
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
  background-color: #2d9ffc;
  border-radius: 50%;
`;

const UserInfo = styled.div`
  text-align: center;
  width: 100%;
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

const NicknameEdit = styled.div`
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  width: 100px; /* 입력 필드의 넓이를 조정하세요 */
  height: 32px; /* 입력 필드의 높이를 조정하세요 */
  margin-right: 8px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  text-align: center;
  font-size: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SaveButton = styled.button`
  background-color: #2d9ffc;
  color: white;
  padding: 4px 16px; /* 버튼의 크기를 조정하세요 */
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-right: 8px;
`;

const CancelButton = styled.button`
  background-color: #ccc;
  color: white;
  padding: 4px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
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
  height: 1px;
  background-color: #ccc;
  margin-bottom: 8px;
`;
