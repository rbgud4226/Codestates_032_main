import React from "react";
// import { useState, useEffect } from "react"''
import styled from "styled-components";
import petssiterImg from "../../asset/MainAsset/MainImage1.png";
import edit from "../../asset/MypageAsset/edit.png";
import score from "../../asset/MypageAsset/Mypagescore.png";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
type PetsitterProps = {
  checkPetSitter: boolean;
};

const Petsitter: React.FC<PetsitterProps> = ({ checkPetSitter }) => {
  const navigate = useNavigate();
  const dummyData = {
    name: "홍길동",
    careActivities: 10,
    reviewCount: 5,
    averageRating: 4.5,
  };
  //서버 통신 임시 구현
  // const [userData, setUserData] = useState({
  //   name: "",
  //   careActivities: "",
  //   reviewCount: "",
  //   averageRating: false,
  // });

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get("/멀까요"); // 서버의 엔드포인트에 맞게 수정해야 함
  //     setUserData(response.data);
  //   } catch (error) {
  //     console.error("Error fetching user data:", error);
  //   }
  // };

  return (
    <Container checkPetSitter={checkPetSitter}>
      {checkPetSitter ? (
        <PetSitterContainer checkPetSitter={checkPetSitter}>
          <NameWrapper>
            <NameText>펫시터 {dummyData.name}</NameText>
            <EditIcon src={edit} alt="Name Edit" />
            {/* 수정버튼 클릭시 펫시터 수정 페이지로 이동 구현해야함*/}
          </NameWrapper>
          <InfoWrapper>
            <Item>
              <ItemTitle>케어활동수</ItemTitle>
              <ItemContext>{dummyData.careActivities}회</ItemContext>
            </Item>
            <Item>
              <ItemTitle>리뷰수</ItemTitle>
              <ItemContext>{dummyData.reviewCount}개</ItemContext>
            </Item>
            <Item>
              <ItemTitle>평점</ItemTitle>
              <RatingWrapper>
                <ItemContext>
                  <ScoreIcon src={score} alt="Score" />
                  {dummyData.averageRating}
                </ItemContext>
              </RatingWrapper>
            </Item>
          </InfoWrapper>
        </PetSitterContainer>
      ) : (
        <PetSitterContainer checkPetSitter={checkPetSitter}>
          <RegisterContainer>
            <LeftAlignedText>
              <h2>펫시터 등록하기</h2>
              <p>원할 때 일해봐요!</p>
            </LeftAlignedText>
            <RegisterButton onClick={() => navigate("/petsitter")}>
              등록하기
            </RegisterButton>
          </RegisterContainer>
        </PetSitterContainer>
      )}
    </Container>
  );
};

export default Petsitter;

const Container = styled.div<{ checkPetSitter: boolean }>`
  margin-top: 16px;
  text-align: center;
`;

const PetSitterContainer = styled.div<{ checkPetSitter: boolean }>`
  display: flex;
  flex-direction: column;
  border: 1px solid #595959;
  border-radius: 8px;
  background-image: ${props =>
    props.checkPetSitter
      ? "none"
      : `url(${petssiterImg})`}; // 프로필 이미지 적용
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const NameWrapper = styled.div`
  display: flex;
  padding: 8px;
  border-bottom: 1px solid #595959;
  background-color: #279eff;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  justify-content: space-between;
`;

const NameText = styled.p`
  padding: 8px;
  color: white;
  font-size: 20px;
`;

const EditIcon = styled.img`
  width: 24px;
  height: 24px;
  margin: 8px;
`;

const InfoWrapper = styled.div`
  display: flex;
  padding: 8px;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px;
  flex: 1;
`;

const ItemContext = styled.div`
  display: flex;
  justify-content: center;
  padding: 8px;
  flex: 1;
`;

const RatingWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ScoreIcon = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 8px;
`;

const RegisterButton = styled.button`
  background-color: #279eff;
  color: white;
  padding: 8px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  width: fit-content;
  margin-top: 8px;
`;

const ItemTitle = styled.p`
  margin-bottom: 8px;
`;

const RegisterContainer = styled.div`
  margin: 16px;
`;

const LeftAlignedText = styled.div`
  color: white;
  text-align: left;
`;
