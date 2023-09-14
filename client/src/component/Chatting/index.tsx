import React, { useState } from "react";
import { styled } from "styled-components";
import ChatForm from "./ChatForm";
import global from "../../Data/global";

const Chat = () => {
  const [isChat, setIsChat] = useState(true);

  const chatHdr = () => {
    setIsChat(true);
  };

  const mapHdr = () => {
    setIsChat(false);
  };
  return (
    <Ctn>
      {/* {isChat ? (
        <PetalkBtnCtn>
          <ActiveBtn onClick={() => chatHdr()}>펫톡쳇</ActiveBtn>
          <DiactiveBtn onClick={() => mapHdr()}>펫톡맵</DiactiveBtn>
        </PetalkBtnCtn>
      ) : (
        <PetalkBtnCtn>
          <DiactiveBtn onClick={() => chatHdr()}>펫톡쳇</DiactiveBtn>
          <ActiveBtn onClick={() => mapHdr()}>펫톡맵</ActiveBtn>
        </PetalkBtnCtn>
      )} */}

      {isChat ? <ChatForm /> : ""}
    </Ctn>
  );
};

export default Chat;

export const Ctn = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PetalkBtnCtn = styled.div`
  display: flex;
  justify-content: space-around;
  background-color: ${global.White.value};
  top: 0px;
  position: sticky;
`;

export const ActiveBtn = styled.button`
  justify-content: center;
  text-align: center;
  width: 155px;
  height: 36px;
  border-radius: 4px;
  border: 0px;
  font-weight: 600;
  color: ${global.White.value};
  background-color: ${global.Primary.value};
  cursor: pointer;
  &:active {
    background-color: ${global.PrimaryActive.value};
  }
`;

export const DiactiveBtn = styled.button`
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
