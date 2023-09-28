import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";

import MainImage1 from "../../asset/MainAsset/MainImage1.png";
import MainLogo from "../../asset/MainAsset/MainLogo.png";
import axios from "axios";

type MainSecond = {
  propertyName: string;
};

function MainSecond(props: MainSecond) {
  return (
    // 컴포넌트 내용
    <ThemaContainer>
      <SectionContainer>
        <MainImage src={MainImage1} alt={`Image`} />
        <SectionText></SectionText>
      </SectionContainer>
    </ThemaContainer>
  );
}
export default MainSecond;

const ThemaContainer = styled.div``;
const SectionContainer = styled.div``;
const MainImage = styled.img`
  margin: 0 auto;
  width: 100%;
  height: auto;
  margin-top: 100px;
`;
const SectionText = styled.text``;
