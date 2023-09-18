import React, { useState } from "react";
import styled from "styled-components";
import CareHistory from "./CareHistory";
import DepositedHistory from "./DepositedHistory";

const BookingHistory = () => {
  const [selectedTab, setSelectedTab] = useState("care");

  const handleTabClick = tab => {
    setSelectedTab(tab);
  };

  return (
    <Container>
      <Title>예약 내역</Title>
      <Tabs>
        <TabButton
          onClick={() => handleTabClick("care")}
          selected={selectedTab === "care"}
        >
          맡긴 내역
        </TabButton>
        <TabButton
          onClick={() => handleTabClick("deposited")}
          selected={selectedTab === "deposited"}
        >
          케어 내역
        </TabButton>
      </Tabs>
      <Separator />
      {selectedTab === "care" ? <DepositedHistory /> : <CareHistory />}
    </Container>
  );
};

export default BookingHistory;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  font-size: 28px;
  margin-bottom: 52px;
`;

const Tabs = styled.div`
  display: flex;
  justify-content: center;
  gap: 80px;
  margin-bottom: 8px;
`;

const TabButton = styled.button<{ selected: boolean }>`
  padding: 10px 20px;
  background-color: transparent;
  border: none;
  color: ${props => (props.selected ? "#000" : "#A4A4A4")};
  cursor: pointer;
  font-size: 20px;
`;
const Separator = styled.div`
  height: 1px;
  background-color: #ccc;
  margin-bottom: 8px;
`;
