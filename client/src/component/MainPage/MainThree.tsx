import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import MainImage3 from "../../asset/MainAsset/MainImage3.png";
import MainImage4 from "../../asset/MainAsset/MainImage4.png";

function Mainthree() {
  return (
    <ThemaContainer>
      <SectionContainer>
        <MainImage src={MainImage3} alt={`Image`} />
      </SectionContainer>
      <SectionContainer>
        <MainImage src={MainImage4} alt={`Image`} />
      </SectionContainer>
    </ThemaContainer>
  );
}

export default Mainthree;

const ThemaContainer = styled.div``;
const SectionContainer = styled.div`
  background-color: White;
  justify-content: center;
  display: flex;
`;
const MainTextmai = styled.div`
  margin-bottom: 40px;
  color: #279eff;
  font-size: 28px;
  z-index: 3;
  white-space: pre-line;
  @media (max-width: 430px) {
    margin-left: 60px;
  }
`;
const MainImage = styled.img`
  display: block;
  margin: 0 auto;
  width: 100%;
  height: auto;
`;
