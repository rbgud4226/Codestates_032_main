import React from "react";
import MyProfile from "../component/Mypage/MyProfile";
import RecentReservation from "../component/Mypage/RecentReservation";
import Petsitter from "../component/Mypage/Petsitter";

const Mypage = () => {
  // 'petSitter'가 등록되었다고 가정 추후 변경
  const isPetSitterRegistered = false;

  return (
    <div>
      <MyProfile />
      <RecentReservation />
      <Petsitter petSitter={isPetSitterRegistered} />
    </div>
  );
};

export default Mypage;
