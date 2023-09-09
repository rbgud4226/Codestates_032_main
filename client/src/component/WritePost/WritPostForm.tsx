import React from "react";
import styled from "styled-components";

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
  StepChange: (newStep: number) => void;
  Submit: () => Promise<void>;
}

function PostForm({
  step,
  post,
  InputChange,
  AnimalTagChange,
  StepChange,
  Submit,
}: PostFormProps) {
  return (
    <div>
      {step === 1 && (
        <div>
          <WritPostText>예약</WritPostText>

          <label>
            wcTag (산책/돌봄):
            <select name="wcTag" value={post.wcTag} onChange={InputChange}>
              <option value="산책">산책</option>
              <option value="돌봄">돌봄</option>
            </select>
          </label>
          <br />

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
          <br />

          <label>
            title (제목, 최대 20자):
            <input
              type="text"
              name="title"
              value={post.title}
              onChange={InputChange}
              maxLength={20}
            />
          </label>
          <br />

          <label>
            content (참고내용, 최대 50자):
            <input
              type="text"
              name="content"
              value={post.content}
              onChange={InputChange}
              maxLength={50}
            />
          </label>
          <br />

          <button onClick={() => StepChange(2)}>다음</button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2>Step 2: 다음 단계 내용</h2>
          {/* 이 곳에 Step 2에 대한 내용을 추가하세요 */}
          <button onClick={() => StepChange(1)}>이전</button>
          <button onClick={Submit}>작성 완료</button>
        </div>
      )}
    </div>
  );
}

export default PostForm;

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
