import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "react-calendar/dist/Calendar.css";
import AreaSubmit from "./AreaSubmit";
import { useNavigate } from "react-router-dom";
import next from "../../asset/PetsitterRegisterAsset/Next.png";
import before from "../../asset/PetsitterRegisterAsset/Before.png";
import "react-calendar/dist/Calendar.css";
import Pickr from "./Pickr";
import UploadImage from "./ImageSubmit";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const api = process.env.REACT_APP_DB_HOST;
interface PostFormProps {
  step: number;
  post: {
    title: string;
    content: string;
    images: string;
    wcTag: string;
    animalTag: string;
    areaTag: string;
    location: string;
    startTime: string; // 시작 시간 추가
    endTime: string; // 끝나는 시간 추가
  };
  InputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;

  AnimalTagChange: (animal: string) => void;
  WcTagChange: (wc: string) => void;
  StepChange: (newStep: number) => void;
  Submit: () => Promise<void>;
  AreaChange: (area: string | null) => void;
  isSubmitting: boolean;
  handleImageChange: (newImages: string[]) => void;
  images: string[];
  imagePreview: string | null;
  startDate: Date | null;
  endDate: Date | null;
}

//이거 사실 분리해야 하는데 시간 없어서 같이 넣어버림 나중에 리펙토링
function ReservationPage({
  post,
  InputChange,
  StepChange,
  Submit,
}: {
  post: PostFormProps["post"];
  InputChange: PostFormProps["InputChange"];
  StepChange: PostFormProps["StepChange"];
  Submit: PostFormProps["Submit"];
}) {
  // ReservationPage 컴포넌트 내부 코드를 그대로 가져옵니다.
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleSubmit = () => {
    if (startDate && endDate) {
      // 9 시간을 더해서 UTC -> 원하는 시간대로 변환
      const startTime = new Date(startDate);
      startTime.setHours(startTime.getHours() + 9);
      const endTime = new Date(endDate);
      endTime.setHours(endTime.getHours() + 9);

      const startTimeString = startTime.toISOString().replace("Z", "");
      const endTimeString = endTime.toISOString().replace("Z", "");

      post.startTime = startTimeString;
      post.endTime = endTimeString;
      if (
        !post.title ||
        !post.content ||
        !post.wcTag ||
        !post.animalTag ||
        !post.areaTag ||
        !post.location
      ) {
        alert("모든 필수 정보를 입력해주세요.");
        return;
      }
      Submit();
    } else {
      alert("시작 시간과 종료 시간을 입력해주세요.");
    }
  };

  return (
    <PageListContainer>
      <div>
        <SectionTitle>시작 시간</SectionTitle>

        <CustomDatePicker
          selected={startDate}
          onChange={date => setStartDate(date)}
          minDate={new Date()}
          showTimeSelect
          dateFormat="yyyy-MM-dd h:mm"
        />
        <SectionTitle>종료 시간</SectionTitle>
        <CustomDatePicker
          selected={endDate}
          minDate={new Date()}
          onChange={(date: Date | null) => setEndDate(date)}
          showTimeSelect
          dateFormat="yyyy-MM-dd h:mm"
        />
      </div>
      <SectionButtonContainer>
        <SubmitButton onClick={handleSubmit}>제출하기</SubmitButton>
      </SectionButtonContainer>
    </PageListContainer>
  );
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
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [userNickname, setUserNickname] = useState<string>(""); // 사용자 닉네임 상태 변수 추가

  const handleWcTagChange = (wcTag: string) => {
    if (selectedWcTag === wcTag) {
      // 이미 선택된 버튼을 클릭한 경우, 선택 취소
      setSelectedWcTag(null);
    } else {
      // 다른 버튼을 클릭한 경우, 해당 버튼 선택
      setSelectedWcTag(wcTag);
    }
  };
  useEffect(() => {
    // 사용자 닉네임을 가져오는 함수
    const fetchUserNickname = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get(`${api}/members`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const userNickname = response.data.nickName;
        setUserNickname(userNickname);
      } catch (error) {
        console.error("Error fetching user nickname:", error);
      }
    };

    // 컴포넌트가 마운트될 때 사용자의 닉네임을 가져옴
    fetchUserNickname();
  }, []);

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
            <SectionTitle>반려 동물 선택</SectionTitle>
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
              <UploadImage
                onClick={Submit}
                handleImageChange={handleImageChange}
                images={uploadedImages}
              />
              <HR />
            </SectionContainer>
            <SectionContainer>
              <SectionTitle>지역</SectionTitle>
              <AreaSubmit onRegionSelect={AreaChange} />
            </SectionContainer>
            <SectionContainer>
              <SectionArTitle>주소</SectionArTitle>
              <ContentSAreText>시/구 까지만 입력하세요</ContentSAreText>
              <InputArName
                name="location"
                value={post.location}
                onChange={InputChange}
                maxLength={10}
                placeholder="예시)관악구 신사로."
              />
            </SectionContainer>
            <SectionContainer>
              <SectionTitle>예약 날짜</SectionTitle>
              <ReservationPage
                post={post}
                InputChange={InputChange}
                StepChange={StepChange}
                Submit={Submit}
              />
            </SectionContainer>
            <SectionContainer>
              <StepReButton onClick={() => StepChange(1)}>
                <StyledImage src={before} alt="before"></StyledImage>
              </StepReButton>
            </SectionContainer>
            <SectionButtonContainer></SectionButtonContainer>
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
  text-align: left;
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

const SectionArTitle = styled.div`
  font-size: 20px;
  margin-bottom: 8px;
  float: left;
  gap: 14px;
`;

const SectionDayTitle = styled.div`
  font-size: 20px;
  margin-bottom: 8px;
  float: left;
  gap: 16px;
  justify-content: space-around;
`;

const OptionButtonContainer = styled.div`
  display: flex;
  gap: 16px;
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
  height: 44px;
  width: 100%;
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
  width: 100%;
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
const ContentSAreText = styled.div`
  font-size: 12px;
  position: absolute;
  margin-top: -28px;
  margin-left: 48px;
  color: #595959;
`;

const ContentSDay2Title = styled.div`
  font-size: 12px;
  position: absolute;
  margin-top: -28px;
  margin-left: 48px;
  color: #595959;
`;

const ContentSubmitText = styled.div`
  font-size: 12px;
  color: #595959;
  margin-top: 8px;
  margin-bottom: 8px;
`;

const InputName = styled.textarea`
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

const InputArName = styled.textarea`
  width: 100%;
  height: 40px;
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

const SubmitButton = styled.button`
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
  left: 0px;
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
  top: -64px;
`;
const SubmitButtonContainer = styled.div`
  bottom: 100px;
  display: inline-block;
`;
const CustomDatePicker = styled(DatePicker)`
  input {
    width: 200px; 
    height: 40px; 
    font-size: 16px; /

  }
`;
