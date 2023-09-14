import React from "react";
import { styled } from "styled-components";
import Chat from "./chatting/Chat";
import PersonInfo from "./chatting/PersonInfo";

const ChatForm = () => {
  return (
    <ChatFormCtn>
      <PersonInfo />
      <Chat />
    </ChatFormCtn>
  );
};

export default ChatForm;

export const ChatFormCtn = styled.div`
  display: flex;
  flex-direction: column;
`;
