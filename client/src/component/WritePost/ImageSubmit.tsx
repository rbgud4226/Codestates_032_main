import React, { useState } from "react";
import axios from "axios";

interface ImageSubmitProps {
  handleImageChange: (newImages: string[]) => void;
  images: string[];
}

function ImageSubmit({ handleImageChange, images }: ImageSubmitProps) {
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  // Create a new event handler for the file input
  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      // Convert the selected files to an array of URLs for preview
      const selectedFileURLs = Array.from(selectedFiles).map(file =>
        URL.createObjectURL(file),
      );
      setPreviewImages(selectedFileURLs);

      // Call the handleImageChange function with the selected files
      const selectedFileArray = Array.from(selectedFiles).map(file =>
        URL.createObjectURL(file),
      );
      handleImageChange(selectedFileArray);
    }
  };

  const handleImageUpload = async () => {
    try {
      if (images.length > 0) {
        const formData = new FormData();

        for (const image of images) {
          formData.append("images", image);
        }

        // Your image upload Axios request here...
      }
    } catch (error) {
      console.error("이미지 업로드 중 오류 발생", error);
    }
  };

  return (
    <div>
      {/* 컴포넌트 내에서 uploadedImages를 사용하여 업로드된 이미지를 표시 */}
      {uploadedImages.length > 0 && (
        <div>
          <h2>업로드된 이미지</h2>
          {uploadedImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`업로드된 이미지 ${index + 1}`}
              style={{ maxWidth: "100%", maxHeight: "300px" }}
            />
          ))}
        </div>
      )}

      {/* 미리보기 이미지 */}
      {previewImages.length > 0 && (
        <div>
          <h2>미리보기</h2>
          {previewImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`미리보기 ${index + 1}`}
              style={{ maxWidth: "100%", maxHeight: "300px" }}
            />
          ))}
        </div>
      )}

      {/* Use the new event handler for file input */}
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileInputChange}
      />
    </div>
  );
}

export default ImageSubmit;
