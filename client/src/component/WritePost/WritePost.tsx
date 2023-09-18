import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PostForm from "./WritPostForm";
import UploadImage from "./ImageSubmit";

const api = process.env.REACT_APP_DB_HOST;

function WritePost() {
  const [step, setStep] = useState(1);
  const [post, setPost] = useState({
    title: "",
    content: "",
    images: "",
    wcTag: "",
    animalTag: "",
    areaTag: "",
    startTime: "",
    endTime: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false); // 추가
  const [images, setImages] = useState<string[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null); // 이미지 미리보기 추가
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(null); // startDate 초기화
  const [endDate, setEndDate] = useState<Date | null>(null); // endDate 초기화

  const navigate = useNavigate();

  const StepChange = newStep => {
    setStep(newStep);
  };
  // 이미지 업로드 관련 함수
  const handleImageChange = (newImages: string[]) => {
    setUploadedImages([...uploadedImages, ...newImages]);
  };

  const InputChange = e => {
    const { name, value } = e.target;
    setPost({
      ...post,
      [name]: value,
    });
  };

  const AreaChange = AreaTagToToggle => {
    setPost({
      ...post,
      areaTag: AreaTagToToggle, // 마지막으로 클릭한 버튼의 값으로 설정
    });
  };

  const WCTagChange = wcTagToToggle => {
    setPost({
      ...post,
      wcTag: wcTagToToggle, // 마지막으로 클릭한 버튼의 값으로 설정
    });
  };

  const AnimalTagChange = animal => {
    const { animalTag } = post;
    if (animalTag.includes(animal)) {
      const updatedAnimalTag = animalTag
        .split("")
        .filter(tag => tag !== animal);
      setPost({
        ...post,
        animalTag: updatedAnimalTag.join(""),
      });
    } else {
      setPost({
        ...post,
        animalTag: [...animalTag.split(","), animal].join(","),
      });
    }
  };
  const accessToken = localStorage.getItem("accessToken");

  const Submit = async () => {
    if (isSubmitting) return; // 이미 제출 중이라면 중복 제출 방지
    setIsSubmitting(true); // 제출 중으로 표시

    try {
      console.log(
        post.images,
        post.wcTag,
        post.title,
        post.animalTag,
        post.content,
        post.areaTag,
        post.images,
        post.startTime,
        post.endTime,
      );
      const response = await axios.post(`${api}/wcboard`, post, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Accept: "application/json",
          "ngrok-skip-browser-warning": "69420",
          Authorization: `${accessToken}`,
        },
      });

      console.log("서버 응답 데이터:", response.data);

      setStep(1);

      // 글 초기화
      setPost({
        wcTag: "",
        animalTag: "",
        title: "",
        content: "",
        images: "",
        areaTag: "",
        startTime: "",
        endTime: "",
      });

      navigate("/mainPage");
    } catch (error) {
      // 오류 처리 로직을 추가
      console.error("API 요청 오류:", error);
    } finally {
      setIsSubmitting(false); // 제출 완료 후 원래 상태로 복구
    }
  };

  return (
    <div>
      <PostForm
        step={step}
        post={post}
        InputChange={InputChange}
        AnimalTagChange={AnimalTagChange}
        WcTagChange={WCTagChange}
        StepChange={StepChange}
        Submit={Submit}
        AreaChange={AreaChange}
        isSubmitting={isSubmitting}
        handleImageChange={handleImageChange}
        images={images}
        imagePreview={imagePreview}
        startDate={startDate} // startDate 추가
        endDate={endDate}
      />
    </div>
  );
}

export default WritePost;
