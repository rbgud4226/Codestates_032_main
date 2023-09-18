import React, { useState, useRef, Dispatch, SetStateAction } from "react";
import { uploadImageFile } from "./utils";
import styled from "styled-components";

interface InputImageProps {
  setImage: Dispatch<SetStateAction<File | null>>;
  inputRef: React.RefObject<HTMLInputElement>;
}
interface UploadImageProps {
  handleImageChange: (newImages: string[]) => void;
  images: string[];
  onClick?: () => void;
  children?: React.ReactNode;
}

function UploadImage({ handleImageChange, images }: UploadImageProps) {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const inputImageRef = useRef<HTMLInputElement | null>(null);

  const onClearInput = () => {
    if (inputImageRef.current) {
      inputImageRef.current.value = "";
    }
  };

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedImage = event.target.files[0];
      setImage(selectedImage);

      const reader = new FileReader();
      reader.onload = e => {
        if (e.target && typeof e.target.result === "string") {
          setImagePreview(e.target.result);
        }
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  const onClick = async () => {
    try {
      setLoading(true);
      if (image) {
        await uploadImageFile(image);
        alert("피드백 전송을 성공했습니다.");
      } else {
        throw new Error("이미지가 선택되지 않았습니다.");
      }
    } catch (e) {
      alert("피드백 전송에 실패했습니다.");
    } finally {
      setLoading(false);
      onClearInput();
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        ref={inputImageRef}
        onChange={onImageChange}
      />
      {imagePreview && (
        <img src={imagePreview} alt="미리보기" style={{ maxWidth: "100%" }} />
      )}
      <ImageContai className="flex justify-end">
        <ImageButton onClick={onClick} disabled={loading}>
          {loading ? "업로딩 중..." : "이미지 "}
        </ImageButton>
      </ImageContai>
    </div>
  );
}

export default UploadImage;

const InputImage = styled.input<InputImageProps>``;
const ImageContai = styled.div`
  text-align: center;
`;
const ImageButton = styled.button`
  color: white;
  background-color: #279eff;
  border: 1px solid #279eff;
  width: 120px;
  height: 44px;
  border-radius: 8px;
  padding: 8px 16px;
  cursor: pointer;
  justify-content: space-around;
  font-size: 16px;
  margin-top: 48px;
`;
