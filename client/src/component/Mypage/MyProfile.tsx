import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
import edit from "../../asset/MypageAsset/edit.png";
// import ProfileImg from "./ProfileImg";
import { fetchMyPageData } from "./MypageService";

const MyProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [newNickname, setNewNickname] = useState("");

  console.log("토큰받음");

  //서버 통신 임시 구현
  const [userData, setUserData] = useState({
    nickName: "",
    email: "",
    phone: "",
    profileImage: "",
    // wcBoardDtoGet: [],
    // checkPetSitter: true,
  });

  useEffect(() => {
    // 어딘가에서 accessToken을 얻어온다고 가정
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      console.error("accessToken이 없습니다.");
      return;
    }

    // fetchMyPageData 함수를 사용하여 서버에서 데이터를 가져옴
    fetchMyPageData(accessToken)
      .then(response => {
        // 서버에서 받아온 응답 데이터로 userData 상태를 초기화
        setUserData(response);

        // 데이터를 가져오는 동안 로딩 상태를 처리할 수도 있습니다.
      })
      .catch(error => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  console.log("응답 데이터: ", userData);

  const formattedPhoneNumber = userData.phone.replace(
    /(\d{3})(\d{4})(\d{4})/,
    "$1-$2-$3",
  );

  const handleEditClick = () => {
    setNewNickname(userData.nickName); // 편집 시작 시 현재 닉네임으로 초기화
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      const serverUrl = "https://a068-121-162-236-116.ngrok-free.app/members";
      const accessToken = localStorage.getItem("accessToken");
      const ngrokSkipBrowserWarning = "69420";
      const page = 1; // 페이지 번호
      const size = 1; // 페이지당 아이템 수

      console.log(newNickname);
      const response = await axios.patch(
        serverUrl,
        {
          nickName: newNickname,
        },
        {
          headers: {
            Authorization: `${accessToken}`,
            Accept: "application/json",
            "ngrok-skip-browser-warning": ngrokSkipBrowserWarning,
          },
          params: {
            page: page,
            size: size,
          },
        },
      );

      if (response.data.success) {
        setUserData({ ...userData, nickName: newNickname });
        setIsEditing(false);
      } else {
        console.error("Nickname update failed.");
      }

      setUserData({ ...userData, nickName: newNickname });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating nickname:", error);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  return (
    <Container>
      <HeaderText>마이페이지</HeaderText>
      <ImgContainer>
        <ProfileImage
          src={userData.profileImage} // 서버에서 받아온 프로필 이미지 URL을 사용
          alt="Profile Image"
        />
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

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
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
  background-color: #279eff;
  color: white;
  padding: 8px 16px; /* 버튼의 크기를 조정하세요 */
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-right: 8px;
`;

const CancelButton = styled.button`
  background-color: #ccc;
  color: white;
  padding: 8px 16px; /* 버튼의 크기를 조정하세요 */
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
