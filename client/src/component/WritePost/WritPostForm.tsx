import React, { useState } from "react";
import styled from "styled-components";
import "react-calendar/dist/Calendar.css";
import ImageSubmit from "./ImageSubmit";
import AreaSubmit from "./AreaSubmit";
import { useNavigate } from "react-router-dom";

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
  const [Calende, setCalende] = useState(new Date());
  const [selectedWcTag, setSelectedWcTag] = useState<string | null>(null);

  const handleWcTagChange = (wcTag: string) => {
    if (selectedWcTag === wcTag) {
      // 이미 선택된 버튼을 클릭한 경우, 선택 취소
      setSelectedWcTag(null);
    } else {
      // 다른 버튼을 클릭한 경우, 해당 버튼 선택
      setSelectedWcTag(wcTag);
    }
  };

  return (
    <div>
      {step === 1 && (
        <div>
          <WritPostText>
            예약
            <div>
              <WCButton
                onClick={() => {
                  WcTagChange("산책");
                  handleWcTagChange("산책");
                }}
                style={{
                  backgroundColor:
                    selectedWcTag === "산책" ? "#279eff" : "white",
                }}
              >
                산책
              </WCButton>
              <WCButton
                onClick={() => {
                  WcTagChange("돌봄");
                  handleWcTagChange("돌봄");
                }}
                style={{
                  backgroundColor:
                    selectedWcTag === "돌봄" ? "#279eff" : "white",
                }}
              >
                돌봄
              </WCButton>
            </div>
          </WritPostText>

          <WritPostText>
            동물 선택
            <div>
              <AButton
                onClick={() => AnimalTagChange("강아지")}
                style={{
                  backgroundColor: post.animalTag.includes("강아지")
                    ? "#279eff" // 선택된 경우의 스타일
                    : "white", // 선택되지 않은 경우의 스타일
                }}
              >
                강아지
              </AButton>

              <AButton
                onClick={() => AnimalTagChange("고양이")}
                style={{
                  backgroundColor: post.animalTag.includes("고양이")
                    ? "#279eff" // 선택된 경우의 스타일
                    : "white", // 선택되지 않은 경우의 스타일
                }}
              >
                고양이
              </AButton>
              <AButton
                onClick={() => AnimalTagChange("기타동물")}
                style={{
                  backgroundColor: post.animalTag.includes("기타동물")
                    ? "#279eff" // 선택된 경우의 스타일
                    : "white", // 선택되지 않은 경우의 스타일
                }}
              >
                기타동물
              </AButton>
            </div>
          </WritPostText>

          <ContentText>제목</ContentText>
          <InputInfo
            type="text"
            name="title"
            value={post.title}
            onChange={InputChange}
            maxLength={20}
            placeholder="20자 이내로 입력해주세요."
          />

          <ContentText>참고내용</ContentText>
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
          <Container>
            <StepButton onClick={() => StepChange(2)}>다음</StepButton>
          </Container>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2>Step 2: 다음 단계 내용</h2>
          {/* 이 곳에 Step 2에 대한 내용을 추가하세요 */}
          <ImageSubmit handleImageChange={handleImageChange} images={images} />
          <AreaSubmit onRegionSelect={AreaChange} />
          <Container>
            <StepReButton onClick={() => StepChange(1)}>이전</StepReButton>
            <StepSubimtButton onClick={Submit}>작성 완료</StepSubimtButton>
          </Container>
        </div>
      )}
    </div>
  );
}
export default PostForm;

const Container = styled.div`
  position: absolute;
  bottom: 0px; /* 원하는 위치로 조정 */
  display: flex;
  justify-content: space-between; /* 이전과 작성 완료를 떨어뜨리기 위해 추가 */
  width: 100%; /* 부모 요소 전체 너비로 확장 */
`;

const WritPostText = styled.div`
  font-size: 28px;
  margin-top: 40px;
  margin-left: 8px;
`;

const WCButton = styled.button`
  color: black;
  font-size: 12px;
  padding: 16px 12px;
  position: relative;
  margin-left: 40px;
  top: 10px;
  width: 160px;
  border: 2px solid 
  cursor: pointer;
  border-radius: 8px;
  margin-bottom: 40px;
`;

const AButton = styled.button`
  color: black;
  font-size: 12px;
  padding: 12px 12px;
  position: relative;
  margin-left: 40px;
  top: 10px;
  width: 100px;
  border: 2px solid 
  cursor: pointer;
  border-radius: 8px;
  margin-bottom: 40px;
`;

const ContentText = styled.div`
  font-size: 28px;
  margin-top: 40px;
  margin-left: 8px;
`;

const ContentSText = styled.div`
  font-size: 12px;
  margin-top: 12px;
  margin-bottom: 8px;
  margin-left: 12px;
`;

const InputName = styled.input`
  width: 90%;
  height: 124px;
  margin-left: 24px;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #595959;
  text-align: left;
  overflow: auto;
  white-space: normal;
  resize: none;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const InputInfo = styled.input`
  width: 90%;
  height: 40px;
  padding: 8px;
  margin-left: 24px;
  border-radius: 4px;
  border: 1px solid #595959;
  text-align: left;
  overflow: auto;
  white-space: normal;
  resize: none;
  margin-bottom: 40px;
`;

const StepButton = styled.button`
  position: absolute;
  bottom: 0px;
  left: 450px;
  background: none;
  border: none;
  cursor: pointer;
`;
const StepReButton = styled.button`
  position: absolute;
  bottom: 100px;
  left: 0px; /* 수정: 오타 수정 */
  background: none;
  border: none;
  cursor: pointer;
`;

const StepSubimtButton = styled.button`
  position: absolute;
  bottom: 100px;
  left: 400px; /* 수정: 오타 수정 및 원하는 위치로 조정 */
  background: none;
  border: none;
  cursor: pointer;
`;
