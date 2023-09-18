import React, { useEffect, useState } from "react";
import styled from "styled-components";

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
  const [open, setOpen] = useState(false);
  const handleRegionSelect = (regionName: string | null) => {
    setSelectedRegion(regionName);
    setOpen(false);
    onRegionSelect(regionName); // 선택된 지역을 부모 컴포넌트로 전달
  };

  return (
    <PageListContainer>
      <PageContainer>
        <AreaListButton onClick={() => setOpen(true)}>
          {selectedRegion}
        </AreaListButton>
        {open && (
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
      </PageContainer>
    </PageListContainer>
  );
}

export default AreaSubmit;

const PageListContainer = styled.div`
  text-align: left;
`;

const PageContainer = styled.div`
  text-align: left;
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
  color: white;
  border-radius: 8px;
`;

const AreaContainer = styled.div`
  background-color: white;
  padding: 12px 20px;
  display: grid;
  flex-wrap: wrap;
  border-radius: 4px;
  justify-content: flex-end;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: 8px;
  border: 1px solid #595959;
`;

const AreaSListButton = styled.button`
  color: black;
  background-color: white;
  font-size: 12px;
  padding: 4px 8px;
  border: 1px solid gray;
  cursor: pointer;
  border-radius: 4px;
  margin-top: 8px;
  height: 28px;
`;
