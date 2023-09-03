import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MainImage1 from "../asset/MainImage/MainImage1.png";
import MainLogo from "../asset/MainImage/MainLogo.png";
import MainImage2 from "../asset/MainImage/MainImage2.png";
import MainImage3 from "../asset/MainImage/MainImage3.png";
import MainImage4 from "../asset/MainImage/MainImage4.png";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LoginForm from "./Login/LoginForm";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // 슬라이더 스타일 import
import { Carousel } from "react-responsive-carousel"; // 슬라이더 컴포넌트 import

interface MainProps {
  propertyName: string;
  // 필요한 프로퍼티 타입 정의
}

const Container = styled.div`
  background-color: white; /* 하얀색 배경 추가 */
  padding-bottom: 600px; /* 하얀색 배경의 높이로 조절 */
  position: relative; /* 자식 요소의 절대 위치 설정을 위해 부모 요소를 상대 위치로 설정 */
`;

const MainImage = styled.img`
  max-width: 100%;
  height: auto;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  margin: 0px auto; /*중앙정렬*/
`;

const MainImageWithMargin = styled(MainImage)`
  margin-bottom: 380px; /* 사진 3과 4의 간격 조절 */
  transform: translate(0%, -150px);
`;

const OverlayText = styled.p`
  transform: translate(0%, -350px);
  color: white; /* 텍스트 색상 */
  padding: 30px 30px; /* 내용 주변 여백 */
  cursor: pointer; /* 커서 스타일을 포인터로 변경 */
  font-size: 36px;
  white-space: pre-line; /* 줄바꿈 적용 */
  font-weight: bold;
`;

const OverlayText1 = styled.p`
  transform: translate(10%, -530px);
  color: #279eff; /* 텍스트 색상 */
  padding: 10px 30px; /* 내용 주변 여백 */
  cursor: pointer; /* 커서 스타일을 포인터로 변경 */
  font-size: 28px;
  white-space: pre-line; /* 줄바꿈 적용 */
  font-weight: bold;
`;

const SlideText = styled.p`
  color: #279eff; /* 텍스트 색상 */
  padding: 10px 30px; /* 내용 주변 여백 */
  cursor: pointer; /* 커서 스타일을 포인터로 변경 */
  font-size: 28px;
  white-space: pre-line; /* 줄바꿈 적용 */
`;

const OverlayText5 = styled.p`
  /*마지막 부분 */
  transform: translate(0%, 400px);
  color: #279eff; /* 텍스트 색상 */
  padding: 10px 30px; /* 내용 주변 여백 */
  cursor: pointer; /* 커서 스타일을 포인터로 변경 */
  font-size: 28px;
  white-space: pre-line; /* 줄바꿈 적용 */
`;

const Button = styled.button`
  transform: translate(30%, -320px);
  background-color: #279eff;
  color: white; /* 텍스트 색상 */
  padding: 10px 40px; /* 내용 주변 여백 */
  border: none; /* 테두리 없음 */
  cursor: pointer; /* 커서 스타일을 포인터로 변경 */
  border-radius: 4px;
`;
const OverlappingImagesContainer = styled.div`
  /*메인이미지3 가운데 조절하는데 사용함*/
  position: relative;
  transform: translate(20%, -320px);
`;
const MainImage2WithOverlay = styled.img``;

const WhiteOverlay = styled.div`
  /* 메인이미지2 반을 가리는 흰박스임니다*/
  position: absolute;
  bottom: 0; /* 아래에서 시작 */
  left: -80px;
  width: 100%; /* 가로로 전체 폭 */
  height: 40%; /* 세로로 반만 표시 */
  background-color: white; /* 흰색 바탕 */
  z-index: 2; /* MainImage2WithOverlay 위에 표시 */
  display: flex; /* 내부 요소를 수평 및 수직 가운데 정렬하기 위해 flex 사용 */
  align-items: center; /* 수직 가운데 정렬 */
  justify-content: center; /* 수평 가운데 정렬 */
  text-align: center; /* 텍스트 가운데 정렬 */
`;

function MainForm(props: MainProps) {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const imageUrls = [
      MainImage1,
      MainLogo,
      MainImage2,
      MainImage3,
      MainImage4,
    ];
    setImages(imageUrls);
  }, []);

  const navigate = useNavigate();

  const filteredImages = images.filter(
    (imageUrl, index) => index !== 3 && index !== 4,
  );

  return (
    <Container>
      {filteredImages.map((imageUrl, index) => (
        <div key={index}>
          {imageUrl === MainLogo && index === 0 ? (
            <img src={imageUrl} alt={`Image ${index + 1}`} />
          ) : imageUrl === MainImage1 ? (
            <MainImage src={imageUrl} alt={`Image ${index + 1}`} />
          ) : index === 2 ? (
            <OverlappingImagesContainer>
              <MainImage2WithOverlay
                src={imageUrl}
                alt={`Image ${index + 1}`}
              />
              <WhiteOverlay />
              <WhiteOverlay>
                <h1 style={{ color: "#279eff" }}>
                  산책시 실시간 <br /> 위치확인까지!
                </h1>
                {/* 원하는 텍스트를 추가할 수 있습니다 */}
              </WhiteOverlay>
            </OverlappingImagesContainer>
          ) : (
            <MainImageWithMargin src={imageUrl} alt={`Image ${index + 1}`} />
          )}
          {index === 0 && ( // 첫 번째 이미지 위에만 텍스트를 추가
            <div>
              <OverlayText>내가 없을 때 {"\n"} 내 아이는?</OverlayText>
              <Button onClick={() => navigate("/login")}>예약하기</Button>{" "}
              {/* 버튼 클릭 시 /login으로 이동 */}
            </div>
          )}
          {index === 1 && ( // 두번째 이미지 위에만 텍스트를 추가
            <div>
              <OverlayText1>펫톡과 함께하세요!</OverlayText1>
            </div>
          )}
        </div>
      ))}
      <Carousel showThumbs={false}>
        <div>
          <img src={MainImage3} alt="Image 3" />
          <h1 style={{ color: "#279eff", marginTop: "30%" }}>
            돌봄 맡기기 <br />
            휴가도 즐겁게!
          </h1>
          <p style={{ marginTop: "10%" }}>
            집을 비우거나 휴가를 떠날 때 <br />
            혼자 있는 우리 아이 걱정 없이!
          </p>
        </div>
        <div>
          <img src={MainImage4} alt="Image 4" />
          <h1 style={{ color: "#279eff", marginTop: "30%" }}>
            돌봄 맡기기 <br />
            휴가도 즐겁게!
          </h1>
          <p style={{ marginTop: "10%" }}>
            집을 비우거나 휴가를 떠날 때 <br />
            혼자 있는 우리 아이 걱정 없이!
          </p>
        </div>
      </Carousel>
      <div>
        <OverlayText5>hh</OverlayText5>
      </div>
    </Container>
  );
}
export default MainForm;
