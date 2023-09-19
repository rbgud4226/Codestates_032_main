import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

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

  const [textPosition, setTextPosition] = useState<number>(0); // 숫자로 변경
  const [textOpacity, setTextOpacity] = useState<number>(1);
  const [imagePosition, setImagePosition] = useState<string>("translateY(0)");
  const [imageOpacity, setImageOpacity] = useState<number>(1);

  const handleScroll = () => {
    const scrollY = window.scrollY || window.pageYOffset;
    const startScroll = 200;
    const endScroll = 800;

    if (scrollY <= startScroll) {
      setTextPosition(0);
      setTextOpacity(1);
    } else if (scrollY >= startScroll && scrollY <= endScroll) {
      const normalizedScroll =
        (scrollY - startScroll) / (endScroll - startScroll);

      // 텍스트를 스크롤을 따라 아래로 이동
      setTextPosition(normalizedScroll * 100); // 예시로 100px 아래로 이동

      setTextOpacity(1 - normalizedScroll);
    } else {
      setTextPosition(100); // 스크롤을 아래로 내린 후 텍스트를 고정시킴
      setTextOpacity(0);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [selectedButton, setSelectedButton] = useState("walk");

  const [scrollPosition, setScrollPosition] = useState(0);

  const handleButtonClick = (buttonName: string) => {
    setSelectedButton(buttonName);
  };
  const whiteBoxText =
    selectedButton === "walk" ? (
      <>
        <WalkText>
          동네 산책
          <WalkSText>후각 활동, 마킹, 바른 습관 형성 .</WalkSText>
          <HR />발 닦기
          <WalkSText>물티슈 또는 물세척 후 닦기 .</WalkSText>
          <HR />
          배변 정리
          <WalkSText>산책 중 배변 처리</WalkSText>
          <HR />
        </WalkText>
      </>
    ) : (
      <>
        <WalkText>
          맞춤 배식
          <WalkSText>사료와 간식, 물 급여 </WalkSText>
          <HR />
          신나는 놀이
          <WalkSText>노즈워크, 장남감 놀이 등 .</WalkSText>
          <HR />
          배변 정리
          <WalkSText>돌봄 중 배변 처리</WalkSText>
          <HR />
        </WalkText>
      </>
    );
  return (
    <PageListContainer>
      <PageContainer>
        <SectionContainer>
          <MainImage
            src={MainImage1}
            alt={`Image`}
            style={{
              transform: `translateX(${textPosition}px)`, // 수정된 부분
              opacity: imageOpacity * textOpacity,
            }}
          />
          <TextWrap style={{ position: "absolute" }}>
            <MainText textPosition={textPosition}>
              {"내가 없을 때\n 내 아이는?"}
            </MainText>
            <Btn onClick={LoginButtonClick}>예약하기</Btn>
          </TextWrap>
        </SectionContainer>

        <SectionContainer>
          <MainLogoImage src={MainLogo} alt={`Image`} />
          <MainLogoText>{"펫톡과 함께하세요!"}</MainLogoText>
        </SectionContainer>

        <SectionContainer>
          <NainItwo>
            <MainImagetwo src={MainImage2} alt={`Image`} />
            <WhiteImage>
              <MainTexttwo>{"산책시 실시간\n 위치확인까지!"}</MainTexttwo>
              <MainTexttwoo>
                {
                  "우리 아이가 지금 어디에서 산책하는\n 지 영상과 함께, 실시간 GPS 경로를 \n볼 수 있어요"
                }
              </MainTexttwoo>
            </WhiteImage>
          </NainItwo>
        </SectionContainer>

        <SectionContainer>
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
        </SectionContainer>
      </PageContainer>

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
    </PageListContainer>
  );
}
export default MainForm;

const PageListContainer = styled.div`
  text-align: left;
`;

const PageContainer = styled.div`
  text-align: left;
`;

const SectionContainer = styled.div`
  margin-bottom: 32px;
`;

const HR = styled.hr`
  border: none;
  border-top: 1px solid #ccc;
  margin: 16px;
`;

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

const slideDown = keyframes`
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
`;

const MainImage = styled.img`
  display: flex;
  justify-content: center;
  width: 100%;
  height: auto;
  margin: 0px auto;
  animation: ${slideDown} 1s ease; /* keyframes 애니메이션을 적용합니다. */
  animation-fill-mode: forwards; /* 애니메이션 종료 후 상태를 유지합니다. */
`;

const h1 = styled.div`
  color: "#279eff";
  margin-top: "30%";
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

const MainText = styled.div<{ textPosition: number }>`
  transform: translateX(${props => props.textPosition}px); // 수정된 부분
  margin-top: 350px;
  color: White;
  margin-left: 24px;
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
  margin-left: 30%;
  margin-top: 15px;
  top: 70%;
  color: #279eff;
  font-size: 28px;
  z-index: 3;
  white-space: pre-line;
`;

const MainTexttwoo = styled.div`
  margin-left: 25%;
  margin-top: 15px;
  color: black;
  font-size: 16px;

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
