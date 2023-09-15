import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Pagination from "react-js-pagination";

import "./Paging.css";

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
}

const BoardList = () => {
  const navigate = useNavigate();

  const [posts, setPosts] = useState<Board[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [animalTagFilter, setAnimalTagFilter] = useState<string | null>(null);
  const [wcTagFilter, setWCTagFilter] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);

  const postPerPage = 5;

  const handlePageChange = (selectedPage: number) => {
    setPage(selectedPage);

    // 페이지 변경 시 API 호출
    fetchData(selectedPage);
  };

  useEffect(() => {
    // 초기 페이지 로딩 시에도 API 호출
    fetchData(page);
  }, [page]);

  const fetchData = async (selectedPage: number) => {
    const size = String(postPerPage);
    const page = String(selectedPage);

    try {
      const response = await axios.get(`${api}/wcboard`, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Accept: "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
        params: { page, size }, // 페이지 번호 및 페이지당 게시글 수 전달
      });

      checkLoginStatus();

      setPosts(response.data.data);
      console.log(response);
    } catch (error) {
      console.error("API 요청 중 오류 발생:", error);
    }
  };

  const checkLoginStatus = () => {
    const accessToken = localStorage.getItem("accessToken");
    setIsLoggedIn(!!accessToken);
  };

  const moveToWrite = () => {
    if (isLoggedIn) {
      navigate("/writpost");
      console.log("로그인O");
    } else {
      navigate("/login");
      alert("로그인해주세요");
      console.log("로그인X");
    }
  };

  return (
    <PageListContainer>
      <PageContainer>
        <SectionContainer>
          <OptionButton
            onClick={() => {
              setAnimalTagFilter(null);
              setWCTagFilter(null);
            }}
          >
            모두
          </OptionButton>
          <OptionButton onClick={() => setAnimalTagFilter("고양이")}>
            고양이
          </OptionButton>
          <OptionButton onClick={() => setAnimalTagFilter("강아지")}>
            강아지
          </OptionButton>
          <OptionButton onClick={() => setAnimalTagFilter("기타동물")}>
            기타
          </OptionButton>
        </SectionContainer>
        <SectionContainer>
          <OptionButton onClick={() => setWCTagFilter("산책")}>
            산책
          </OptionButton>
          <OptionButton onClick={() => setWCTagFilter("돌봄")}>
            돌봄
          </OptionButton>
        </SectionContainer>
      </PageContainer>
      {Array.isArray(posts) && posts.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {/* 필터 방식 변경 & Array.isArray */}
          {Array.isArray(posts) &&
            posts.map(post => {
              if (
                (!animalTagFilter ||
                  post.animalTag.includes(animalTagFilter)) &&
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
        itemsCountPerPage={10}
        totalItemsCount={200}
        pageRangeDisplayed={5}
        prevPageText={"‹"}
        nextPageText={"›"}
        onChange={handlePageChange}
      />
    </PageListContainer>
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
const PageListContainer = styled.div`
  text-align: left;
`;

const PageContainer = styled.div`
  text-align: left;
  display: flex;
  justify-content: space-between;
`;

const SectionContainer = styled.div`
  margin-bottom: 32px;
`;

const OptionButton = styled.button`
  border: 1px solid #279eff;
  width: 68px;
  height: 36px;
  border-radius: 4px;
  padding: 4px 16px;
  cursor: pointer;
  justify-content: space-around;
  font-size: 8px;
`;
