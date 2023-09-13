import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

interface AreaSubmitProps {
  onRegionSelect: (regionName: string | null) => void;
}

function AreaSubmit({ onRegionSelect }: AreaSubmitProps) {
  const regions = [
    "서울",
    "경기",
    "인천",
    "강원",
    "제주",
    "광주",
    "충북",
    "충남",
    "부산",
    "울산",
    "경남",
    "대구",
    "경북",
    "전남",
    "전북",
  ];

  const [selectedRegion, setSelectedRegion] = useState<string | null>(
    "지역검색",
  );

  const handleRegionSelect = (regionName: string | null) => {
    setSelectedRegion(regionName);
    onRegionSelect(regionName); // 선택된 지역을 부모 컴포넌트로 전달
  };

  return (
    <div>
      <AreaContentText>지역 선택</AreaContentText>
      <div>
        <AreaListButton onClick={() => handleRegionSelect("지역검색")}>
          {selectedRegion === "지역검색" ? "지역검색" : selectedRegion}
        </AreaListButton>
        {selectedRegion === "지역검색" && (
          <AreaContainer>
            {regions.map(region => (
              <AreaSListButton
                key={region}
                onClick={() => handleRegionSelect(region)}
                className={selectedRegion === region ? "selected" : ""}
              >
                {region}
              </AreaSListButton>
            ))}
          </AreaContainer>
        )}
      </div>
    </div>
  );
}

export default AreaSubmit;

const AreaContentText = styled.div`
  font-size: 20px;
  margin-bottom: 12px;
  margin-top: 40px;
`;

const AreaListButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 12px 16px;
  text-align: left;
  background-color: #279eff;
  border: none;
  cursor: pointer;
  border-bottom: 1px solid #ccc;
`;

const AreaSListButton = styled.button`
  color: black;
  background-color: white;
  font-size: 12px;
  padding: 4px 8px;
  position: relative;
  margin-left: 24px;
  top: 10px;
  width: 50px;
  border: 2px solid #279eff;
  cursor: pointer;
  margin-top: 8px;
`;

const AreaContainer = styled.div`
  background-color: black;
  padding: 36px;
`;
