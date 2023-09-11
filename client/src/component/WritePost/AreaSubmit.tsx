import React, { useState } from "react";
import styled from "styled-components";

interface AreaSubmitProps {
  onRegionSelect: (regionName: string | null) => void;
}

function AreaSubmit({ onRegionSelect }: AreaSubmitProps) {
  const [regions, setRegions] = useState([
    {
      name: "서울",
    },
    {
      name: "경기",
    },
    {
      name: "인천",
    },
    {
      name: "강원",
    },
    {
      name: "제주",
    },
    {
      name: "광주",
    },
    {
      name: "충북",
    },
    {
      name: "충남",
    },
    {
      name: "부산",
    },
    {
      name: "울산",
    },
    {
      name: "경남",
    },
    {
      name: "대구",
    },
    {
      name: "경북",
    },
    {
      name: "전남",
    },
    {
      name: "전북",
    },
  ]);

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
                key={region.name}
                onClick={() => handleRegionSelect(region.name)}
                className={selectedRegion === region.name ? "selected" : ""}
              >
                {region.name}
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
