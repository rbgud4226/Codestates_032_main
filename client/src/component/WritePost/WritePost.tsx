import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PostForm from "./WritPostForm";
import ImageSubmit from "./ImageSubmit";

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

  const navigate = useNavigate();

  const StepChange = newStep => {
    setStep(newStep);
  };

  const InputChange = e => {
    const { name, value } = e.target;
    setPost({
      ...post,
      [name]: value,
    });
  };

  const AreaChange = areaTags => {
    //wc테그
    const { areaTag } = post;
    if (areaTag.includes(areaTags)) {
      const updateAreaTag = areaTag.split(", ").filter(tag => tag !== areaTag);
      setPost({
        ...post,
        areaTag: updateAreaTag.join(", "),
      });
    } else {
      setPost({
        ...post,
        areaTag: [...areaTag.split(", "), areaTags].join(", "),
      });
    }
  };

  const WCTagChange = wcTegs => {
    //wc테그
    const { wcTag } = post;
    if (wcTag.includes(wcTegs)) {
      const updateWcTag = wcTag.split(", ").filter(tag => tag !== wcTegs);
      setPost({
        ...post,
        wcTag: updateWcTag.join(", "),
      });
    } else {
      setPost({
        ...post,
        wcTag: [...wcTag.split(", "), wcTegs].join(", "),
      });
    }
  };

  const AnimalTagChange = animal => {
    const { animalTag } = post;
    if (animalTag.includes(animal)) {
      const updatedAnimalTag = animalTag
        .split(", ")
        .filter(tag => tag !== animal);
      setPost({
        ...post,
        animalTag: updatedAnimalTag.join(", "),
      });
    } else {
      setPost({
        ...post,
        animalTag: [...animalTag.split(", "), animal].join(", "),
      });
    }
  };

  const Submit = async () => {
    try {
      const apiUrl = "https://6b03-121-162-236-116.ngrok-free.app/wcboard"; // 실제 API 엔드포인트로 대체해야 합니다.
      console.log(
        post.images,
        post.wcTag,
        post.title,
        post.animalTag,
        post.content,
        post.areaTag,
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
      />
    </div>
  );
}

export default WritePost;
