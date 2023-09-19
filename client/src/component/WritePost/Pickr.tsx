import React, { useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Post = {
  startTime: string;
  endTime: string;
};

interface ReservationPageProps {
  post: Post;
  InputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  StepChange: (newStep: number) => void;
  Submit: (startTime: string, endTime: string) => void; // startTime과 endTime 추가
}
export default function ReservationPage({
  post,
  InputChange,
  StepChange,
  Submit,
}: ReservationPageProps) {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleSubmit = () => {
    if (startDate && endDate) {
      const startTime = startDate.toISOString();
      const endTime = endDate.toISOString();
      Submit(startTime, endTime); // startTime과 endTime을 함께 전달
    }
  };

  return (
    <PageListContainer>
      <div>
        <SectionTitle>시작 시간</SectionTitle>
        <CustomDatePicker
          selected={startDate}
          onChange={(date: Date | null) => setStartDate(date)}
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
        <button onClick={handleSubmit}>예약 시간 선택 완료</button>
      </SectionButtonContainer>
    </PageListContainer>
  );
}

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
const PageContainer = styled.div`
  text-align: left;
`;
const PageListContainer = styled.div`
  text-align: left;
`;
const SectionButtonContainer = styled.div`
  margin-bottom: 32px;
`;

const DailyContainer = styled.div`
  margin-bottom: 16px;
  display: flex;
`;

const InputBox = styled.input`
  border: 1px solid #279eff;
  width: 200px;
  height: 44px;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  margin-left: 4px;
  font-size: 16px;
`;
const SectionTitle = styled.div`
  font-size: 20px;
  margin-right: 130px;
`;
const CustomDatePicker = styled(DatePicker)`
  input {
    width: 200px; 
    height: 40px; 
    font-size: 16px; /

  }
`;
