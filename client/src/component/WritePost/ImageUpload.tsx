import React from "react";

interface InputImageProps {
  setImage: (file: File | null) => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

function InputImage({ setImage, inputRef }: InputImageProps) {
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  return (
    <input
      type="file"
      accept="image/*"
      onChange={handleFileInput}
      ref={inputRef}
    />
  );
}

export default InputImage;
