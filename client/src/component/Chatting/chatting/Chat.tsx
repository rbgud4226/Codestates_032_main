import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import imgIcon from "../../../asset/ChatAsset/image-icon.png";
import sendIcon from "../../../asset/ChatAsset/message-icon.png";
import SendChatDesign from "./SendChatDesign";
import RecieveChatDesign from "./RecieveChatDesign";
import * as StompJS from "@stomp/stompjs";
import global from "../../../Data/global";
import PersonInfo from "./PersonInfo";
import axios from "axios";

//현재 시간을 xx-xx로 가져오는 함수
const updateCurrentTime = (): string => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  return `${hours}-${minutes}`;
};

const Chat: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [client, setClient] = useState(null);
  const [msgList, setMsgList] = useState([]);
  const connect = () => {
    try {
      const clientData = new StompJS.Client({
        brokerURL: "ws://3.35.193.208:8080/ws-stomp",
        debug: (str: string) => {
          console.log(str);
        },
        reconnectDelay: 100,
      });

      clientData.onConnect = () => {
        clientData.subscribe(`/sub/room/1`, msgGet);
      };
      clientData.activate();
      setClient(clientData);
    } catch (e) {
      console.log(e);
    }
  };

  //연결끊기
  const disconnect = () => {
    client.deactivate();
  };

  //메세지 전달 함수.
  const sendChat = () => {
    if (input.trim() !== "") {
      // const msgForm = {
      //   isClient: true,
      //   message: input,
      //   createAt: updateCurrentTime(),
      // };
      try {
        if (client.connected) {
          client.publish({
            destination: `/pub/1`,
            body: JSON.stringify({
              userType: "신청자",
              message: input,
            }),
          });
        }
      } catch (e) {
        console.log(e);
      }
      setInput("");
    }
  };

  //메세지 리스트 get 함수
  const msgGet = async () => {
    try {
      const msg = await axios.get("http://3.35.193.208:8080/chat/1");
      console.log(msg.data);
      setMsgList(msg.data);
    } catch (e) {
      console.log("오류발생", e);
    }
  };

  useEffect(() => {
    msgGet();
    connect();
  }, []);

  const submitHdr = e => {
    e.preventDefault();
    sendChat();
  };

  const setSendHdr = e => {
    setInput(e.target.value);
  };

  return (
    <MessageSection>
      <InfoMsgCtn>
        <PersonInfo />
        <MsgCtn>
          {msgList.map((el, index) =>
            el.userType === "신청자" ? (
              <SendChatDesign
                key={index}
                input={el.message}
                createAt={el.createdAt.slice(11, 16)}
              />
            ) : (
              <RecieveChatDesign
                key={index}
                input={el.message}
                createAt={el.createdAt.slice(11, 16)}
              />
            ),
          )}
        </MsgCtn>
      </InfoMsgCtn>

      <MessageForm onSubmit={e => submitHdr(e)}>
        <ImgBtn>
          <img src={imgIcon} alt="이미지"></img>
        </ImgBtn>
        <MessageInput
          type="text"
          placeholder="메시지 입력"
          value={input}
          onChange={e => setSendHdr(e)}
        />
        <SendButton onClick={() => sendChat()}>
          <SendIconImg src={sendIcon} alt="전송"></SendIconImg>
        </SendButton>
      </MessageForm>
    </MessageSection>
  );
};

export default Chat;

export const MessageSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  width: 100%;
`;
export const InfoMsgCtn = styled.div``;

export const MsgCtn = styled.div`
  justify-content: space-between;
`;

export const MessageForm = styled.form`
  display: flex;
  width: 100%;
  border: 1px solid grey;
  position: sticky;
  bottom: 70px;
`;

export const ImgBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;
  width: 60px;
  background-color: ${global.White.value};
  cursor: pointer;
  &:active {
    background-color: ${global.WhiteButtonActive.value};
  }
`;

export const MessageInput = styled.input`
  display: flex;
  flex: 1;
  font: 16px;
  height: 48px;
  border: 0px;
  &:focus {
    outline: none;
  }
  ::placeholder {
    margin-left: 12px;
  }
`;

export const SendButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;
  width: 60px;
  border: 0px;
  background-color: ${global.Primary.value};
  cursor: pointer;
  &:active {
    background-color: ${global.PrimaryActive.value};
  }
`;

export const SendIconImg = styled.img`
  display: flex;
  color: ${global.White.value};
`;
