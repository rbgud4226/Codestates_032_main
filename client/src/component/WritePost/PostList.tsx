import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Pagination from "react-js-pagination";

const api = process.env.REACT_APP_DB_HOST;

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
  const [page, setPage] = useState<number>(1); // 현재 페이지 번호

  const [totalItemsCount, setTotalItemsCount] = useState<number>(0); // 전체 게시물 수

  const postPerPage = 5; // 페이지 당 게시글 개수

  // 페이지 번호 변경 시 호출되는 함수
  const handlePageChange = (selectedPage: number) => {
    setPage(selectedPage);
  };

  useEffect(() => {
    const page = "1";
    const size = "10";

    const fetchData = async () => {
      try {
        const response = await axios.get(`${api}/wcboard`, {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            Accept: "application/json",
            "ngrok-skip-browser-warning": "69420",
          },
          params: { page, size: postPerPage }, // 페이지 번호 및 페이지당 게시글 수 전달
        });
        setTotalItemsCount(response.data.total); // 전체 게시물 수 설정
        setPosts(response.data.data);
      } catch (error) {
        console.error("API 요청 중 오류 발생:", error);
      }
    };

    fetchData();
  }, [page]);

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
                <ImContainer key={post.wcboardId}>
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
                    ;
                  </div>
                </ImContainer>
              );
            }
            return null;
          })}
        </ul>
      )}
      <button onClick={moveToWrite}>글쓰기</button>
      <Pagination
        activePage={page}
        itemsCountPerPage={postPerPage}
        totalItemsCount={totalItemsCount} // 전체 게시물 수 설정
        pageRangeDisplayed={5}
        prevPageText={"‹"}
        nextPageText={"›"}
        onChange={handlePageChange}
      />
    </div>
  );
};

export default BoardList;

const ImContainer = styled.div`
  color: back;
  border: 1px solid blue;

  height: 100px;

  text-align: center;
  margin-top: 12px;
`;
