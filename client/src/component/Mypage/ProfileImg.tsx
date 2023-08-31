import React from "react";
import styled from "styled-components";
import profileImage1 from "../../asset/ProfileAsset/ProfileImage1.png";
import profileImage2 from "../../asset/ProfileAsset/ProfileImage2.png";
import profileImage3 from "../../asset/ProfileAsset/ProfileImage3.png";
import profileImage4 from "../../asset/ProfileAsset/ProfileImage4.png";
import profileImage5 from "../../asset/ProfileAsset/ProfileImage5.png";
import profileImage6 from "../../asset/ProfileAsset/ProfileImage6.png";
import profileImage7 from "../../asset/ProfileAsset/ProfileImage7.png";
import profileImage8 from "../../asset/ProfileAsset/ProfileImage8.png";
import profileImage9 from "../../asset/ProfileAsset/ProfileImage9.png";
import profileImage10 from "../../asset/ProfileAsset/ProfileImage10.png";
import profileImage11 from "../../asset/ProfileAsset/ProfileImage11.png";
import profileImage12 from "../../asset/ProfileAsset/ProfileImage12.png";
import profileImage13 from "../../asset/ProfileAsset/ProfileImage13.png";
import profileImage14 from "../../asset/ProfileAsset/ProfileImage14.png";
import profileImage15 from "../../asset/ProfileAsset/ProfileImage15.png";
import profileImage16 from "../../asset/ProfileAsset/ProfileImage16.png";
import profileImage17 from "../../asset/ProfileAsset/ProfileImage17.png";
import profileImage18 from "../../asset/ProfileAsset/ProfileImage18.png";
const ProfileImg = () => {
  const profileImages = [
    profileImage1,
    profileImage2,
    profileImage3,
    profileImage4,
    profileImage5,
    profileImage6,
    profileImage7,
    profileImage8,
    profileImage9,
    profileImage10,
    profileImage11,
    profileImage12,
    profileImage13,
    profileImage14,
    profileImage15,
    profileImage16,
    profileImage17,
    profileImage18,
  ];

  const randomProfileImage =
    profileImages[Math.floor(Math.random() * profileImages.length)];
  return <Img src={randomProfileImage} alt="Random Profile" />;
};

export default ProfileImg;

const Img = styled.img`
  width: 100%; /* 이미지의 너비를 조절 */
  height: 100%; /* 이미지의 높이를 조절 */
`;
