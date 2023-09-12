import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PostForm from "./WritPostForm";
import ImageSubmit from "./ImageSubmit";
import AreaSubmit from "./AreaSubmit";

function WritePost() {
  const [step, setStep] = useState(1);
  const [post, setPost] = useState({
    title: "",
    content: "",
    images: "",
    wcTag: "",
    animalTag: "",
    areaTag: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false); // 추가
  const [images, setImages] = useState<string[]>([]);

  const navigate = useNavigate();

  const StepChange = newStep => {
    setStep(newStep);
  };

  const handleImageChange = (newImages: string[]) => {
    setImages(newImages);
    setPost({
      ...post,
      images: newImages.join(","),
    });
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

  const Submit = async () => {
    if (isSubmitting) return; // 이미 제출 중이라면 중복 제출 방지
    setIsSubmitting(true); // 제출 중으로 표시

    try {
      const apiUrl = "https://d92e-121-162-236-116.ngrok-free.app/wcboard"; // 실제 API 엔드포인트로 대체해야 합니다.
      console.log(
        post.images,
        post.wcTag,
        post.title,
        post.animalTag,
        post.content,
        post.areaTag,
        post.images,
      );
      const response = await axios.post(apiUrl, post, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Accept: "application/json",
          "ngrok-skip-browser-warning": "69420",
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
        handleImageChange={handleImageChange} // handleImageChange 함수 전달
        images={images}
      />
    </div>
  );
}

export default WritePost;
