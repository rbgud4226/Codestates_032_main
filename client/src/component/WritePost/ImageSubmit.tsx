import React, { useState } from "react";
import axios from "axios";

interface ImageSubmitProps {
  handleImageChange: (newImages: string[]) => void;
  images: string[];
}

function ImageSubmit({ handleImageChange, images }: ImageSubmitProps) {
  const [file, setFile] = useState(null);

  const handleFileChange = e => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("파일을 선택해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      // 이미지를 업로드할 백엔드 API 엔드포인트 URL을 여기에 입력하세요.
      const response = await axios.post("백엔드_API_URL", formData);

      if (response.status === 200) {
        alert("이미지 업로드 성공!");
        // 성공적으로 이미지를 업로드한 후 원하는 작업을 수행하세요.
      } else {
        alert("이미지 업로드 실패");
      }
    } catch (error) {
      console.error("이미지 업로드 오류:", error);
      alert("이미지 업로드 중 오류가 발생했습니다.");
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
    </div>
  );
}

export default ImageSubmit;
