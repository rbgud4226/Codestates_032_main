import React from "react";
import styled from "styled-components";
import PetTalkLogo from "../component/petalkLogo/PetTalkLogo";
const MainPage = () => {
  return (
    <Container>
      <MainImageWrap>
        <MainImage
          width={"100%"}
          src={"/asset/MainAsset/MainImage1.png"}
          alt={`Image`}
        />
        <MainTextWrap>
          <MainText>{`내가 없을 때\n내 아이는?`}</MainText>
          <MainBtn>{`예약하기`}</MainBtn>
        </MainTextWrap>
      </MainImageWrap>
      <LogoWrap>
        <PetTalkLogo />
        <LogoText>펫톡과 함께하세요!</LogoText>
      </LogoWrap>
      <MainImgWrap2>
        <MainImage
          width={"80%"}
          src={"/asset/MainAsset/MainImage2.png"}
          alt={`Image`}
        />
        <MainTextWrap2>
          <MainText2>{`산책시 실시간\n위치확인까지!`}</MainText2>
          <MainSubText2>{`우리 아이가 지금 어디에서 산책하는지\n영상과 함께 실시간 GPS 경로를\n볼 수 있어요`}</MainSubText2>
        </MainTextWrap2>
      </MainImgWrap2>
      <MainImgWrap2>
        <MainImage
          width={"100%"}
          src={"/asset/MainAsset/MainImage3.png"}
          alt={`Image`}
        />
        <MainTextWrap2>
          <MainText2>{`돌봄 맡기고 \n 휴가도 즐겁게!`}</MainText2>
          <MainSubText2>{`집을 비우거나 휴가를 떠날 때 \n 혼자 있는 우리 아이 걱정 없이!`}</MainSubText2>
          <MainBtn2>신청하기</MainBtn2>
        </MainTextWrap2>
      </MainImgWrap2>
    </Container>
  );
};

export default MainPage;

const Container = styled.div`
  background-color: white;
`;

const MainImageWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const MainImage = styled.img`
  /* width: 100%; */
`;

const MainTextWrap = styled.div`
  position: absolute;
  top: 340px;
  left: 16px;
  gap: 16px;
  display: flex;
  flex-direction: column;
`;

const MainText = styled.div`
  color: #fff;
  white-space: pre-line;
  z-index: 100;
  font-size: 36px;
  line-height: 120%;
  font-weight: 600;
`;

const MainBtn = styled.button`
  background-color: #279eff;
  color: white;
  border: none;
  outline: none;
  width: 131px;
  height: 30px;
`;

const LogoWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  margin-top: 40px;
`;
const LogoText = styled.div`
  font-size: 28px;
  font-weight: 600;
  color: #279eff;
`;

const MainImgWrap2 = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

const MainTextWrap2 = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 36px;
`;

const MainText2 = styled.div`
  font-size: 28px;
  color: #279eff;
  white-space: pre-line;
  text-align: center;
`;

const MainSubText2 = styled.div`
  font-size: 16px;
  white-space: pre-line;
  text-align: center;
`;

const MainBtn2 = styled.button`
  background-color: #279eff;
  color: white;
  font-size: 14px;
  width: 84px;
  border: none;
  border-radius: 8px;
  height: 40px;
`;
