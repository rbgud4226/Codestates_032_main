import React, { useState } from "react";
import { styled } from "styled-components";
import ChatForm from "./ChatForm";

const Chat = () => {
  const [isChat, setIsChat] = useState(true);

  const chatHdr = () => {
    setIsChat(true);
  };

  const mapHdr = () => {
    setIsChat(false);
  };
  return (
    <>
      <PetalkBtnCtn>
        <PetalkChat onClick={() => chatHdr()}>펫톡쳇</PetalkChat>
        <PetalkMap onClick={() => mapHdr()}>펫톡맵</PetalkMap>
      </PetalkBtnCtn>
      {isChat ? <ChatForm /> : ""}
    </>
  );
};

export default Chat;

export const PetalkCtn = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PetalkBtnCtn = styled.div`
  display: flex;
  margin-top: 12px;
  justify-content: space-around;
`;

export const PetalkChat = styled.button`
  justify-content: center;
  text-align: center;
  width: 155px;
  height: 36px;
  border-radius: 4px;
  border: 0px;
  font-weight: 600;
  color: white;
  background-color: #279eff;
  cursor: pointer;
  &:active {
    background-color: #1d8ce7;
  }
`;

export const PetalkMap = styled.button`
  justify-content: center;
  text-align: center;
  width: 155px;
  height: 36px;
  font-weight: 600;
  border-radius: 4px;
  background-color: white;
  color: #a4a4a4;
  border: 1px solid #dee2e9;
  cursor: pointer;
  &:active {
    background-color: #dee2e9;
  }
`;
