import SockJS from "sockjs-client";
import Stomp, { Client, Frame, Subscription } from "stompjs";

let stompClient: Client | null = null;

function connect(): void {
  const socket: WebSocket = new SockJS("ws://3.35.193.208:8080/ws-stomp"); // WebSocket 엔드포인트를 지정합니다.

  stompClient = Stomp.over(socket);
  stompClient.connect({}, onConnected, onError);
}

function onConnected(frame: Frame): void {
  console.log("Connected to WebSocket");

  // 여기에서 원하는 STOMP 구독을 설정할 수 있습니다.
  const subscription: Subscription = stompClient.subscribe(
    "/sub/room/1",
    onMessageReceived,
  );
}

function onError(error: Frame | string): void {
  console.error("Error during WebSocket connection:", error);
}

function onMessageReceived(message: Frame): void {
  console.log("Received message:", message.body);
}

// 연결 버튼을 눌렀을 때 WebSocket 연결 시도
const connectButton: HTMLButtonElement | null = document.getElementById(
  "connect-button",
) as HTMLButtonElement;
if (connectButton) {
  connectButton.addEventListener("click", () => {
    connect();
  });
}
