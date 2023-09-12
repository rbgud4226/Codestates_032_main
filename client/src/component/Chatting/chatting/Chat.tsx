import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import imgIcon from "../../../asset/ChatAsset/image-icon.png";
import sendIcon from "../../../asset/ChatAsset/message-icon.png";
import SendChatDesign from "./SendChatDesign";
import RecieveChatDesign from "./RecieveChatDesign";
import Stomp, { Client } from "@stomp/stompjs";
import SockJS from "sockjs";

const updateCurrentTime = (): string => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  return `${hours}-${minutes}`;
};

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [messageForm, setMessageForm] = useState<
    Array<{
      isClient: boolean;
      message: string;
      createAt: string;
    }>
  >([]);
  const [input, setInput] = useState<string>("");

  //현재 시간을 xx-xx로 가져오는 함수

  useEffect(() => {
    const client = new Client({
      brokerURL: "ws://3.35.193.208:8080/ws-stomp",
      debug: (str: string) => {
        console.log(str);
      },
      reconnectDelay: 5000,
    });
    //서버구독설정(메세지받음) {} 는 헤더설정.
    client.onConnect = () => {
      console.log("연결되었습니다");
      client.subscribe(`/sub/room/1`, msg => {
        console.log(msg.body);
        const recieveMsgForm = {
          isClient: false,
          message: msg.body,
          createAt: updateCurrentTime(),
        };
        setMessageForm(messageForm.concat(recieveMsgForm));
      });
    };

    return () => {
      client.deactivate(); // 컴포넌트 언마운트 시 웹소켓 연결 해제
    };
  }, []);
  //메세지 보내는 함수
  const sendMessage = () => {
    if (input.trim() !== "") {
      const client = new Client({
        brokerURL: "ws://3.35.193.208:8080/ws-stomp",
        debug: (str: string) => {
          console.log(str);
        },
        reconnectDelay: 5000,
      });
      client.publish()

      const sendForm = {
        isClient: true,
        message: input,
        createAt: updateCurrentTime(),
      };
      
      setMessageForm(messageForm.concat(sendForm));
      setMessages(messages.concat(input));
      setInput("");
      client.disconnect();
    }
  };
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
      <MessageWrapper>
        <ImgBtn>
          <img src={imgIcon} alt="이미지"></img>
        </ImgBtn>
        <MessageInput
          type="text"
          placeholder="메시지 입력"
          value={input}
          onChange={e => setSendHdr(e)}
        />
        <SendButton onClick={sendMessage}>
          <SendIconImg src={sendIcon} alt="전송"></SendIconImg>
        </SendButton>
      </MessageWrapper>
    </MessageSection>
  );
};

export default Chat;

export const MessageSection = styled.section`
  width: 100%;
`;

export const MessageWrapper = styled.div`
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
