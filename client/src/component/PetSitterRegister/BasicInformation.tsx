import React, { useState } from "react";
import styled from "styled-components";

export type BasicInfoFormData = {
  name: string;
  introduce: string;
  smoking: boolean;
  nowJob: string;
};

type BasicInformationProps = {
  onBasicInfoChange: (data: BasicInfoFormData) => void;
};

const BasicInformation: React.FC<BasicInformationProps> = ({
  onBasicInfoChange,
}) => {
  const [formData, setFormData] = useState<BasicInfoFormData>({
    name: "",
    introduce: "",
    smoking: false,
    nowJob: "",
  });

  const jobOptions = [
    { name: "주부", value: "주부" },
    { name: "학생", value: "학생" },
    { name: "직장인", value: "직장인" },
    { name: "프리랜서", value: "프리랜서" },
    { name: "구직자", value: "구직자" },
  ];

  const handleInputChange = (
    name: keyof BasicInfoFormData,
    value: string | boolean,
  ) => {
    if (name === "smoking") {
      setFormData({ ...formData, [name]: value as boolean });
      onBasicInfoChange({ ...formData, [name]: value as boolean });
    } else {
      setFormData({ ...formData, [name]: value as string });
      onBasicInfoChange({ ...formData, [name]: value as string });
    }
  };

  return (
    <PageContainer>
      <SectionContainer>
        <SectionTitle>이름</SectionTitle>
        <InputName
          type="text"
          name="name"
          value={formData.name}
          onChange={e => handleInputChange("name", e.target.value)}
          placeholder="실명을 입력해주세요."
        />
      </SectionContainer>
      <SectionContainer>
        <SectionTitle>자기 소개</SectionTitle>
        <InputInfo
          name="introduce"
          value={formData.introduce}
          onChange={e => handleInputChange("introduce", e.target.value)}
          placeholder="150자 이내로 입력해주세요."
          maxLength={150}
        />
      </SectionContainer>
      <SectionContainer>
        <SectionTitle>흡연 여부</SectionTitle>
        <ButtonContainer>
          <OptionButton
            selected={formData.smoking === true}
            name="smoking"
            onClick={() => handleInputChange("smoking", true)}
          >
            흡연
          </OptionButton>
          <OptionButton
            selected={formData.smoking === false}
            name="smoking"
            onClick={() => handleInputChange("smoking", false)}
          >
            비흡연
          </OptionButton>
        </ButtonContainer>
        <SmokingWarning>
          반려동물과 직접 대면하는 일 특성상 흡연을 하시는 경우, 펫시터 활동이
          어려울 수 있습니다.
        </SmokingWarning>
      </SectionContainer>
      <SectionContainer>
        <SectionTitle>현재 하시는 일</SectionTitle>
        {jobOptions.map(option => (
          <RadioLabel key={option.value}>
            <RadioInput
              type="radio"
              name="nowJob"
              value={option.value}
              checked={formData.nowJob === option.value}
              onChange={() => handleInputChange("nowJob", option.value)}
            />
            {option.name}
          </RadioLabel>
        ))}
      </SectionContainer>
    </PageContainer>
  );
};

export default BasicInformation;

const PageContainer = styled.div`
  text-align: left;
`;
const SectionContainer = styled.div`
  margin-bottom: 32px;
`;

const SectionTitle = styled.div`
  font-size: 20px;
  margin-bottom: 8px;
`;

const InputName = styled.input`
  width: 100%;
  height: 40px;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #595959;
`;

const InputInfo = styled.textarea`
  width: 100%;
  height: 84px;
  padding: 8px;
  border-radius: 4px;
  text-align: left;
  overflow: auto;
  white-space: normal;
  resize: none;
  border: 1px solid #595959;
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
  font-size: 16px;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const SmokingWarning = styled.div`
  font-size: 12px;
  color: #595959;
  margin-top: 8px;
`;
const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  margin: 8px;
`;

const RadioInput = styled.input`
  margin-right: 8px;
`;
