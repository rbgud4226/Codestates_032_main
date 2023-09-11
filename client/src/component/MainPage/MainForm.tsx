import React, { useState } from "react";
import styled from "styled-components";
import MainImage1 from "../../asset/MainAsset/MainImage1.png";
import MainLogo from "../../asset/MainAsset/MainLogo.png";
import MainImage2 from "../../asset/MainAsset/MainImage2.png";
import MainImage3 from "../../asset/MainAsset/MainImage3.png";
import MainImage4 from "../../asset/MainAsset/MainImage4.png";
import WhiteBox from "../../asset/MainAsset/WhiteBox.png";
import { useNavigate } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // 슬라이더 스타일 import
import { Carousel } from "react-responsive-carousel"; // 슬라이더 컴포넌트 import

/* 이미지 안에 글씨를 넣어서 크기에 맞게 같이 작아지는걸 하고싶은데 어떻게 하는지 모르겠다. 나중에 물어봐야겠다. */
interface MainProps {
  propertyName: string;
  // 필요한 프로퍼티 타입 정의
}

function MainForm(props: MainProps) {
  const navigate = useNavigate();

  const LoginButtonClick = () => {
    // 버튼 클릭 시 '/login' 경로로 이동
    navigate("/login");
  };

  const [selectedButton, setSelectedButton] = useState("walk");

  const handleButtonClick = (buttonName: string) => {
    setSelectedButton(buttonName);
  };
  const whiteBoxText =
    /* 여기부분도 좀 잘하면 더 좋아질거같은데 급하다.*/
    selectedButton === "walk" ? (
      <>
        <WalkText>
          동네 산책 <br />
          <WalkSText>후각 활동, 마킹, 바른 습관 형성 .</WalkSText>
          <WalkIText>------------------------------</WalkIText>
          발 닦기
          <br />
          <WalkSText>물티슈 또는 물세척 후 닦기 .</WalkSText>
          <WalkIText>------------------------------</WalkIText>
          배변 정리
          <br />
          <WalkSText>산책 중 배변 처리</WalkSText>
          <WalkIText>------------------------------</WalkIText>
        </WalkText>
      </>
    ) : (
      <>
        <WalkText>
          맞춤 배식 <br />
          <WalkSText>사료와 간식, 물 급여 </WalkSText>
          <WalkIText>------------------------------</WalkIText>
          신나는 놀이
          <br />
          <WalkSText>노즈워크, 장남감 놀이 등 .</WalkSText>
          <WalkIText>------------------------------</WalkIText>
          배변 정리
          <br />
          <WalkSText>돌봄 중 배변 처리</WalkSText>
          <WalkIText>------------------------------</WalkIText>
        </WalkText>
      </>
    );
  return (
    <Container>
      <Container>
        <A>
          <MainImage src={MainImage1} alt={`Image`} />
          <TextWrap>
            <MainText>{"내가 없을 때\n 내 아이는?"}</MainText>
            <Btn onClick={LoginButtonClick}>예약하기</Btn>
          </TextWrap>

          <MainLogoImage src={MainLogo} alt={`Image`} />
          <MainLogoText>{"펫톡과 함께하세요!"}</MainLogoText>

          <A>
            <NainItwo>
              <MainImagetwo src={MainImage2} alt={`Image`} />
              <WhiteImage />
            </NainItwo>
            <MainTexttwo>{"산책시 실시간\n 위치확인까지!"}</MainTexttwo>
            <MainTexttwoo>
              {
                "우리 아이가 지금 어디에서 산책하는\n 지 영상과 함께, 실시간 GPS 경로를 \n볼 수 있어요"
              }
            </MainTexttwoo>
          </A>
        </A>

        <Carousel showThumbs={false}>
          <div>
            <img src={MainImage3} alt="Image 3" />
            <h1>
              돌봄 맡기기 <br />
              휴가도 즐겁게!
            </h1>
            <p>
              집을 비우거나 휴가를 떠날 때 <br />
              혼자 있는 우리 아이 걱정 없이!
            </p>
          </div>
          <div>
            <img src={MainImage4} alt="Image 4" />
            <h1>
              돌봄 맡기기 <br />
              휴가도 즐겁게!
            </h1>
            <p>
              집을 비우거나 휴가를 떠날 때 <br />
              혼자 있는 우리 아이 걱정 없이!
            </p>
          </div>
        </Carousel>
      </Container>
      <WhiteBoxContainer>
        <WalkButton
          className={selectedButton === "walk" ? "active" : ""}
          onClick={() => handleButtonClick("walk")}
        >
          산책
        </WalkButton>
        <CareButton
          className={selectedButton === "care" ? "active" : ""}
          onClick={() => handleButtonClick("care")}
        >
          돌봄
        </CareButton>

        <WhiteBoxImage src={WhiteBox} alt={`Image`} />
        <TextWrap1>
          {" "}
          <WhiteBoxText>{whiteBoxText}</WhiteBoxText>
          <WalkSbutton onClick={LoginButtonClick}>예약하기</WalkSbutton>
        </TextWrap1>
      </WhiteBoxContainer>
    </Container>
  );
}
export default MainForm;

const NainItwo = styled.div`
  background-color: White;
  position: relative;
  margin-left: 20px;
  margin-right: 20px;
  justify-content: center;
  display: flex;
`;

const WalkText = styled.div`
  font-size: 16px;
  margin-top: 100px;
`;

const WalkIText = styled.div`
  font-size: "12px";
  margin: 20px;
`;

const WalkSText = styled.div`
  font-size: 12px;
  margin: 20px;
`;
const WalkSbutton = styled.button`
  background-color: white;
  color: #279eff;
  font-size: 16px;
  padding: 8px 24px;
  position: relative;
  top: 30px;
  width: 120px;
  left: 180px;
  border: 2px solid #279eff;
  cursor: pointer;
`;

const WhiteBoxMargin = styled.div`
  margin-bottom: 4px; /* 원하는 마진 값으로 조절하세요 */
`;
const WhiteBoxContainer = styled.div`
  background-color: white;
  position: relative;
`;

const WhiteBoxText = styled.div`
  display: flex;
  color: black;
  font-size: 16px;
  font-weight: bold;
  margin-left: 120px;
  white-space: nowrap;
  line-height: 1.5;
`;

const WhiteBoxImage = styled.img`
  display: flex;
  justify-content: center;
  width: 100%;
  height: auto;
  margin-top: 60%;
`;

const MainImage = styled.img`
  display: flex;
  justify-content: center;
  width: 100%;
  height: auto;
  margin: 0px auto;
`;
const h1 = styled.div`
  color: "#279eff";
  margintop: "30%";
`;
const MainLogoImage = styled.img`
  display: flex;
  justify-content: center;
  width: 100%;
  height: auto;
  margin-top: 52px;
  margin-bottom: 24px;
`;

const MainImagetwo = styled.img`
  width: 80%;
  height: auto;
`;

const A = styled.div`
  position: relative;
  margin-bottom: 40px;
`;
const TextWrap1 = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  top: -800px;
  white-space: pre-line;
`;

const TextWrap = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 0;
  white-space: pre-line;
`;

const MainText = styled.div`
  margin-left: 16px;
  top: 0;
  margin-top: 263px;
  color: White;
  font-size: 36px;
  font-weight: bold;
`;

const WalkButton = styled.button`
  background-color: white;
  color: #279eff;
  font-size: 16px;
  padding: 24px 52px;
  position: relative;
  top: 280px;
  left: 80px;
  border: 2px solid #279eff;
  cursor: pointer;

  &.active {
    background-color: #279eff;
    color: white;
  }
`;

const CareButton = styled.button`
  background-color: white;
  color: #279eff;
  font-size: 16px;
  padding: 24px 52px;
  position: relative;
  top: 280px;
  left: 160px;
  border: 2px solid #279eff;
  cursor: pointer;

  &.active {
    background-color: #279eff;
    color: white;
  }
`;

const MainLogoText = styled.div`
  text-align: center;
  margin-bottom: 48px;
  top: 0;
  color: #279eff;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 50%;
`;

const MainTexttwo = styled.div`
  margin-left: 20%;
  top: 70%;
  color: #279eff;
  font-size: 28px;
  z-index: 3;
  position: absolute;
  white-space: pre-line;
`;

const MainTexttwoo = styled.div`
  margin-left: 20%;
  top: 84%;
  color: black;
  font-size: 16px;
  z-index: 3;
  position: absolute;
  white-space: pre-line;
`;

const WhiteImage = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 40%;
  background-color: white;
  z-index: 2;
`;

const Container = styled.div`
  background-color: white;
  position: relative;
`;

const Btn = styled.button`
  background-color: #279eff;
  color: white;
  font-size: 12px;
  padding: 8px 12px;
  position: relative;
  top: 30px;
  width: 80px;
  left: 40px;
  border: 2px solid #279eff;
  cursor: pointer;
`;
