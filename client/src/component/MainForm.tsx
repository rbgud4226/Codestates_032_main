import React, { useEffect, useState } from "react";
import styled from "styled-components";

import MainImage1 from "../asset/MainAsset/MainImage1.png";
import MainImage2 from "../asset/MainAsset/MainImage2.png";
import MainImage3 from "../asset/MainAsset/MainImage3.png";
import MainImage4 from "../asset/MainAsset/MainImage4.png";

const Container = styled.div`
  padding: 20px; /* 모바일 최소여백 */
  display: flex;
  flex-direction: column;
  align-items: center; /* 가운데 정렬 */
`;

const MainImage = styled.img`
  max-width: 100%;
  height: auto;
  margin-bottom: 200px;
`;

const MainComponent: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const imageUrls = [MainImage1, MainImage2, MainImage3, MainImage4];
    setImages(imageUrls);
  }, []);

  return (
    <Container>
      {images.map((imageUrl, index) => (
        <MainImage key={index} src={imageUrl} alt={`Image ${index + 1}`} />
      ))}
    </Container>
  );
};

export default MainComponent;
