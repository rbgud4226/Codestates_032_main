import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MainImage1 from "../asset/MainImage/MainImage1.png";
import MainLogo from "../asset/MainImage/MainLogo.png";
import MainImage2 from "../asset/MainImage/MainImage2.png";
import MainImage3 from "../asset/MainImage/MainImage3.png";
import MainImage4 from "../asset/MainImage/MainImage4.png";

interface MainProps {
  propertyName: string;
  // 필요한 프로퍼티 타입 정의
}

const Container = styled.div``;

const MainImage = styled.img`
  max-width: 100%;
  height: auto;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  margin: 0px auto; /*중앙정렬*/
`;

const MainImageWithMargin = styled(MainImage)`
  margin-bottom: 380px; /* 사진 3과 4의 간격 조절 */
`;

function MainForm(props: MainProps) {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const imageUrls = [
      MainImage1,
      MainLogo,
      MainImage2,
      MainImage3,
      MainImage4,
    ];
    setImages(imageUrls);
  }, []);

  return (
    <Container>
      {images.map((imageUrl, index) => (
        <div key={index}>
          {imageUrl === MainLogo && index === 0 ? (
            <img src={imageUrl} alt={`Image ${index + 1}`} />
          ) : imageUrl === MainImage1 ? (
            <MainImage src={imageUrl} alt={`Image ${index + 1}`} />
          ) : (
            <MainImageWithMargin src={imageUrl} alt={`Image ${index + 1}`} />
          )}
        </div>
      ))}
    </Container>
  );
}
export default MainForm;
