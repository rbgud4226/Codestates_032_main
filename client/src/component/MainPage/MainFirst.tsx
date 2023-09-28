import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import MainImage1 from "../../asset/MainAsset/MainImage1.png";
import MainLogo from "../../asset/MainAsset/MainLogo.png";

function MainFirst() {
  return (
    <ThemaContainer>
      <SectionContainer>
        <MainImage src={MainImage1} alt={`Image`} />
        <MainImageContainer>
          <MainImageText>{"내가 없을 때\n 내 아이는?"}</MainImageText>
          <MainButton>예약하기</MainButton>
        </MainImageContainer>
      </SectionContainer>

      <SectionContainer>
        <LogoContainer>
          <MainLogoImage src={MainLogo} alt={`Image`} />
          <LogoText>펫톡과 함께하세요!</LogoText>
        </LogoContainer>
      </SectionContainer>
    </ThemaContainer>
  );
}
export default MainFirst;

const ThemaContainer = styled.div``;

const SectionContainer = styled.div`
  position: relative;
`;
const MainImageContainer = styled.div``;

const MainImage = styled.img`
  display: block;
  margin: 0 auto;
  width: 100%;
  height: auto;
`;

const MainImageText = styled.text`
  position: absolute;
  white-space: pre-line;
  bottom: 300px;
  left: 0px;
  color: White;
  font-size: 36px;
  font-weight: bold;
  padding: 10px;
  @media (max-width: 430px) {
    left: 0px;
    bottom: 200px;
  }
`;

const MainButton = styled.button`
  background-color: #279eff;
  color: white;
  font-size: 12px;
  padding: 8px 12px;
  position: relative;
  bottom: 250px;
  width: 80px;
  left: 40px;
  border: 2px solid #279eff;
  cursor: pointer;
  @media (max-width: 430px) {
    bottom: 150px;
  }
`;

const LogoContainer = styled.div`
  text-align: center;
`;

const LogoText = styled.text`
  position: absolute;
  white-space: pre-line;
  top: 70px;
  left: 120px;
  color: #279eff;
  font-size: 28px;
  font-weight: bold;
  padding: 10px;
  @media (max-width: 430px) {
    left: 80px;
    top: 70px;
  }
`;

const MainLogoImage = styled.img``;
