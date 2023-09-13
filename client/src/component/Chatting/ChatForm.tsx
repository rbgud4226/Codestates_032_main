import React from "react";
import { styled } from "styled-components";
import PersonInfo from "./chatting/PersonInfo";
import Chat from "./chatting/Chat";

const ChatForm = () => {
  return (
    <ChatFormCtn>
      <PersonInfo />
      <WSCWrapper>
        <Chat />
      </WSCWrapper>
    </ChatFormCtn>
  );
};

export default ChatForm;

export const ChatFormCtn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 14px;
  width: 100%;
  border: 1px solid blue;
`;

export const WSCWrapper = styled.div`
  display: flex;
  max-width: 468px;
  width: 100%;
`;
