import React from "react";
import { useState, useEffect } from "react";
import MyProfile from "../component/Mypage/MyProfile";
import RecentReservation from "../component/Mypage/RecentReservation";
import Petsitter from "../component/Mypage/Petsitter";
import { fetchMyPageData } from "../component/Mypage/MypageService";
import { useNavigate } from "react-router-dom";

const Mypage = () => {
  // const isPetSitterRegistered = false;
  const router = useNavigate();
  const [checkPetSitter, setCheckPetSitter] = useState(false);
  useEffect(() => {
    // Fetch data here and determine the value of checkPetSitter
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      router("/login");
      console.error("accessToken이 없습니다.");
      return;
    }

    // Fetch data and set checkPetSitter based on the response
    fetchMyPageData(accessToken)
      .then(response => {
        setCheckPetSitter(response.checkPetSitter);
      })
      .catch(error => {
        // 삭제하는 로직
        console.error("Error fetching user data:", error);
      });
  }, []);
  return (
    <div>
      <MyProfile />
      <RecentReservation />
      {/* <Petsitter checkPetSitter={isPetSitterRegistered} /> */}
      <Petsitter checkPetSitter={checkPetSitter} />
    </div>
  );
};

export default Mypage;
