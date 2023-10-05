import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import MainImage2 from "../../asset/MainAsset/MainImage2.png";

function MainSecond() {
  return (
    // 컴포넌트 내용
    <ThemaContainer>
      <SectionContainer>
        <MainImage src={MainImage2} alt={`Image`} />
        <WhiteImage>
          <MainTextmai>{"산책시 실시간 \n 위치확인까지!"}</MainTextmai>
          <MainTextsub>
            {
              "우리 아이가 지금 어디에서 산책하는 \n 지 영상과 함께, 실시간 GPS 경로를 \n 볼 수 있어요."
            }
          </MainTextsub>
        </WhiteImage>
      </SectionContainer>
    </ThemaContainer>
  );
}
export default MainSecond;

const ThemaContainer = styled.div``;
const SectionContainer = styled.div`
  background-color: White;
  margin-top: 100px;
  position: relative;
  margin-left: 20px;
  margin-right: 20px;
  justify-content: center;
  display: flex;
`;
const MainImage = styled.img`
  margin: 0 auto;
  width: 80%;
  height: auto;
  margin-top: 100px;
`;

const WhiteImage = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 30%;
  background-color: white;
  z-index: 2;
`;

const MainTextmai = styled.div`
  margin-left: 100px;
  margin-top: 40px;
  top: 70%;
  color: #279eff;
  font-size: 28px;
  z-index: 3;
  white-space: pre-line;
  @media (max-width: 430px) {
    margin-left: 60px;
  }
`;

const MainTextsub = styled.div`
  margin-left: 100px;
  margin-top: 36px;
  color: #737373;
  font-size: 16px;
  white-space: pre-line;
  @media (max-width: 430px) {
    margin-left: 60px;
    margin-top: 12px;
  }
`;

const SectionText = styled.text``;
