import React, { useState } from "react";
import styled from "styled-components";

interface AreaSubmitProps {
  onRegionSelect: (regionName: string | null) => void;
}

function AreaSubmit({ onRegionSelect }: AreaSubmitProps) {
  const [regions, setRegions] = useState([
    {
      name: "인천",
    },
    {
      name: "서울",
    },
    {
      name: "광주",
    },
    {
      name: "충남",
    },
    {
      name: "충북",
    },
  ]);

  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const handleRegionSelect = (regionName: string | null) => {
    setSelectedRegion(regionName);
    onRegionSelect(regionName); // 선택된 지역을 부모 컴포넌트로 전달
  };

  return (
    <div>
      <AreaContentText>지역 선택</AreaContentText>
      <div>
        <AreaListButton onClick={() => handleRegionSelect("지역")}>
          {selectedRegion === "지역" ? "지역" : selectedRegion}
        </AreaListButton>
        {selectedRegion === "지역" && (
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
  margin-top: 12px;
`;

const AreaListButton = styled.button`
  color: black;
  background-color: white;
  font-size: 12px;
  padding: 8px 12px;
  position: relative;
  margin-left: 40px;
  top: 10px;
  width: 410px;
  border: 2px solid #279eff;
  cursor: pointer;
`;

const AreaSListButton = styled.button`
  color: black;
  background-color: white;
  font-size: 12px;
  padding: 4px 8px;
  position: relative;
  margin-left: 40px;
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
