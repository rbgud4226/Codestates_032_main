import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import imgIcon from "../../../asset/ChatAsset/image-icon.png";
import sendIcon from "../../../asset/ChatAsset/message-icon.png";
import SendChatDesign from "./SendChatDesign";
import RecieveChatDesign from "./RecieveChatDesign";

const WebSocketChat: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [messageForm, setMessageForm] = useState<
    Array<{
      isClient: boolean;
      message: string;
      createAt: string;
    }>
  >([]);
  const [input, setInput] = useState<string>("");
  const [socket, setSocket] = useState<WebSocket | null>(null);

  const updateCurrentTime = (): string => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}-${minutes}`;
  };

  useEffect(() => {
    const newSocket = new WebSocket("ws://localhost:8080"); // WebSocket 서버 주소로 변경하세요.
    // headers: {
    //   Authorization: `Bearer ${token}`, // 토큰을 헤더에 첨부
    // },

    newSocket.onopen = () => {
      console.log("WebSocket 연결이 열렸습니다.");
    };

    newSocket.onmessage = event => {
      // const message = event.data;
      const rcForm = {
        isClient: false,
        message: event.data,
        createAt: updateCurrentTime(),
      };
      setMessageForm(messageForm.concat(rcForm));
      // setMessages(prevMessages => [...prevMessages, message]);
    };

    newSocket.onclose = () => {
      console.log("WebSocket 연결이 닫혔습니다.");
    };

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  const sendMessage = () => {
    const msForm = {
      isClient: true,
      message: input,
      createAt: updateCurrentTime(),
    };
    if (socket && input.trim() !== "") {
      socket.send(input);
      setMessageForm(messageForm.concat(msForm));
      setMessages(messages.concat(input));
      setInput("");
    }
  };
  const setSendHdr = e => {
    setInput(e.target.value);
  };
  //   <div>
  //   {messages.map((message, index) => (
  //     <div key={index}>{message}</div>
  //   ))}
  // </div>

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

export default WebSocketChat;

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
