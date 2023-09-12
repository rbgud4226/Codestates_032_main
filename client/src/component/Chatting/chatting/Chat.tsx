import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import imgIcon from "../../../asset/ChatAsset/image-icon.png";
import sendIcon from "../../../asset/ChatAsset/message-icon.png";
import SendChatDesign from "./SendChatDesign";
import RecieveChatDesign from "./RecieveChatDesign";
import * as StompJS from "@stomp/stompjs";
import SockJS from "sockjs-client";

//현재 시간을 xx-xx로 가져오는 함수
const updateCurrentTime = (): string => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  return `${hours}-${minutes}`;
};

const Chat: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [messageForm, setMessageForm] = useState<
    Array<{
      isClient: boolean;
      message: string;
      createAt: string;
    }>
  >([]);

  //연결 소켓 설정
  const client = new StompJS.Client({
    brokerURL: "ws://3.35.193.208:8080/ws-stomp",
    debug: (str: string) => {
      console.log(str);
    },
    reconnectDelay: 5000,
  });

  client.onConnect = () => {
    client.subscribe(`/sub/room/1`, callback);
  };

  //연결시 callback 함수
  const callback = message => {
    if (message.body) {
      console.log(message.body);
      const msgForm = {
        isClient: false,
        message: message.body.message,
        createAt: updateCurrentTime(),
      };
      console.log(messageForm);
      setMessageForm(messageForm.concat(msgForm));
    }
  };

  //메세지 전달 함수.
  const sendChat = () => {
    if (input.trim() !== "") {
      const msgForm = {
        isClient: true,
        message: input,
        createAt: updateCurrentTime(),
      };
      setMessageForm(messageForm.concat(msgForm));
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
      console.log(messageForm);
    }
  };
  useEffect(() => {
    client.activate();
  }, []);

  const setSendHdr = e => {
    setInput(e.target.value);
  };

  return (
    <MessageSection>
      <div>
        {messageForm.map((el, index) =>
          el.isClient ? (
            <SendChatDesign
              key={index}
              input={el.message}
              createAt={el.createAt}
            />
          ) : (
            <RecieveChatDesign
              key={index}
              input={el.message}
              createAt={el.createAt}
            />
          ),
        )}
      </div>
      <MessageForm>
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
  width: 100%;
`;

export const MessageForm = styled.form`
  display: flex;
  flex-direction: row;
  width: 100%;
  border: 1px solid grey;
`;

export const ImgBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;
  width: 60px;
  background-color: white;
  cursor: pointer;
  &:active {
    background-color: #d9d9d9;
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
  background-color: #279eff;
  cursor: pointer;
  &:active {
    background-color: #1d8ce7;
  }
`;

export const SendIconImg = styled.img`
  display: flex;
  color: white;
`;
