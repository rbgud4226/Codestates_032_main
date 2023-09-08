import React from "react";
import styled from "styled-components";
const ProfileImg = () => {
  const random = Math.floor(Math.random() * 18);
  return (
    <Img src={`/ProfileAsset/ProfileImage${random}.png`} alt="Random Profile" />
  );
};

export default ProfileImg;

const Img = styled.img`
  width: 100%;
  height: 100%;
`;
