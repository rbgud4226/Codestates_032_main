import axios from "axios";

const serverUrl = "https://a068-121-162-236-116.ngrok-free.app/members";

// 마이페이지 데이터를 가져오는 함수
export async function fetchMyPageData(accessToken: string) {
  try {
    const ngrokSkipBrowserWarning = "69420";
    const page = 1; // 페이지 번호
    const size = 1; // 페이지당 아이템 수

    const response = await axios.get(serverUrl, {
      headers: {
        Authorization: `${accessToken}`,
        Accept: "application/json",
        "ngrok-skip-browser-warning": ngrokSkipBrowserWarning,
      },
      params: {
        page: page,
        size: size,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
}
