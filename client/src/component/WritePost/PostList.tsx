import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
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
  location: string;
}

interface PageInfo {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

const BoardList = () => {
  const navigate = useNavigate();
  const params = useParams();
  const currentPage = parseInt(params.p || "1", 10);

  const [posts, setPosts] = useState<Board[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [animalTagFilter, setAnimalTagFilter] = useState<string | null>(null);
  const [wcTagFilter, setWCTagFilter] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const accessToken = localStorage.getItem("accessToken");
  const location = useLocation();
  const [selectedWCTag, setSelectedWCTag] = useState<string | null>(null);
  const [selectedAnimalTags, setSelectedAnimalTags] = useState<string[]>([]);
  const [totalItemsCount, setTotalItemsCount] = useState<number>(0);
  const [wcTags, setWCTags] = useState<string[]>([]); // 추가된 WC 태그
  const [animalTags, setAnimalTags] = useState<string[]>([]); // 추가된 동물 태그
  const [paginationPage, setPaginationPage] = useState<number>(currentPage);
  const PAGE_SIZE = 5;

  const checkLoginStatus = () => {
    const accessToken = localStorage.getItem("accessToken");
    setIsLoggedIn(!!accessToken);
  };

  const [pageSize, setPageSize] = useState<number>(5);

  // WC 태그와 동물 태그를 가져오는 함수
  const fetchTags = async (
    selectedPage: number,
    animalTagFilter: string | null,
    wcTagFilter: string | null,
  ) => {
    // 페이지 크기를 문자열로 변환
    const size = String(PAGE_SIZE);
    setIsLoading(true);

    try {
      const response = await axios.get(`${api}/wcboard/`, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Accept: "application/json",
          "ngrok-skip-browser-warning": "69420",
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          page: selectedPage, // 현재 페이지
          size, // 페이지당 항목 수 (항상 5로 고정)
          wcTag: wcTagFilter,
          animalTag: animalTagFilter,
          sort: "wcboardId",
        },
      });

      // 데이터 설정
      checkLoginStatus();

      // 만약 응답에서 반환된 항목이 5개 미만이라면, 빈 항목을 추가
      const data = response.data.data;
      if (data.length < PAGE_SIZE) {
        const emptyItemCount = PAGE_SIZE - data.length;
        const emptyItems = Array.from({ length: emptyItemCount }, () => ({
          // 빈 항목의 필드들을 적절히 초기화
          wcboardId: "0",
          title: "",
          content: "",
          images: "",
          wcTag: "",
          animalTag: "",
          areaTag: "",
          postStatus: "",
          location: "",
        }));
        setPosts([...data, ...emptyItems]);
      } else {
        setPosts(data);
      }

      const pageInfo: PageInfo = response.data.pageInfo;

      setTotalItemsCount(pageInfo.totalElements);

      setIsLoading(false);

      // 페이지가 없으면 1로 보내기
      if (selectedPage > pageInfo.totalPages) {
        const url = `/mainPage?p=1`;
        navigate(url);
      }
    } catch (error) {
      console.error("API 요청 중 오류 발생:", error);
      setIsLoading(false);
    }
  };

  // 태그 불러오기
  const fetchData = async (
    selectedPage: number,
    animalTagFilter: string | null,
    wcTagFilter: string | null,
  ) => {
    // 페이지 크기를 문자열로 변환
    const size = String(pageSize);
    setIsLoading(true);

    try {
      const response = await axios.get(`${api}/wcboard`, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Accept: "application/json",
          "ngrok-skip-browser-warning": "69420",
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          page: selectedPage, // 현재 페이지
          size, // 페이지 크기
          wcTag: wcTagFilter,
          animalTag: animalTagFilter,
          sort: "wcboardId",
        },
      });

      // 데이터 설정
      checkLoginStatus();
      setPosts(response.data.data.sort((a, b) => b.wcboardId - a.wcboardId));
      const pageInfo: PageInfo = response.data.pageInfo;

      setTotalItemsCount(pageInfo.totalElements);

      setIsLoading(false);

      // 페이지가 없으면 1로 보내기
      if (selectedPage > pageInfo.totalPages) {
        const url = `/mainPage?p=1`;
        navigate(url);
      }
    } catch (error) {
      console.error("API 요청 중 오류 발생:", error);
      setIsLoading(false);
    }
  };

  const goToPage = (selectedPage: number) => {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.set("p", String(selectedPage)); // 페이지 번호 추가
    if (selectedWCTag) {
      urlSearchParams.set("wcTag", selectedWCTag); // WC 태그 추가
    }
    if (selectedAnimalTags.length > 0) {
      urlSearchParams.set("animalTag", selectedAnimalTags.join(",")); // 동물 태그 추가
    }

    const url = `/mainPage?${urlSearchParams.toString()}`;
    navigate(url);
  };

  const handleAnimalTagChange = (animalTag: string) => {
    setSelectedAnimalTags([animalTag]);
    setPaginationPage(1); // 페이지를 1페이지로 초기화

    const url = `/mainPage?p=1&animalTag=${encodeURIComponent(
      animalTag,
    )}&wcTag=${selectedWCTag || ""}`;
    navigate(url);
  };

  const handleWCTagChange = (wcTag: string) => {
    setSelectedWCTag(wcTag);
    setPaginationPage(1); // 페이지를 1페이지로 초기화

    const url = `/mainPage?p=1&animalTag=${selectedAnimalTags.join(
      ",",
    )}&wcTag=${wcTag}`;
    navigate(url);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const currentPageFromURL = parseInt(searchParams.get("p") || "1", 10);
    setPaginationPage(currentPageFromURL);
    setAnimalTagFilter(searchParams.get("animalTag") || null);
    setWCTagFilter(searchParams.get("wcTag") || null);
    fetchData(
      currentPageFromURL,
      searchParams.get("animalTag"),
      searchParams.get("wcTag"),
    );
    fetchTags(
      currentPageFromURL,
      searchParams.get("wcTag"),
      searchParams.get("animalTag"),
    );
  }, [location.search]);

  const handlePageChange = (selectedPage: number) => {
    setPaginationPage(selectedPage); // 페이지네이션 숫자를 업데이트

    // fetchData 함수 호출
    fetchData(selectedPage, animalTagFilter, wcTagFilter);

    // 페이지 이동 처리
    goToPage(selectedPage);
  };

  const moveToWrite = () => {
    if (isLoggedIn) {
      navigate("/writpost");
    } else {
      navigate("/login");
      alert("로그인해주세요");
    }
  };

  return (
    <PageListContainer>
      <PageContainer>
        <SectionContainer>
          <OptionButton
            selected={!selectedAnimalTags.length && !selectedWCTag}
            onClick={() => {
              setAnimalTagFilter(null);
              setWCTagFilter(null);
              setSelectedAnimalTags([]);
              setSelectedWCTag(null);
              navigate(`/mainPage?p=1`);
              setPaginationPage(1);
              fetchData(1, null, null); // null로 초기화
            }}
          >
            모두
          </OptionButton>
          <OptionButton
            selected={selectedAnimalTags.includes("강아지")}
            onClick={() => handleAnimalTagChange("강아지")}
          >
            강아지
          </OptionButton>
          <OptionButton
            selected={selectedAnimalTags.includes("고양이")}
            onClick={() => handleAnimalTagChange("고양이")}
          >
            고양이
          </OptionButton>
          <OptionButton
            selected={selectedAnimalTags.includes("기타동물")}
            onClick={() => handleAnimalTagChange("기타동물")}
          >
            기타
          </OptionButton>
        </SectionContainer>
        <SectionContainer>
          <WcOptionButton
            selected={selectedWCTag === "산책"}
            onClick={() => handleWCTagChange("산책")}
          >
            산책
          </WcOptionButton>
          <WcOptionButton
            selected={selectedWCTag === "돌봄"}
            onClick={() => handleWCTagChange("돌봄")}
          >
            돌봄
          </WcOptionButton>
        </SectionContainer>
      </PageContainer>
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
                <Link to={`/board/${post.wcboardId}`} key={post.wcboardId}>
                  <SubContainer>
                    <ImContainer key={post.wcboardId}>
                      <ListContainer>
                        <SubPageContainer>
                          <SmoPage>
                            {post.animalTag
                              .split(",")
                              .map(tag => tag.trim())
                              .join(" ")}{" "}
                            {post.areaTag} {post.wcTag}
                          </SmoPage>
                        </SubPageContainer>
                        <SubPageContainer>
                          <TitlePage>{post.title}</TitlePage>
                          {post.content.length > 30
                            ? `${post.content.slice(0, 30)}...`
                            : post.content}
                        </SubPageContainer>
                      </ListContainer>
                    </ImContainer>
                  </SubContainer>
                </Link>
              );
            }
            return null;
          })}
        </ul>
      )}
      <PostButton onClick={moveToWrite}>글쓰기</PostButton>
      <Pagination
        activePage={paginationPage}
        itemsCountPerPage={pageSize}
        totalItemsCount={totalItemsCount}
        pageRangeDisplayed={5}
        prevPageText={"‹"}
        nextPageText={"›"}
        onChange={handlePageChange}
      />
    </PageListContainer>
  );
};

export default BoardList;

const PostButton = styled.button`
  background-color: #279eff;
  color: white;
  border: 1px solid #279eff;
  width: 82px;
  height: 44px;
  border-radius: 8px;
  padding: 8px 16px;
  cursor: pointer;
  justify-content: space-around;
  font-size: 12px;
`;

const SubContainer = styled.div`
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(34, 39, 76, 0.2);
  width: 100%;
`;

const SubPageContainer = styled.div`
  text-align: left;
  margin-left: 4px;
`;
const SmoPage = styled.div`
  font-size: 12px;
  color: #78c1f3;
  white-space: pre-wrap;
  margin-bottom: 4px;
`;
const ContentPage = styled.div`
  font-size: 14px;
  color: #b7b7b7;
  white-space: pre-wrap;
`;
const NickNamePage = styled.div`
  font-size: 14px;
  color: #b7b7b7;
  white-space: pre-wrap;
`;

const TitlePage = styled.div`
  font-size: 16px;
  color: #000000;
  font-weight: bold;
  white-space: pre-wrap;
`;

const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-grow: 1;
  flex-direction: column;
  padding: 16px;
`;

const ImContainer = styled.div`
  color: back;
  //border: 1px solid #272c56;
  height: 100px;
  text-align: center;
  margin-top: 12px;
  border-radius: 12px;
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

const OptionButton = styled.button<{ selected: boolean }>`
  background-color: ${props => (props.selected ? "#279eff" : "white")};
  color: ${props => (props.selected ? "white" : "#279eff")};
  border: 1px solid #279eff;
  width: 50px;
  height: 40px;
  border-radius: 8px;
  cursor: pointer;
  justify-content: space-around;
  font-size: 12px;
  margin-left: 4px;
  
  }
`;

const WcOptionButton = styled.button<{ selected: boolean }>`
  background-color: ${props => (props.selected ? "#279eff" : "white")};
  color: ${props => (props.selected ? "white" : "#279eff")};
  border: 1px solid #279eff;
  width: 50px;
  height: 40px;
  border-radius: 8px;
  margin-left: 4px;
  cursor: pointer;
  justify-content: space-around;
  font-size: 12px;
`;
