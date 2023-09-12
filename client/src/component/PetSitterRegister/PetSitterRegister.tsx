import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BasicInformation, { BasicInfoFormData } from "./BasicInformation";
import Experience, { ExperienceFormData } from "./Experience";
import axios from "axios"; // Axios를 import
import before from "../../asset/PetsitterRegisterAsset/Before.png";
import next from "../../asset/PetsitterRegisterAsset/Next.png";

const PetsitterRegister = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState<
    BasicInfoFormData | ExperienceFormData | null
  >(null);
  const api = process.env.REACT_APP_DB_HOST;

  useEffect(() => {
    const fetchPetsitterInfo = async () => {
      try {
        const ngrokSkipBrowserWarning = "69420";
        const response = await axios.get(`${api}/petsitter`, {
          headers: {
            Authorization: `${localStorage.getItem("accessToken")}`, // 토큰을 헤더에 추가
            Accept: "application/json",
            "ngrok-skip-browser-warning": ngrokSkipBrowserWarning,
          },
        });
        console.log(localStorage.getItem("accessToken"));

        if (response.data.petSitterId) {
          setFormData({
            name: response.data.name,
            introduce: response.data.introduce,
            smoking: response.data.smoking,
            nowJob: response.data.nowJob,
            exAnimal: response.data.exAnimal,
            info: response.data.info,
            agreement: response.data.agreement,
          });
        }
      } catch (error) {
        console.error("Error fetching petsitter info:", error);
      }
    };

    fetchPetsitterInfo();
  }, []); // 페이지 로드 시 한 번만 실행

  const nextSlide = () => {
    setCurrentSlide(currentSlide === 0 ? 1 : 0);
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 1 ? 0 : 1);
  };

  const handleFormData = (
    data: BasicInfoFormData | ExperienceFormData | null,
  ) => {
    setFormData(prevData => {
      if (data) {
        // data가 null이 아닌 경우, 기존 데이터와 새 데이터를 병합
        return {
          ...prevData,
          ...data,
        };
      } else {
        // data가 null인 경우, 기존 데이터를 초기화
        return null;
      }
    });
  };

  const handleRegister = async () => {
    if (formData) {
      console.log(formData);

      //   const keys = Object.keys(formData);
      //   console.log(keys); // ["exAnimal", "info", "agreement"]
      //   const values = Object.values(formData);
      //   console.log(values); // [[], "", ["개인정보 수집/이용에 동의합니다."]]

      try {
        const serverUrl =
          "https://a068-121-162-236-116.ngrok-free.app/petsitter";
        const ngrokSkipBrowserWarning = "69420";

        const response = await axios.post(serverUrl, formData, {
          headers: {
            Authorization: `${localStorage.getItem("accessToken")}`, // 토큰을 헤더에 추가
            Accept: "application/json",
            "ngrok-skip-browser-warning": ngrokSkipBrowserWarning,
          },
        });

        console.log("서버 응답:", response.data);
      } catch (error) {
        console.error("서버 요청 중 오류 발생:", error);
      }
    } else {
      console.error("폼 데이터가 누락되었습니다.");
    }
  };

  return (
    <>
      <SlideContainer>
        <Slide style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          <SlideHeader active={currentSlide === 0}>
            <SlideBar1 active={currentSlide === 0} />
          </SlideHeader>
          <div>
            <PageTitle>기본 정보 입력</PageTitle>
            <BasicInformation onBasicInfoChange={handleFormData} />
          </div>
        </Slide>
        <Slide style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          <SlideHeader active={currentSlide === 1}>
            <SlideBar2 active={currentSlide === 1} />
          </SlideHeader>
          <div>
            <PageTitle>반려 경험 및 경력</PageTitle>
            <Experience onExperienceChange={handleFormData} />
            <RegisterButton onClick={handleRegister}>등록하기</RegisterButton>
          </div>
        </Slide>
        {currentSlide === 0 && (
          <NextButton onClick={nextSlide}>
            <img src={next} alt="Next" />
          </NextButton>
        )}
        {currentSlide === 1 && (
          <PrevButton onClick={prevSlide}>
            <img src={before} alt="Before" />
          </PrevButton>
        )}
      </SlideContainer>
    </>
  );
};

export default PetsitterRegister;

type StyledProps = {
  active?: boolean;
};

const SlideContainer = styled.div`
  display: flex;
  overflow: hidden;
  width: 100%;
  position: relative;
`;

const Slide = styled.div`
  flex: 1;
  min-width: 100%;
  transition: transform 0.3s ease;
  position: relative;
`;

const SlideHeader = styled.div<StyledProps>`
  display: flex;
  justify-content: ${props => (props.active ? "flex-start" : "center")};
  background-color: #f0f0f0;
  height: 12px;
  position: absolute;
  width: 100%;
  transform: ${props => (props.active ? "none" : "translateX(100%)")};
`;

const SlideBar1 = styled.div<StyledProps>`
  height: 100%;
  background-color: ${props => (props.active ? "#279EFF" : "#f0f0f0")};
  transition: background-color 0.3s ease;
  flex-grow: 1;
  margin: 0 auto;
  width: 50%;
  position: absolute;
  left: 0;
  transform: ${props => (props.active ? "none" : "translateX(100%)")};
`;

const SlideBar2 = styled.div<StyledProps>`
  height: 100%;
  background-color: ${props => (props.active ? "#279EFF" : "#f0f0f0")};
  transition: background-color 0.3s ease;
  flex-grow: 1;
  margin: 0 auto;
  width: 50%;
  position: absolute;
  right: 0;
  transform: ${props => (props.active ? "none" : "translateX(100%)")};
`;

const PageTitle = styled.h2`
  margin-top: 24px;
  font-size: 28px;
  margin-bottom: 16px;
`;

const NextButton = styled.button`
  position: absolute;
  bottom: 20px;
  right: 20px;
  background: none;
  border: none;
  cursor: pointer;
`;

const PrevButton = styled.button`
  position: absolute;
  bottom: 20px;
  left: 20px;
  background: none;
  border: none;
  cursor: pointer;
`;

const RegisterButton = styled.button`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #279eff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0077cc;
  }
`;
