import React, { useState } from "react";
import axios from "axios";

function ImageSubmit() {
  const [images, setImages] = useState<string[]>([]);

  const handleImageUpload = async () => {
    try {
      if (images.length > 0) {
        const formData = new FormData();

        for (const image of images) {
          formData.append("images", image);
        }

        // 이미지를 업로드하는 Axios 요청 (서버 측 엔드포인트 필요)
        const response = await axios.post("your_upload_endpoint", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status === 200) {
          // 이미지가 업로드되고 성공적으로 처리된 경우
          console.log("이미지 업로드 성공!");
        } else {
          // 업로드 실패한 경우
          console.error("이미지 업로드 실패");
        }
      }
    } catch (error) {
      console.error("이미지 업로드 중 오류 발생", error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;

    if (selectedFiles) {
      const newImages: string[] = [];

      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        if (file && i < 3) {
          const reader = new FileReader();

          reader.onload = e => {
            if (e.target) {
              newImages.push(e.target.result as string);
              if (i === selectedFiles.length - 1) {
                // 마지막 파일 로딩이 완료되면 상태 업데이트
                setImages(newImages);
              }
            }
          };

          // 파일 읽기 시작
          reader.readAsDataURL(file);
        }
      }
    }
  };

  return (
    <div>
      <h1>이미지 업로드 및 미리보기 (최대 3개)</h1>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
      />
      {images.length > 0 && (
        <div>
          <h2>미리보기</h2>
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`미리보기 ${index + 1}`}
              style={{ maxWidth: "100%", maxHeight: "300px" }}
            />
          ))}
        </div>
      )}
      <button onClick={handleImageUpload}>이미지 업로드</button>
    </div>
  );
}

export default ImageSubmit;
