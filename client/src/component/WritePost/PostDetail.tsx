import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

interface Board {
  wcboardId: string;
  title: string;
  content: string;
  images: string;
  wcTag: string;
  animalTag: string;
  areaTag: string;
  postStatus: string;
  startTime: string;
  endTime: string;
}

const BoardList = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Board[]>([]);

  useEffect(() => {
    const apiUrl = "https://3c86-121-162-236-116.ngrok-free.app/wcboard"; // API 엔드포인트 URL
    const page = "1"; // 페이지 번호
    const size = "10"; // 한 페이지에 몇 개 게시글을 가져올지 지정

    // axios를 사용하여 데이터를 가져오는 비동기 함수 정의
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl, {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            Accept: "application/json",
            "ngrok-skip-browser-warning": "69420",
          },
          params: { page, size }, // 페이지 및 페이지 크기를 파라미터로 지정
        });

        // 데이터를 가져와서 상태 업데이트
        setPosts(response.data.data);
      } catch (error) {
        console.error("API 요청 중 오류 발생:", error);
      }
    };

    // fetchData 함수 호출
    fetchData();
  }, []);

  const moveToWrite = () => {
    navigate("/writpost");
  };

  return (
    <div>
      {posts.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {posts.map(post => (
            <li key={post.wcboardId}>
              <div>{post.title}</div>
              <div>{post.animalTag}</div>
              <div>{post.areaTag}</div>
              <div>
                {post.images && (
                  <img
                    src={post.images}
                    alt="이미지"
                    style={{ maxWidth: "100%", maxHeight: "300px" }}
                  />
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
      <button onClick={moveToWrite}>글쓰기</button>
    </div>
  );
};

export default BoardList;
