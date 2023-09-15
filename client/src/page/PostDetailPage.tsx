import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import global from "../Data/global";
import styled from "styled-components";

const api = process.env.REACT_APP_DB_HOST;

interface T {
  profileImage: string;
  name: string;
  nowJob: string;
  isSmoking: string;
}

const PostDetailPage = () => {
  const { wcboardId } = useParams();
  const [post, setPost] = useState(null);
  const [applyList, setApplyList] = useState<Array<T>>([
    {
      profileImage: "https://i.imgur.com/d67J76L.png",
      name: "아무개",
      nowJob: "프로그래머",
      isSmoking: "비흡연자 ",
    },
    {
      profileImage: "https://i.imgur.com/BNU6iSc.png",
      name: "홍길동",
      nowJob: "동물훈련가",
      isSmoking: "흡연자",
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${api}/wcboard/${wcboardId}`, {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            Accept: "application/json",
            "ngrok-skip-browser-warning": "69420",
          },
        });
        console.log(response.data);
        setPost(response.data); // 여기에서 .data를 사용하여 데이터를 가져옵니다.
      } catch (error) {
        console.error("API 요청 중 오류 발생:", error);
      }
    };

    fetchData();
  }, [wcboardId]);

  // if (!post) {
  //   return <p>Loading...</p>;
  // }

  return (
    <PDCtn>
      <Logo src={"/Logo.png"} />
      <PostSection>
        <TitleCtn>
          <TagCtn>
            {"#서울 #산책 #강아지"}
            {/*`#${post.areaTag} #${post.wcTag} #${post.animalTag}*/}
          </TagCtn>
          <TitleText>
            {"강아지 산책시킬분 구합니다"}
            {/*post.title*/}
          </TitleText>
          <NickDateCtn>
            <NickSpan>닉네임</NickSpan>
            <DateSpan>2023.08.25 13:24</DateSpan>
            {/* {<NickSpan>{post.nickName}</NickSpan><DateSpan>{post.createdAt}</DateSpan>} */}
          </NickDateCtn>
        </TitleCtn>
        <ContentCtn>
          <BtnCtn>
            <ContentBtn style={{ marginRight: "8px" }}>수정 </ContentBtn>
            <span
              style={{ color: `${global.Gray[4].value}`, marginRight: "8px" }}
            >
              |{" "}
            </span>
            <ContentBtn>삭제</ContentBtn>
          </BtnCtn>
          <MainContent>
            {/* {post.content} */}
            {
              "본문임시 내용입니다 동해물과 백두산이 만르고닳도록 ㅇㄴㄹ망러ㅣ마ㅓㅇ리ㅏ머리ㅏㅓㅇㄴ미ㅏ러미럼ㄴ이ㅏ러"
            }
          </MainContent>
        </ContentCtn>
        <DateInfoText>{"날짜  9월16일"}</DateInfoText>
        <DateInfoText>{"시간  09:00-11:00"}</DateInfoText>
        <DateInfoText>{"위치  관악구신사로"}</DateInfoText>
        {/* <DateInfoText>{`날짜 ${post.start}`}</DateInfoText>
        <DateInfoText>{`시간 ${post.start}-${post.end}`}</DateInfoText>
        <DateInfoText>{`위치  ${post.}`}</DateInfoText> */}
        {/* 여긴 createdAt이 어떻게 들어올지 감이 안잡혀서 아직 못정함. api명세서에 상세주소가 없음.*/}
      </PostSection>
      <ApplyCountCtn>{"신청:(0)"}</ApplyCountCtn>
      <SitterListSection>
        {applyList.map((item, index) => (
          <SitterCtn key={index}>
            <InfoCtn>
              <p>{item.name}</p>
              <p>{item.nowJob}</p>
              <p>{item.isSmoking}</p>
            </InfoCtn>
            <ImgCtn>
              <img
                src={item.profileImage}
                alt="프로필이미지"
                style={{ height: "64px", width: "64px" }}
              ></img>
            </ImgCtn>
          </SitterCtn>
        ))}
      </SitterListSection>
    </PDCtn>
  );
};

export default PostDetailPage;

const PDCtn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
`;

const Logo = styled.img`
  height: 50px;
  width: 60px;
`;

const PostSection = styled.section`
  display: flex;
  flex-direction: column;
  border-radius: ${global.borderRadius[8].value}px;
  border: 1px solid black;
  margin-top: 12px;
  width: 100%;
  padding-bottom: 20px;
`;
const TitleCtn = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${global.Gray[1].value};
`;

const TagCtn = styled.div`
  margin: 15px 0px 0px 20px;
  color: ${global.Primary.value};
  font-weight: ${global.FontWeight[600].value};
`;

const TitleText = styled.h2`
  margin: 8px 0px 0px 20px;
`;

const NickDateCtn = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 8px 20px 12px 20px;
`;

const NickSpan = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: ${global.Gray[4].value};
`;

const DateSpan = styled.span`
  font-size: 12px;
  color: ${global.Gray[4].value};
`;

const ContentCtn = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 12px;
`;

const BtnCtn = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 12px;
`;
const ContentBtn = styled.button`
  color: ${global.Gray[4].value};
  font-size: 12px;
  background-color: ${global.White.value};
  border: 0px;
  &:active {
    outline: none;
  }
`;

const MainContent = styled.div`
  margin: 8px 16px 0px 16px;
  padding-bottom: 20px;
  border-bottom: 1px dashed ${global.Gray[4].value};
`;

const DateInfoText = styled.div`
  margin-top: 12px;
  margin-left: 16px;
  word-spacing: 16px;
`;
const ApplyCountCtn = styled.div`
  margin-top: 12px;
  width: 100%;
  padding-bottom: 4px;
  border-bottom: 1px dashed ${global.Gray[4].value};
`;

//여기서부터  지원자section
const SitterListSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const SitterCtn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 135px;
  width: 100%;
  border-radius: 8px;
  box-shadow: 4px 4px 30px 0px #272c564d;
  margin-top: 20px;
  padding: 15px 28px;
`;
const InfoCtn = styled.div``;

const ImgCtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 102;
  height: 102;
  background-color: ${global.Primary.value};
  border-radius: 50%;
`;
