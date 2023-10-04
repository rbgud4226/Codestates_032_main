import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import MainImage2 from "../../asset/MainAsset/MainImage2.png";

function MainSecond() {
  return (
    // 컴포넌트 내용
    <ThemaContainer>
      <SectionContainer>
        <MainImage src={MainImage2} alt={`Image`} />
        <SectionText></SectionText>
      </SectionContainer>
    </ThemaContainer>
  );
}
export default MainSecond;

const ThemaContainer = styled.div``;
const SectionContainer = styled.div`
  background-color: White;
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
const SectionText = styled.text``;
