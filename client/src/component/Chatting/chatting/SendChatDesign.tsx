import React from "react";
import { styled } from "styled-components";
import global from "../../../Data/global";

interface CCDProps {
  input?: string;
  createAt?: string;
}

const ClientChatDesign: React.FC<CCDProps> = ({ input, createAt }) => {
  return (
    <ChatCtn>
      <ChatDesign>
        <div style={{ overflowWrap: "break-word" }}>{input}</div>
      </ChatDesign>
      <TimeDesign>{createAt}</TimeDesign>
    </ChatCtn>
  );
};

export default ClientChatDesign;

export const ChatCtn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 8px;
  margin-bottom: 8px;
  margin-left: 13px;
`;

export const ChatDesign = styled.div`
  white-space: normal;
  justify-content: center;
  text-align: center;
  border: 2px solid ${global.Primary.value};
  border-radius: 16px 16px 16px 0px;
  max-width: 60%;
  font-size: 14px;
  padding: 12px 24px;
`;

export const TimeDesign = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 58px;
  height: 21px;
  font-size: 12px;
  color: ${global.Gray[8].value};
  background-color: ${global.Gray[6].value};
  margin-top: 8px;
  border-radius: 7px;
`;
