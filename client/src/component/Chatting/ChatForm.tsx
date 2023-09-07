import React from "react";
import { styled } from "styled-components";
import PersonInfo from "./chatting/PersonInfo";
import WebSocketChat from "./chatting/Chat";

const ChatForm = () => {
  return (
    <ChatFormCtn>
      <PersonInfo />
      <WebSocketChat />
    </ChatFormCtn>
  );
};

export default ChatForm;

export const ChatFormCtn = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 14px;
  border: 1px solid black;
`;
