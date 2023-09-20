import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";

import MainImage1 from "../../asset/MainAsset/MainImage1.png";
import MainLogo from "../../asset/MainAsset/MainLogo.png";
import MainImage2 from "../../asset/MainAsset/MainImage2.png";
import MainImage3 from "../../asset/MainAsset/MainImage3.png";
import MainImage4 from "../../asset/MainAsset/MainImage4.png";
import WhiteBox from "../../asset/MainAsset/WhiteBox.png";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import axios from "axios";

const api = process.env.REACT_APP_DB_HOST;

interface MainProps {
  propertyName: string;
}

function MainForm(props: MainProps) {
  const navigate = useNavigate();
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("accessToken"),
  );

  const checkLoginStatus = () => {
    const accessToken = localStorage.getItem("accessToken");
    setIsLoggedIn(!!accessToken);
  };

  useEffect(() => {
    // 이미지 로딩을 1초 뒤에 완료되도록 설정
    setTimeout(() => {
      setImagesLoaded(true);
    }, 200);
  }, []);

  const moveToWrite = () => {
    if (!isLoggedIn) {
      navigate("/login"); // 로그인되어 있지 않은 경우 로그인 페이지로 이동
    } else {
      navigate("/mainPage"); // 로그인되어 있는 경우 메인 페이지로 이동
    }
  };

  const fetchAccessToken = async () => {
    try {
      const response = await axios.post(`${api}/auth/login`, {});

      const accessToken = response.data.accessToken;
      setIsLoggedIn(accessToken);

      checkLoginStatus(); // 로그인 상태 확인
      navigate("/mainPage"); // 메인 페이지로 이동
    } catch (error) {
      console.error("토큰 요청 중 오류 발생:", error);
    }
  };

  const [textPosition, setTextPosition] = useState<number>(0);
  const [textOpacity, setTextOpacity] = useState<number>(1);
  const [imageOpacity, setImageOpacity] = useState<number>(0); // 이미지 투명도를 0으로 초기화
  const [imagePosition, setImagePosition] =
    useState<string>("translateY(100px)");
  const [text2Position, setText2Position] =
    useState<string>("translateX(-100%)");
  const [text2Visibility, setText2Visibility] = useState<boolean>(false);
  const handleScroll = () => {
    const scrollY = window.scrollY || window.pageYOffset;
    const startScroll = 200;
    const endScroll = 1000; // 변경된 스크롤 위치

    if (scrollY <= startScroll) {
      setTextPosition(0);
      setTextOpacity(1);
      setImageOpacity(0);
      setImagePosition("translateY(100px)");
      setText2Visibility(false); // 초기에는 숨기도록 설정
    } else if (scrollY >= startScroll && scrollY <= endScroll) {
      const normalizedScroll =
        (scrollY - startScroll) / (endScroll - startScroll);

      setTextPosition(normalizedScroll * 100);
      setTextOpacity(1 - normalizedScroll);
      setImageOpacity(normalizedScroll);

      const imageScrollDistance = normalizedScroll * 100;
      setImagePosition(`translateY(-${100 - imageScrollDistance}px)`);

      // 스크롤 위치에 따라 text2Position 값을 변경하여 왼쪽에서 오른쪽으로 나오게 설정
      const text2ScrollDistance = normalizedScroll * 100;
      setText2Position(`translateX(${text2ScrollDistance - 100}%)`); // 왼쪽에서 오른쪽으로 나오는 애니메이션

      // 스크롤 위치에 따라 text2Visibility 값을 변경하여 나타나도록 설정
      if (!text2Visibility) {
        setText2Visibility(true);
      }
    } else {
      setTextPosition(100);
      setTextOpacity(0);
      setImageOpacity(1);
      setImagePosition("translateY(0)");
      setText2Visibility(true); // 최종에는 나타나도록 설정
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [selectedButton, setSelectedButton] = useState("walk");

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
          <WalkSText>사료와 간식, 물 급여로. </WalkSText>
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
          <MainImage src={MainImage1} alt={`Image`} />
          <TextWrap style={{ position: "absolute" }}>
            <AnimatedText textPosition={textPosition}>
              {"내가 없을 때 \n 내 아이는?"}
              <Btn onClick={moveToWrite}>예약하기</Btn>
            </AnimatedText>
          </TextWrap>
        </SectionContainer>
      </PageContainer>

      <SectionContainer>
        <MainLogoImage src={MainLogo} alt={`Image`} />
        <MainLogoText>{"펫톡과 함께하세요!"}</MainLogoText>
      </SectionContainer>

      <SectionContainer>
        <NainItwo>
          <MainImagetwo
            src={MainImage2}
            alt={`Image`}
            style={{
              transform: imagePosition,
              opacity: imageOpacity,
            }}
          />
          <WhiteImage>
            <MainTexttwo
              style={{
                visibility: text2Visibility ? "visible" : "hidden", // 스크롤 위치에 따라 숨기거나 나타나도록 설정
                transform: text2Position, // 왼쪽에서 오른쪽으로 나오는 애니메이션
              }}
            >
              {"산책시 실시간\n 위치확인까지!"}
            </MainTexttwo>
            <MainTexttwoo
              style={{
                visibility: text2Visibility ? "visible" : "hidden", // 스크롤 위치에 따라 숨기거나 나타나도록 설정
                transform: text2Position, // 왼쪽에서 오른쪽으로 나오는 애니메이션
              }}
            >
              {
                "우리 아이가 지금 어디에서 산책하는\n 지 영상과 함께, 실시간 GPS 경로를 \n볼 수 있어요"
              }
            </MainTexttwoo>
          </WhiteImage>
        </NainItwo>
      </SectionContainer>

      <SectionContainer>
        {imagesLoaded && (
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
        )}
      </SectionContainer>
      <SectionContainer>
        {imagesLoaded && (
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
            <SubContainer>
              <ListContainer>
                <TextWrap1>
                  {" "}
                  <WhiteBoxText>{whiteBoxText}</WhiteBoxText>
                  <WalkSbutton onClick={moveToWrite}>맡기기</WalkSbutton>
                </TextWrap1>
              </ListContainer>
            </SubContainer>
          </WhiteBoxContainer>
        )}
      </SectionContainer>
      <SectionendContainer>
        {imagesLoaded && (
          <EndContainer>
            {[
              {
                feLink: "https://github.com/sebfe45kimck",
                beLink: "https://github.com/j00r6",
                name: "FE김철기",
                beName: "BE박진수",
              },
              {
                feLink: "https://github.com/udaeng8286",
                beLink: "https://github.com/SEBBE45JGH",
                name: "FE송유정",
                beName: "BE장근호",
              },
              {
                feLink: "https://github.com/Dohyun12259",
                beLink: "https://github.com/gord10011",
                name: "FE최도현",
                beName: "BE전찬혁",
              },
              {
                feLink: "",
                beLink: "https://github.com/rbgud4226",
                name: "",
                beName: "BE황규형",
              },
            ].map((item, index) => (
              <EndPage key={index}>
                {item.feLink && (
                  <GilinLinkF href={item.feLink}>{item.name}</GilinLinkF>
                )}
                {item.beLink && (
                  <GilinLinkB href={item.beLink}>{item.beName}</GilinLinkB>
                )}
              </EndPage>
            ))}
          </EndContainer>
        )}
      </SectionendContainer>
    </PageListContainer>
  );
}

export default MainForm;

const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-grow: 1;
  flex-direction: column;
  padding: 16px;
  margin-top; 100px;
  color: wihte;
`;
const EndPage = styled.div`
  display: flex;
`;

const PageListContainer = styled.div`
  text-align: left;
`;

const PageContainer = styled.div`
  text-align: left;
`;

const SectionContainer = styled.div`
  margin-bottom: 32px;
  position: relative;
`;

const SectionendContainer = styled.div`
  position: relative;
`;

const EndContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: center;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(34, 39, 76, 0.2);
  height: 100px;

  margin-right: auto;
  background-color: #279eff;
  justify-content: center;
  align-items: center;
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
  font-size: 24px;
  margin-top: 50px;
`;

const GilinLinkB = styled.a`
  margin-right: 10px;
  width: 100px;
  height: 20px;
  color: white;
`;

const GilinLinkF = styled.a`
  margin-right: 10px;
  width: 100px;
  height: 20px;
  color: white;
`;
const WalkSText = styled.div`
  font-size: 16px;
  margin: 20px;
`;

const WalkSbutton = styled.button`
  background-color: white;
  color: #279eff;
  font-size: 16px;
  top: 100px;
  padding: 8px 4px;
  position: relative;
  left: 50px;
  width: 50%;
  border-radius: 4px;
  border: 2px solid #279eff;
  cursor: pointer;
`;

const WhiteBoxContainer = styled.div`
  background-color: white;
`;

const WhiteBoxText = styled.div`
  display: flex;
  color: black;
  font-size: 16px;
  font-weight: bold;
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

const slideInRight = keyframes`
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
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
  display: block;
  margin: 0 auto;
  width: 100%;
  height: auto;
  animation: ${slideDown} 1s ease;
  animation-fill-mode: forwards;
  position: relative;
`;

const TextWrap = styled.div`
  position: absolute;
  white-space: pre-line;
  top: 50%;
  left: 0%;
  color: white;
  padding: 10px;
`;

const h1 = styled.div`
  color: "#279eff";
  margin-top: "30%";
`;

const MainImagetwo = styled.img`
  width: 80%;
  height: auto;
`;

const TextWrap1 = styled.div`
  display: flex;
  flex-direction: column;
  top: 10px;
  white-space: pre-line;
`;
const SubContainer = styled.div`
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(34, 39, 76, 0.2);
  width: 80%;
  height: 600px;
  margin-left: auto;
  margin-right: auto;
`;
const MainText = styled.div<{ textPosition: number }>`
  transform: translateY(${props => props.textPosition}px);
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
  padding: 16px 52px;
  position: relative;
  margin-top: 200px;
  position: relative;
  top: -50px;
  margin-left: 50px;
  border: 2px solid #279eff;
  cursor: pointer;
  border-radius: 8px;
  &.active {
    background-color: #279eff;
    color: white;
  }

  @media (max-width: 430px) {
    margin-top: 100px;
    top: 5;
    margin-left: 30px;
  }
`;
const CareButton = styled.button`
  background-color: white;
  color: #279eff;
  font-size: 16px;
  padding: 16px 52px;
  position: relative;
  margin-top: 200px;
  top: -50px;
  margin-left: 120px;
  border: 2px solid #279eff;
  cursor: pointer;
  border-radius: 8px;
  &.active {
    background-color: #279eff;
    color: white;
  }

  @media (max-width: 430px) {
    margin-top: 100px;
    top: -50px;
    margin-left: 20px;
  }
`;

const MainLogoImage = styled.img`
  display: flex;
  justify-content: center;
  width: 100%;
  height: auto;
  margin-top: 80px;
  margin-bottom: 24px;
  animation: ${slideInRight} 1s ease;
`;

const MainLogoText = styled.div`
  text-align: center;
  margin-bottom: 48px;
  top: 0;
  color: #279eff;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 50%;
  animation: ${slideInRight} 1s ease;
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
  top: 40px;
  width: 80px;
  left: -120px;
  border: 2px solid #279eff;
  cursor: pointer;
`;

const AnimatedText = styled.div<{ textPosition: number }>`
  font-size: 36px;
  font-weight: bold;
  transform: translateY(${props => props.textPosition}px);
  animation: ${slideInRight} 1s ease-in-out;
`;
