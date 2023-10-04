import React, { useState } from "react";
import styled from "styled-components";

import { useNavigate } from "react-router-dom";

function MainButton() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("accessToken"),
  );

  const moveToWrite = () => {
    if (!isLoggedIn) {
      navigate("/login"); // 로그인되어 있지 않은 경우 로그인 페이지로 이동
    } else {
      navigate("/mainPage"); // 로그인되어 있는 경우 메인 페이지로 이동
    }
  };

  return <CustomButtom onClick={moveToWrite}>예약하기</CustomButtom>;
}

export default MainButton;

const CustomButtom = styled.button`
  background-color: #279eff;
  color: white;
  font-size: 12px;
  padding: 8px 12px;
  position: relative;
  bottom: 250px;
  width: 80px;
  left: 40px;
  border: 2px solid #279eff;
  cursor: pointer;
  @media (max-width: 430px) {
    bottom: 150px;
  }
`;
