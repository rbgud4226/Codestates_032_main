// src/components/WebSocketChat.tsx

import React, { useEffect, useState } from "react";

const WebSocketChat: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const newSocket = new WebSocket("ws://localhost:8080"); // WebSocket 서버 주소로 변경하세요.

    newSocket.onopen = () => {
      console.log("WebSocket 연결이 열렸습니다.");
    };

    newSocket.onmessage = event => {
      const message = event.data;
      setMessages(prevMessages => [...prevMessages, message]);
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
    if (socket && input.trim() !== "") {
      socket.send(input);
      setInput("");
    }
  };
  const setSendHdr = e => {
    setInput(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="메시지 입력"
        value={input}
        onChange={e => setSendHdr(e)}
      />
      <button onClick={sendMessage}>전송</button>

      <div>
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
    </div>
  );
};

export default WebSocketChat;
