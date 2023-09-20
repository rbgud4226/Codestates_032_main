import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import global from "../Data/global";
import styled from "styled-components";
import SitterDetailModal from "../component/Modal/SitterInfoModal";

const api = process.env.REACT_APP_DB_HOST;
const accessToken = localStorage.getItem("accessToken");
const ngrokSkipBrowserWarning = "69420";
const memberId = Number(localStorage.getItem("memberId"));

interface T {
  petSitterImage: string;
  name: string;
  nowJob: string;
  smoking: string;
  phone: string;
  email: string;
  exAnimal: Array<string>;
  info: string;
  petSitterId: number;
}

const PostDetailPage = () => {
  const { wcboardId } = useParams();
  const [post, setPost] = useState(null);
  const [applyErrMsg, setApplyErrMsg] = useState("");
  const [sitterList, setSitterList] = useState<Array<T>>([]);
  const [isWriter, setIsWriter] = useState(false); //글작성자인지 확인하는 변수

  //본문과 신청자 리스트를 가져옴
  useEffect(() => {
    const fetchData = async () => {
      //본문info
      try {
        const response = await axios.get(`${api}/wcboard/${wcboardId}`, {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            Accept: "application/json",
            "ngrok-skip-browser-warning": "69420",
          },
        });
        console.log(response.data);
        setPost(response.data);
        setIsWriter(memberId === response.data.memberId);
        console.log(response.data.postStatus);
        //시터리스트
        try {
          const response = await axios.get(`${api}/submit/${wcboardId}`, {
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
              Accept: "application/json",
              "ngrok-skip-browser-warning": "69420",
            },
          });
          console.log(response.data);
          setSitterList(response.data);
        } catch (error) {
          console.error("API 요청 중 오류 발생:", error);
        }
      } catch (error: any) {
        console.error("API 요청 중 오류 발생:", error);
        setApplyErrMsg(error.response.data);
      }
    };

    fetchData();
  }, [wcboardId]);

  if (!post) {
    return <p>Loading...</p>;
  }
  //에니멀태그 정리
  const animalTagHdr = el => {
    const temp = el.split(",").join(" ");
    return temp;
  };

  //신청하기 함수

  const applyHdr = async () => {
    try {
      await axios.post(`${api}/submit/${wcboardId}`, null, {
        headers: {
          Authorization: `${accessToken}`,
          Accept: "application/json",
          "ngrok-skip-browser-warning": ngrokSkipBrowserWarning,
        },
      });
      alert("신청되었습니다."); //임시확인용
    } catch (e: any) {
      console.log(e.response.data);
      setApplyErrMsg(e.response.data);
    }
  };

  //글삭제
  const deleteHdr = async () => {
    //아직 완성된거 아님. 유효성 검사 필요함. 글쓴이와 삭제버튼을 누른사람이 같은지를확인할
    try {
      await axios.delete(`${api}/wcboard/${wcboardId}`, {
        headers: {
          Authorization: `${accessToken}`,
          Accept: "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
      });
      window.location.href = "/mainpage";
    } catch (e) {
      console.log(e);
    }
  };

  //날짜 포멧함수
  function formatDate(longDateStr) {
    const longDate = new Date(longDateStr); // 입력된 문자열을 Date 객체로 파싱합니다.
    // 월과 일을 추출합니다.
    const month = String(longDate.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 1을 더하고 두 자릿수로 포맷팅합니다.
    const day = String(longDate.getDate()).padStart(2, "0"); // 일도 두 자릿수로 포맷팅합니다.
    // 월과 일을 조합하여 결과를 반환합니다.
    const formattedDateStr = `${month}월${day}일`;
    return formattedDateStr;
  }

  //시간 포멧 함수
  function extractTime(longDateStr) {
    const timePart = longDateStr.split(" ")[1].split(":").slice(0, 2).join(":");
    return timePart;
  }

  //채팅방에 들어감.
  const chatRoomHdr = async () => {
    try {
      const roomId = localStorage.getItem("roomId");
      const res = await axios.get(`${api}/chat/${wcboardId}`, {
        headers: {
          Authorization: `${localStorage.getItem("accessToken")}`,
          Accept: "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
      });
      console.log(res.data);
      if (isWriter) {
        const [sitter] = sitterList.filter(
          el =>
            el.petSitterId === Number(localStorage.getItem("otherPetSitterId")),
        );
        localStorage.setItem("sitterProfileImage", sitter.petSitterImage);
        localStorage.setItem("sitterName", sitter.name);
        localStorage.setItem("sitterEmail", sitter.email);
        localStorage.setItem("sitterPhone", sitter.phone);
      } else {
        //작성자프로필을 불러올방법이 없음.
        localStorage.setItem("clientNickName", post.nickName);
      }

      window.location.href = `/chat/${roomId}`;
    } catch (e: any) {
      console.log(e);
    }
  };

  //주소잘못됨 이거아님.
  const editHdr = () => {
    window.location.href = "/petsitter/edit";
  };

  return (
    <PDCtn>
      <Logo src={"/Logo.png"} />
      <PostSection>
        <TitleCtn>
          <TagCtn>
            {`#${post.areaTag} #${post.wcTag} #${animalTagHdr(post.animalTag)}`}
          </TagCtn>
          <TitleText>{post.title}</TitleText>
          <NickDateCtn>
            <NickSpan>{post.nickName}</NickSpan>
            <DateSpan>{post.createdAt.replace("T", " ").slice(0, -3)}</DateSpan>
          </NickDateCtn>
        </TitleCtn>
        <ContentCtn>
          <BtnCtn>
            <ContentBtn style={{ marginRight: "8px" }}>수정 </ContentBtn>
            <span
              style={{ color: `${global.Gray[4].value}`, marginRight: "8px" }}
            ></span>
            <ContentBtn onClick={deleteHdr}>삭제</ContentBtn>
          </BtnCtn>
          <MainContent>{post.content}</MainContent>
        </ContentCtn>
        <DateInfoText>
          {post.startTime
            ? `날짜 ${formatDate(post.startTime)}`
            : `날짜 : 입력되지않음`}
        </DateInfoText>
        <DateInfoText>
          {post.startTime && post.endTime
            ? `시간 ${extractTime(post?.startTime)}-${extractTime(
                post?.endTime,
              )}`
            : "시간 : 입력되지않음"}
        </DateInfoText>
        <DateInfoText>
          {post.location ? `위치 ${post.location}` : `위치 : 입력되지않음`}
        </DateInfoText>
      </PostSection>
      <ApplyCountCtn>{`신청:(${sitterList.length})`}</ApplyCountCtn>
      {isWriter && !!(post.postStatus === "DEFAULT") ? (
        <SitterListSection>
          {sitterList.map((item, index) => (
            <SitterDetailModal
              key={index}
              item={item}
              isWriter={isWriter}
              wcboardId={Number(wcboardId)}
            ></SitterDetailModal>
          ))}
        </SitterListSection>
      ) : (
        ""
      )}

      {!isWriter ? (
        <div
          style={{
            marginTop: "16px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <RegisterBtn onClick={() => applyHdr()}>신청하기</RegisterBtn>
          {applyErrMsg ? <ErrMsg>{applyErrMsg}</ErrMsg> : ""}
        </div>
      ) : (
        ""
      )}
      {post.postStatus === "IN_RESERVATION" ? (
        <div
          style={{
            marginTop: "16px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <RegisterBtn onClick={() => chatRoomHdr()}>채팅룸입장</RegisterBtn>
        </div>
      ) : (
        ""
      )}
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
  cursor: pointer;
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

const RegisterBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${global.Primary.value};
  color: white;
  font-size: 14px;
  font-weight: 600;
  border-radius: 8px;
  width: 120px;
  height: 36px;
  border: 0px;
  cursor: pointer;
  &:active {
    outline: none;
    background-color: ${global.PrimaryActive.value};
  }
`;

const ErrMsg = styled.div`
  margin-top: 4px;
  color: #ff2727;
  font-size: 10px;
  margin-bottom: 6px;
`;
