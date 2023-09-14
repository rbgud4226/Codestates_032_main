import React, { useRef, useEffect, useState } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import styled from "styled-components";

interface TimeSelectorProps {
  inputRef: React.RefObject<HTMLInputElement>;
  onTimeChange: (selectedTime: string) => void; // onTimeChange 추가
}

function TimeSelector({ inputRef }: TimeSelectorProps) {
  useEffect(() => {
    let picker: flatpickr.Instance | null = null;

    if (inputRef.current) {
      picker = flatpickr(inputRef.current, {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
        time_24hr: true,
        defaultDate: "09:00",
      });
    }

    return () => {
      if (picker) {
        picker.destroy();
      }
    };
  }, [inputRef]);

  return (
    <InputBox
      ref={inputRef}
      className="timeSelector"
      placeholder="9:00"
      type="text"
    />
  );
}

function Pickr() {
  const startDateInputRef = useRef<HTMLInputElement | null>(null);
  const endDateInputRef = useRef<HTMLInputElement | null>(null);
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");

  useEffect(() => {
    const dateSelector = document.querySelector(".dateSelector");

    if (dateSelector) {
      flatpickr(dateSelector, {
        mode: "range",
        minDate: "today",
        dateFormat: "Y-m-d",
        disable: [
          function (date) {
            return !(date.getDate() % 8);
          },
        ],
        onChange: (selectedDates, selectedDateStr) => {
          if (selectedDates.length === 2) {
            const [start, end] = selectedDateStr.split(" to ");
            setStartTime(start);
            setEndTime(end);
          }
        },
      });
    }
  }, []);

  const handleStartTimeChange = (selectedTime: string) => {
    setStartTime(selectedTime);
  };

  const handleEndTimeChange = (selectedTime: string) => {
    setEndTime(selectedTime);
    const apiPayload = {
      startTime,
      endTime,
    };
    console.log("API로 전송할 데이터:", apiPayload);
  };

  return (
    <PageContainer>
      <SectionContainer>
        <InputBox
          className="dateSelector"
          type="text"
          placeholder="날짜"
          ref={startDateInputRef}
        />
      </SectionContainer>
      <DailyContainer>
        <SectionTitle>시작시간 </SectionTitle>
        <SectionTitle>종료시간 </SectionTitle>
      </DailyContainer>
      <SectionContainer>
        <TimeSelector
          inputRef={startDateInputRef}
          onTimeChange={handleStartTimeChange}
        />
        <TimeSelector
          inputRef={endDateInputRef}
          onTimeChange={handleEndTimeChange}
        />
      </SectionContainer>
    </PageContainer>
  );
}
export default Pickr;

const PageContainer = styled.div`
  text-align: left;
`;
const SectionContainer = styled.div`
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
