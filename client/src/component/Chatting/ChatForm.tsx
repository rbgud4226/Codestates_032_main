import React from "react";
import { styled } from "styled-components";
import Chat from "./chatting/Chat";

const ChatForm = () => {
  return (
    <ChatFormCtn>
      <Chat />
    </ChatFormCtn>
  );
};

export default ChatForm;

export const ChatFormCtn = styled.div`
  display: flex;
  margin-top: 14px;
  width: 100%;
  max-width: 468px;
`;
