import React from "react";
import { fetchData } from "./fetchData";
//일단 로컬스토리지에 저장했지만 이후 바꿀 필요가 있음.
const TokenProvider = async ({ email, password }, setErrorMsg) => {
  const res: any = await fetchData({ email, password }, setErrorMsg);
  //   const data = {
  //     nickName: res.data.nickName,
  //     porfileImage: res.data.profileImage,
  //   };
  localStorage.setItem("nickName", res?.nickName);
  localStorage.setItem("profileImage", res?.profileImage);

  localStorage.setItem("refreshToken", res?.refreshToken);

  localStorage.setItem("accessToken", res?.accessToken);

  console.log(res);
};

export default TokenProvider;
