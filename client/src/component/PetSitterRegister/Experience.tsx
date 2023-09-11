import React, { useState } from "react";
import styled from "styled-components";

export type ExperienceFormData = {
  exAnimal: string[];
  info: string;
  agreement: string[];
};

type ExperienceProps = {
  onExperienceChange: (data: ExperienceFormData) => void;
};

const Experience: React.FC<ExperienceProps> = ({ onExperienceChange }) => {
  const [formData, setFormData] = useState<ExperienceFormData>({
    exAnimal: [] as string[],
    info: "",
    agreement: [] as string[],
  });

  const handleexAnimalClick = (option: string) => {
    const updatedexAnimals = formData.exAnimal.includes(option)
      ? formData.exAnimal.filter(pet => pet !== option)
      : [...formData.exAnimal, option];
    setFormData({ ...formData, exAnimal: updatedexAnimals });
    onExperienceChange({ ...formData, exAnimal: updatedexAnimals });
  };

  const handleInputChange = (name: keyof ExperienceFormData, value: string) => {
    setFormData({ ...formData, [name]: value });
    onExperienceChange({ ...formData, [name]: value });
  };

  const handleAgreementChange = (value: string) => {
    const updatedAgreements = formData.agreement.includes(value)
      ? formData.agreement.filter(agreement => agreement !== value)
      : [...formData.agreement, value];
    setFormData({ ...formData, agreement: updatedAgreements });
    onExperienceChange({ ...formData, agreement: updatedAgreements });
  };

  const petOptions = [
    { name: "강아지", value: "dog" },
    { name: "고양이", value: "cat" },
    { name: "기타", value: "etc" },
  ];

  const agreements = [
    {
      name: "개인정보 수집/이용에 동의합니다.",
      value: "개인정보 수집/이용에 동의합니다.",
    },
    {
      name: "지원서에 기재된 내용은 본인이 작성하였으며, 사실과 다름 없음을 확인했습니다.",
      value:
        "지원서에 기재된 내용은 본인이 작성하였으며, 사실과 다름 없음을 확인했습니다.",
    },
  ];

  return (
    <PageContainer>
      <SectionContainer>
        <SectionTitle>
          반려 경험이 있는 동물을 선택해주세요.(중복가능)
        </SectionTitle>
        <ButtonContainer>
          {petOptions.map(option => (
            <OptionButton
              key={option.value}
              selected={formData.exAnimal.includes(option.value)}
              onClick={() => handleexAnimalClick(option.value)}
            >
              {option.name}
            </OptionButton>
          ))}
        </ButtonContainer>
      </SectionContainer>
      <SectionContainer>
        <SectionTitle>그 외 반려동물 케어 경험 혹은 경력</SectionTitle>
        <Notice>
          자신의 반려동물이 아닌 타인의 반려동물을 돌보았던 경험 혹은 봉사활동,
          병원 근무, 펫시터 등의 경력을 구체적으로 적어주세요. (경험이나 경력이
          없다면 “없습니다” 라고 작성)
        </Notice>
        <InputInfo
          name="info"
          value={formData.info}
          onChange={e => handleInputChange("info", e.target.value)}
          placeholder="타인의 반려동물을 돌봐준 경험 혹은 그 외 반려 동물 관련 경력에 대해서 적어주세요. 200자 이내로 입력해주세요."
          maxLength={225}
        />
      </SectionContainer>
      <SectionContainer>
        <SectionTitle>동의 사항</SectionTitle>
        {agreements.map(option => (
          <CheckboxLabel key={option.value}>
            <CheckboxInput
              type="checkbox"
              name={option.name}
              checked={formData.agreement.includes(option.value)}
              onChange={() => handleAgreementChange(option.value)}
            />
            {option.name}
          </CheckboxLabel>
        ))}
      </SectionContainer>
    </PageContainer>
  );
};

export default Experience;

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

const OptionButton = styled.button<{ selected: boolean }>`
  background-color: ${props => (props.selected ? "#279eff" : "white")};
  color: ${props => (props.selected ? "white" : "#279eff")};
  border: 1px solid #279eff;
  width: 120px;
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

const Notice = styled.div`
  font-size: 12px;
  color: #595959;
  margin-top: 8px;
  margin-bottom: 8px;
`;

const InputInfo = styled.textarea`
  width: 100%;
  height: 120px;
  padding: 8px;
  border-radius: 4px;
  text-align: left;
  overflow: auto;
  white-space: normal;
  resize: none;
  border: 1px solid #595959;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  margin: 8px;
`;

const CheckboxInput = styled.input`
  margin-right: 8px;
`;
