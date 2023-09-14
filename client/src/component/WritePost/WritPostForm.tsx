import React, { useState } from "react";
import styled from "styled-components";
import "react-calendar/dist/Calendar.css";
import AreaSubmit from "./AreaSubmit";
import { useNavigate } from "react-router-dom";
import next from "../../asset/PetsitterRegisterAsset/Next.png";
import before from "../../asset/PetsitterRegisterAsset/Before.png";
import "react-calendar/dist/Calendar.css";
import Pickr from "./Pickr";
import ImageSubmit from "./ImageSubmit";

interface PostFormProps {
  step: number;
  post: {
    title: string;
    content: string;
    images: string;
    wcTag: string;
    animalTag: string;
    areaTag: string;
  };
  InputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;

  AnimalTagChange: (animal: string) => void;
  WcTagChange: (wc: string) => void;
  StepChange: (newStep: number) => void;
  Submit: () => Promise<void>;
  AreaChange: (area: string | null) => void;
  isSubmitting: boolean;
  handleImageChange: (newImages: string[]) => void; // handleImageChange 추가
  images: string[]; // images 추가
}

function PostForm({
  step,
  post,
  InputChange,
  AnimalTagChange,
  WcTagChange,
  StepChange,
  Submit,
  AreaChange,
  handleImageChange,
  images,
}: PostFormProps) {
  const [selectedWcTag, setSelectedWcTag] = useState<string | null>(null);
  const [selectedAnimalTags, setSelectedAnimalTags] = useState<string[]>([]);

  const handleWcTagChange = (wcTag: string) => {
    if (selectedWcTag === wcTag) {
      // 이미 선택된 버튼을 클릭한 경우, 선택 취소
      setSelectedWcTag(null);
    } else {
      // 다른 버튼을 클릭한 경우, 해당 버튼 선택
      setSelectedWcTag(wcTag);
    }
  };

  const handleAnimalTagChange = (animalTag: string) => {
    const isSelected = selectedAnimalTags.includes(animalTag);

    if (isSelected) {
      // 이미 선택된 버튼을 클릭한 경우, 선택 취소
      setSelectedAnimalTags(prevTags =>
        prevTags.filter(tag => tag !== animalTag),
      );
    } else {
      // 다른 버튼을 클릭한 경우, 해당 버튼 선택
      setSelectedAnimalTags(prevTags => [...prevTags, animalTag]);
    }
  };

  return (
    <PageListContainer>
      {step === 1 && (
        <PageContainer>
          <SectionContainer>
            <SectionTitle>예약</SectionTitle>
            <OptionButtonContainer>
              <OptionButton
                selected={selectedWcTag === "산책"}
                onClick={() => {
                  WcTagChange("산책");
                  handleWcTagChange("산책");
                }}
              >
                산책
              </OptionButton>
              <OptionButton
                selected={selectedWcTag === "돌봄"}
                onClick={() => {
                  WcTagChange("돌봄");
                  handleWcTagChange("돌봄");
                }}
              >
                돌봄
              </OptionButton>
            </OptionButtonContainer>
          </SectionContainer>
          <SectionContainer>
            <SectionTitle>동물 선택</SectionTitle>
            <OptionButtonContainer>
              <OptiontwoButton
                selected={selectedAnimalTags.includes("강아지")}
                onClick={() => {
                  AnimalTagChange("강아지");
                  handleAnimalTagChange("강아지");
                }}
              >
                강아지
              </OptiontwoButton>
              <OptiontwoButton
                selected={selectedAnimalTags.includes("고양이")}
                onClick={() => {
                  AnimalTagChange("고양이");
                  handleAnimalTagChange("고양이");
                }}
              >
                고양이
              </OptiontwoButton>
              <OptiontwoButton
                selected={selectedAnimalTags.includes("기타동물")}
                onClick={() => {
                  AnimalTagChange("기타동물");
                  handleAnimalTagChange("기타동물");
                }}
              >
                기타동물
              </OptiontwoButton>
            </OptionButtonContainer>
          </SectionContainer>
          <SectionContainer>
            <SectionTitle>제목</SectionTitle>
            <InputInfo
              type="text"
              name="title"
              value={post.title}
              onChange={InputChange}
              maxLength={20}
              placeholder="20자 이내로 입력해주세요."
            />
          </SectionContainer>
          <SectionContainer>
            <SectionTitle>참고내용</SectionTitle>
            <ContentSText>
              케어를 맡기게 된 상황 설명과 반려동물의 이름, 품종, 성별, 성격,
              주의사항 들의 내용을 적어주세요.
            </ContentSText>
            <InputName
              type="text"
              name="content"
              value={post.content}
              onChange={InputChange}
              maxLength={200}
              placeholder="200자 이내로 입력해주세요."
            />
          </SectionContainer>
          <SectionContainer>
            <StepButton onClick={() => StepChange(2)}>
              <StyledImage src={next} alt="Next"></StyledImage>
            </StepButton>
          </SectionContainer>
        </PageContainer>
      )}

      <PageContainer>
        {step === 2 && (
          <PageContainer>
            <SectionContainer>
              <SectionTitle>예약</SectionTitle>
              <HR />
              <ContentSubmitText>선택사항입니다.</ContentSubmitText>
              <ImageSubmit
                handleImageChange={handleImageChange}
                images={images}
              />
              <HR />
            </SectionContainer>
            <SectionContainer>
              <SectionTitle>지역</SectionTitle>
              <AreaSubmit onRegionSelect={AreaChange} />
            </SectionContainer>
            <SectionContainer>
              <SectionTitle>예약 날짜</SectionTitle>
              <Pickr></Pickr>
            </SectionContainer>
            <SectionContainer>
              <StepReButton onClick={() => StepChange(1)}>
                <StyledImage src={before} alt="before"></StyledImage>
              </StepReButton>
            </SectionContainer>
            <SectionButtonContainer>
              <StepSubmitButton onClick={Submit}>제출하기</StepSubmitButton>
            </SectionButtonContainer>
          </PageContainer>
        )}
      </PageContainer>
    </PageListContainer>
  );
}
export default PostForm;
const PageListContainer = styled.div`
  text-align: left;
`;

const PageContainer = styled.div`
  text-align: left;
`;

const SectionContainer = styled.div`
  margin-bottom: 32px;
`;
const SectionButtonContainer = styled.div`
  margin-bottom: 32px;
  text-align: center;
`;

const StyledImage = styled.img`
  margin-left: 10px;
`;

const SectionTitle = styled.div`
  font-size: 20px;
  margin-bottom: 8px;
`;
const OptionButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

const HR = styled.hr`
  border: none;
  border-top: 1px solid #ccc;
  margin: 16px;
`;

const OptionButton = styled.button<{ selected: boolean }>`
  background-color: ${props => (props.selected ? "#279eff" : "white")};
  color: ${props => (props.selected ? "white" : "#279eff")};
  border: 1px solid #279eff;
  width: 210px;
  height: 44px;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  justify-content: space-around;
  font-size: 16px;
`;
const OptiontwoButton = styled.button<{ selected: boolean }>`
  background-color: ${props => (props.selected ? "#279eff" : "white")};
  color: ${props => (props.selected ? "white" : "#279eff")};
  border: 1px solid #279eff;
  width: 200px;
  height: 44px;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  margin-left: 4px;
  font-size: 16px;
`;

const ContentSText = styled.div`
  font-size: 12px;
  color: #595959;
  margin-top: 8px;
  margin-bottom: 8px;
`;
const ContentSubmitText = styled.div`
  font-size: 12px;
  color: #595959;
  margin-top: 8px;
  margin-bottom: 100px;
`;

const InputName = styled.input`
  width: 100%;
  height: 120px;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #595959;
  text-align: left;
  overflow: auto;
  white-space: normal;
  resize: none;
  border: 1px solid #595959;
`;

const InputInfo = styled.input`
  width: 100%;
  height: 40px;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #595959;
  text-align: left;
  overflow: auto;
  white-space: normal;
  resize: none;
`;

const StepButton = styled.button`
  position: absolute;
  bottom: -100px;
  left: 440px;
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
`;
const StepSubmitButton = styled.button`
  color: white;
  background-color: #279eff;
  border: 1px solid #279eff;
  width: 120px;
  height: 44px;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  justify-content: space-around;
  font-size: 16px;
  display: inline-block;
`;

const StepReButton = styled.button`
  position: absolute;
  bottom: -74px;
  left: 0px;
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
`;
