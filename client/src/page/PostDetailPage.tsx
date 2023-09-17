import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import global from "../Data/global";
import styled from "styled-components";
import LargeBtn from "../component/Button/LargeCheckBtn";
import SitterDetailModal from "../component/Modal/SitterDetailModal";

const api = process.env.REACT_APP_DB_HOST;

interface T {
  profileImage: string;
  name: string;
  nowJob: string;
  smoking: string;
  phone: string;
  email: string;
  exAnimal: Array<string>;
  info: string;
}

const PostDetailPage = () => {
  const { wcboardId } = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const [post, setPost] = useState(null);
  const [sitterList, setSitterList] = useState<Array<T>>([
    {
      profileImage: "https://i.imgur.com/d67J76L.png",
      name: "아무개",
      nowJob: "프로그래머",
      smoking: "비흡연자 ",
      phone: "01012345678",
      email: "asdf@gmail.com ",
      exAnimal: ["개"],
      info: "잘할수 있을까요?",
    },
    {
      profileImage: "https://i.imgur.com/BNU6iSc.png",
      name: "홍길동",
      nowJob: "동물훈련가",
      smoking: "흡연자",
      phone: "01087654321",
      email: "qwer@gmail.com",
      exAnimal: ["개", "고양이", "기타"],
      info: "12년차 베테랑 조교입니다.",
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${api}/wcboard/${wcboardId}`, {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            Accept: "application/json",
          },
        });
        console.log(response.data);
        setPost(response.data);
      } catch (error) {
        console.error("API 요청 중 오류 발생:", error);
      }
    };

    fetchData();
  }, [wcboardId]);

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <PDCtn>
      <Logo src={"/Logo.png"} />
      <PostSection>
        <TitleCtn>
          <TagCtn>
            {`#${post.areaTag} #${post.wcTag} #${post.animalTag}`}
          </TagCtn>
          <TitleText>{post.title}</TitleText>
          <NickDateCtn>
            <NickSpan>{post.nickName}</NickSpan>
            <DateSpan>{post.createdAt}</DateSpan>
          </NickDateCtn>
        </TitleCtn>
        <ContentCtn>
          <BtnCtn>
            <ContentBtn style={{ marginRight: "8px" }}>수정 </ContentBtn>
            <span
              style={{ color: `${global.Gray[4].value}`, marginRight: "8px" }}
            ></span>
            <ContentBtn>삭제</ContentBtn>
          </BtnCtn>
          <MainContent>{post.content}</MainContent>
        </ContentCtn>
        {/* <DateInfoText>{"날짜  9월16일"}</DateInfoText>
        <DateInfoText>{"시간  09:00-11:00"}</DateInfoText> */}
        <DateInfoText>{`날짜 ${post.start}`}</DateInfoText>
        <DateInfoText>{`시간 ${post.start}-${post.end}`}</DateInfoText>
        <DateInfoText>{"위치  관악구신사로"}</DateInfoText>
        {/* <DateInfoText>{`위치  ${post.}`}</DateInfoText> */}
        {/* 여긴 createdAt이 어떻게 들어올지 감이 안잡혀서 아직 못정함. api명세서에 상세주소가 없음.*/}
      </PostSection>
      <ApplyCountCtn>{`신청:(${sitterList.length})`}</ApplyCountCtn>
      <SitterListSection>
        {sitterList.map((item, index) => (
          <SitterDetailModal
            key={index}
            item={item}
            index={index}
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
          ></SitterDetailModal>
        ))}
      </SitterListSection>
      <div style={{ width: "120px", marginTop: "16px" }}>
        <LargeBtn name={"신청하기"} />
      </div>
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
//수정 삭제가 구현되면 고쳐야됨. 수정은 link로 삭제는 api주소에 삭제요청보내고 예약글페이지로 가야함.
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
