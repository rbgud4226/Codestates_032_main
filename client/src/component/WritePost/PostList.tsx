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
  const [page, setPage] = useState<number>(currentPage);
  const [totalItemsCount, setTotalItemsCount] = useState<number>(0);
  const [paginationPage, setPaginationPage] = useState<number>(currentPage);
  const [isLoading, setIsLoading] = useState(true);
  const accessToken = localStorage.getItem("accessToken");
  const location = useLocation();
  const [selectedWCTag, setSelectedWCTag] = useState<string | null>(null);
  const [selectedAnimalTags, setSelectedAnimalTags] = useState<string[]>([]);

  const [userData, setUserData] = useState({
    nickName: "",
    email: "",
    phone: "",
    profileImage: "",
  });

  //로그인 토근 확인하는거
  const checkLoginStatus = () => {
    const accessToken = localStorage.getItem("accessToken");
    setIsLoggedIn(!!accessToken);
  };

  const postPerPage = 5;

  //tag불러오기
  const fetchData = async (
    selectedPage: number,
    animalTagFilter: string | null,
    wcTagFilter: string | null,
  ) => {
    const size = String(postPerPage);
    setIsLoading(true);

    try {
      const response = await axios.get(`${api}/wcboard/tag`, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Accept: "application/json",
          "ngrok-skip-browser-warning": "69420",
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          page: selectedPage,
          size,
          wcTag: wcTagFilter,
          animalTag: animalTagFilter,
        },
      });

      // 데이터 설정
      checkLoginStatus();
      setPosts(response.data.data); // 이 부분을 변경하여 정렬하지 않고 그대로 설정합니다.

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
    // 페이지 이동 시 'p' 파라미터 변경
    const url = `/mainPage?p=${selectedPage}`;
    navigate(url);
  };

  //페이지 필터 데이터
  const handlePageChange = (selectedPage: number) => {
    setPaginationPage(selectedPage); // 페이지네이션 숫자를 업데이트

    // fetchData 함수 호출
    fetchData(selectedPage, animalTagFilter, wcTagFilter);

    // 페이지 이동 처리
    goToPage(selectedPage);
  };
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const currentPageFromURL = parseInt(searchParams.get("p") || "1", 10);
    setPaginationPage(currentPageFromURL);
    // fetchData 함수를 호출하여 페이지 주소가 변경될 때마다 데이터를 다시 가져오도록 합니다.
    fetchData(currentPageFromURL, animalTagFilter, wcTagFilter);
  }, [location.search, animalTagFilter, wcTagFilter]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const ngrokSkipBrowserWarning = "69420";

        const response = await axios.get(`${api}/members`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
            "ngrok-skip-browser-warning": ngrokSkipBrowserWarning,
          },
        });

        if (isLoggedIn) {
          setUserData(response.data);
        }
      } catch (error) {
        console.error("Error occurred:", error);
      }
    };

    fetchUserData();
  }, [accessToken, isLoggedIn]);

  const moveToWrite = () => {
    if (isLoggedIn) {
      navigate("/writpost");
    } else {
      navigate("/login");
      alert("로그인해주세요");
    }
  };

  const handlePostSubmit = () => {
    fetchData(1, animalTagFilter, wcTagFilter);
    goToPage(1);
  };

  const handleAnimalTagChange = (animalTag: string) => {
    const isSelected = selectedAnimalTags.includes(animalTag);

    if (isSelected) {
      // 이미 선택된 버튼을 클릭한 경우, 선택 취소
      setSelectedAnimalTags(prevTags =>
        prevTags.filter(tag => tag !== animalTag),
      );
    } else {
      // 다른 버튼을 클릭한 경우, 해당 버튼 선택
      setSelectedAnimalTags(prevTags => [...prevTags, animalTag]);
    }
  };

  const handleWCTagChange = (wcTag: string) => {
    // 이미 선택된 산책/돌봄 태그를 클릭한 경우, 선택 취소
    if (selectedWCTag === wcTag) {
      setSelectedWCTag(null);
      fetchData(1, animalTagFilter, null); // 돌봄 태그 선택 취소 시, 해당 태그로 필터링하지 않음
    } else {
      // 다른 산책/돌봄 태그를 클릭한 경우, 해당 태그 선택
      setSelectedWCTag(wcTag);
      setPage(1);
      fetchData(1, animalTagFilter, wcTag);
    }
  };
  return (
    <PageListContainer>
      <PageContainer>
        <SectionContainer>
          <OptionButton
            selected={selectedAnimalTags.length === 0 && !selectedWCTag}
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
            selected={selectedAnimalTags.includes("고양이")}
            onClick={() => {
              setAnimalTagFilter("고양이");
              setPage(1);
              fetchData(1, "고양이", animalTagFilter);

              handleAnimalTagChange("고양이");
            }}
          >
            고양이
          </OptionButton>
          <OptionButton
            selected={selectedAnimalTags.includes("강아지")}
            onClick={() => {
              setAnimalTagFilter("강아지");
              setPage(1);
              fetchData(1, "강아지", animalTagFilter);
              handleAnimalTagChange("강아지");
            }}
          >
            강아지
          </OptionButton>
          <OptionButton
            selected={selectedAnimalTags.includes("기타동물")}
            onClick={() => {
              setAnimalTagFilter("기타동물");
              setPage(1);
              fetchData(1, "기타동물", animalTagFilter);
              handleAnimalTagChange("기타동물");
            }}
          >
            기타
          </OptionButton>
        </SectionContainer>
        <SectionContainer>
          <WcOptionButton
            selected={selectedWCTag === "돌봄"}
            onClick={() => {
              setSelectedWCTag("돌봄");
              handleWCTagChange("돌봄");
              setPage(1);
              fetchData(1, "돌봄", wcTagFilter);
            }}
          >
            돌봄
          </WcOptionButton>
          <WcOptionButton
            selected={selectedWCTag === "산책"}
            onClick={() => {
              setSelectedWCTag("산책");
              handleWCTagChange("산책");
              fetchData(1, "산책", wcTagFilter);
            }}
          >
            산책
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
                          <ContentPage>{post.content}</ContentPage>
                          <NickNamePage>{userData.nickName}</NickNamePage>
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
        itemsCountPerPage={postPerPage}
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
  box-shadow: 4px 4px 30px rgba(39, 44, 86, 0.3);
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
  width: 72px;
  height: 44px;
  border-radius: 8px;
  padding: 8px 16px;
  cursor: pointer;
  justify-content: space-around;
  font-size: 12px;
`;

const WcOptionButton = styled.button<{ selected: boolean }>`
  background-color: ${props => (props.selected ? "#279eff" : "white")};
  color: ${props => (props.selected ? "white" : "#279eff")};
  border: 1px solid #279eff;
  width: 72px;
  height: 44px;
  border-radius: 8px;
  padding: 8px 16px;
  cursor: pointer;
  justify-content: space-around;
  font-size: 16px;
`;
