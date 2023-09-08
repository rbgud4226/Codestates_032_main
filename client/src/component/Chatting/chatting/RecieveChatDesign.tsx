import React from "react";
import { styled } from "styled-components";
interface RCVProps {
  input?: string;
  createAt?: string;
}

const RecieveChatDesign: React.FC<RCVProps> = ({ input, createAt }) => {
  return (
    <ChatCtn>
      <ChatDesign>{input}</ChatDesign>
      <TimeDesign>{createAt}</TimeDesign>
    </ChatCtn>
  );
};

export default RecieveChatDesign;

export const ChatCtn = styled.div`
  display: flex;
  align-items: end;
  flex-direction: column;
  border: 1px solid green;
  margin-top: 8px;
  margin-bottom: 8px;
  margin-right: 13px;
`;

export const ChatDesign = styled.div`
  white-space: normal;
  flex-wrap: wrap;
  justify-content: center;
  text-align: center;
  border: 0px;
  background-color: #279eff;
  border-radius: 16px 16px 0px 16px;
  max-width: 60%;
  font-size: 14px;
  padding: 12px 24px;
`;

export const TimeDesign = styled.div`
  width: 58px;
  height: 21px;
  font-size: 12px;
  color: #8c8c8c;
  background-color: #f1f1f1;
  margin-top: 8px;
  border-radius: 7px;
`;
