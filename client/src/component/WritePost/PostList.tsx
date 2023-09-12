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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [animalTagFilter, setAnimalTagFilter] = useState<string | null>(null);
  const [wcTagFilter, setWCTagFilter] = useState<string | null>(null);

  useEffect(() => {
    const apiUrl = "https://d92e-121-162-236-116.ngrok-free.app/wcboard";
    const page = "1";
    const size = "10";

    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl, {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            Accept: "application/json",
            "ngrok-skip-browser-warning": "69420",
          },
          params: { page, size },
        });
        setPosts(response.data.data);
      } catch (error) {
        console.error("API 요청 중 오류 발생:", error);
      }
    };

    fetchData();

    // 로그인 여부 확인
    const checkLoginStatus = () => {
      const accessToken = localStorage.getItem("accessToken");
      setIsLoggedIn(!!accessToken);
    };

    checkLoginStatus();
  }, []);

  const moveToWrite = () => {
    if (isLoggedIn) {
      navigate("/writpost");
      console.log("로그인O");
    } else {
      // 로그인하지 않은 경우 로그인 페이지로 이동
      navigate("/login");
      alert("로그인해주세요");
      console.log("로그인X");
    }
  };

  return (
    <div>
      <div>
        <button onClick={() => setAnimalTagFilter(null)}>모두</button>
        <button onClick={() => setAnimalTagFilter("고양이")}>고양이</button>
        <button onClick={() => setAnimalTagFilter("강아지")}>강아지</button>
        <button onClick={() => setAnimalTagFilter("기타동물")}>기타동물</button>
      </div>
      <div>
        <button onClick={() => setWCTagFilter(null)}>모두</button>
        <button onClick={() => setWCTagFilter("산책")}>산책</button>
        <button onClick={() => setWCTagFilter("돌봄")}>돌봄</button>
      </div>
      {posts.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {posts.map(post => {
            if (
              (!animalTagFilter || post.animalTag.includes(animalTagFilter)) &&
              (!wcTagFilter || post.wcTag === wcTagFilter)
            ) {
              return (
                <li key={post.wcboardId}>
                  <Link to={`/board/${post.wcboardId}`}>{post.title}</Link>
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
              );
            }
            return null;
          })}
        </ul>
      )}
      <button onClick={moveToWrite}>글쓰기</button>
    </div>
  );
};

export default BoardList;
