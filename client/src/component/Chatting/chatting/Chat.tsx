import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import imgIcon from "../../../asset/ChatAsset/image-icon.png";
import sendIcon from "../../../asset/ChatAsset/message-icon.png";
import SendChatDesign from "./SendChatDesign";
import RecieveChatDesign from "./RecieveChatDesign";
import * as StompJS from "@stomp/stompjs";
import global from "../../../Data/global";
import axios from "axios";
import PersonInfo from "./PersonInfo";

const accessToken = window.localStorage.getItem("accessToken");
const memberId = Number(window.localStorage.getItem("memberId"));

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
        clientData.subscribe(`/sub/room/5`, msgGet);
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
      try {
        if (client.connected) {
          client.publish({
            destination: `/pub/5`,
            body: JSON.stringify({
              memberId: Number(memberId),
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
      const msg = await axios.get("http://3.35.193.208:8080/message/5");
      console.log(msg.data);
      setMsgList(msg.data);
      window.scrollTo(
        0,
        document.documentElement.scrollHeight || document.body.scrollHeight,
      );
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
    <ChatCtn>
      <PersonInfo disconnect={disconnect} />
      <MessageSection>
        <MsgCtn>
          {msgList
            ? msgList.map((el, index) =>
                el.memberId === memberId ? (
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
              )
            : ""}
        </MsgCtn>

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
    </ChatCtn>
  );
};

export default Chat;

const ChatCtn = styled.div`
  display: flex;
  flex-direction: column;
`;

const MessageSection = styled.section`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 300px);
`;
const MsgCtn = styled.div`
  display: flex;
  flex-direction: column;
  bottom: 70px;
  position: sticky;
  flex-grow: 1;
`;
const MessageForm = styled.form`
  display: flex;
  border-top: 1px solid ${global.Gray[5].value};
  position: sticky;
  bottom: 70px;
`;
const ImgBtn = styled.div`
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
const MessageInput = styled.input`
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
const SendButton = styled.button`
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
const SendIconImg = styled.img`
  display: flex;
  color: ${global.White.value};
`;
