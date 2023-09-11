import React, { useState } from "react";
import styled from "styled-components";
import Calendar from "react-calendar";
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
}: PostFormProps) {
  const [Calende, setCalende] = useState(new Date());

  return (
    <div>
      {step === 1 && (
        <div>
          <WritPostText>
            예약
            <div>
              <WCButton
                onClick={() => WcTagChange("산책")}
                style={{
                  backgroundColor: post.wcTag.includes("산책")
                    ? "#279eff" // 선택된 경우의 스타일
                    : "white", // 선택되지 않은 경우의 스타일
                }}
              >
                산책
              </WCButton>
              <WCButton
                onClick={() => WcTagChange("돌봄")}
                style={{
                  backgroundColor: post.wcTag.includes("돌봄")
                    ? "#279eff" // 선택된 경우의 스타일
                    : "white", // 선택되지 않은 경우의 스타일
                }}
              >
                돌봄
              </WCButton>
            </div>
          </WritPostText>

          <WritPostText>
            동물 선택
            <div>
              <WCButton
                onClick={() => AnimalTagChange("강아지")}
                style={{
                  backgroundColor: post.animalTag.includes("강아지")
                    ? "#279eff" // 선택된 경우의 스타일
                    : "white", // 선택되지 않은 경우의 스타일
                }}
              >
                강아지
              </WCButton>

              <WCButton
                onClick={() => AnimalTagChange("고양이")}
                style={{
                  backgroundColor: post.animalTag.includes("고양이")
                    ? "#279eff" // 선택된 경우의 스타일
                    : "white", // 선택되지 않은 경우의 스타일
                }}
              >
                고양이
              </WCButton>
              <WCButton
                onClick={() => AnimalTagChange("기타동물")}
                style={{
                  backgroundColor: post.animalTag.includes("기타동물")
                    ? "#279eff" // 선택된 경우의 스타일
                    : "white", // 선택되지 않은 경우의 스타일
                }}
              >
                기타동물
              </WCButton>
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

          <StepButton onClick={() => StepChange(2)}>다음</StepButton>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2>Step 2: 다음 단계 내용</h2>
          {/* 이 곳에 Step 2에 대한 내용을 추가하세요 */}
          <ImageSubmit></ImageSubmit>
          <AreaSubmit onRegionSelect={AreaChange} />
          <StepReButton onClick={() => StepChange(1)}>이전</StepReButton>
          <StepButton onClick={Submit}>작성 완료</StepButton>
        </div>
      )}
    </div>
  );
}
export default PostForm;

const Container = styled.div`
  display: flex;
  overflow: hidden;
`;

const WritPostText = styled.div`
  font-size: 28px;
  margin-top: 40px;
  margin-left: 8px;
`;

const WCButton = styled.button`
  color: black;
  font-size: 12px;
  padding: 8px 12px;
  position: relative;
  margin-left: 40px;
  top: 10px;
  width: 100px;
  border: 2px solid #279eff;
  cursor: pointer;
`;
const ContentText = styled.div`
  font-size: 20px;
  margin-bottom: 8px;
  margin-top: 8px;
`;

const ContentSText = styled.div`
  font-size: 12px;
  margin-top: 12px;
  margin-bottom: 8px;
`;

const InputName = styled.input`
  width: 100%;
  height: 124px;
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
  bottom: 100px;
  right: 100px;
  background: none;
  border: none;
  cursor: pointer;
`;
const StepReButton = styled.button`
  position: absolute;
  bottom: 100px;
  letf: 100px;
  background: none;
  border: none;
  cursor: pointer;
`;
