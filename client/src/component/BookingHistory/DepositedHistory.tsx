import React, { useEffect, useState } from "react";
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DepositedHistory = () => {
  const navigate = useNavigate();
  const [wcBoardList, setWcBoardList] = useState([]);
  const [totalBoard, setTotalBoard] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const pageSize = 2;
  useEffect(() => {
    const api = process.env.REACT_APP_DB_HOST;
    const ngrokSkipBrowserWarning = "69420";

    const fetchData = async () => {
      try {
        const response = await axios.get(`${api}/members/alls`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            Accept: "application/json",
            "ngrok-skip-browser-warning": ngrokSkipBrowserWarning,
          },
        });

        const responseData = response.data;
        setWcBoardList(responseData.wcBoardList);
        setTotalBoard(responseData.totalBoard);
        console.log(responseData);
      } catch (error) {
        console.error("데이터를 불러오는 중 오류가 발생했습니다.", error);
      }
    };

    fetchData();
  }, []);

  //총 시간 계산
  const calculateDuration = (startTime, endTime) => {
    const start = new Date(startTime);
    const end = new Date(endTime);

    const timeDifferenceInMs = end.getTime() - start.getTime();

    const hours = Math.floor(timeDifferenceInMs / 3600000);
    const remainingMilliseconds = timeDifferenceInMs % 3600000;
    const minutes = Math.floor(remainingMilliseconds / 60000);

    return `${hours}시간 ${minutes}분`;
  };

  const loadMoreData = () => {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const newData = wcBoardList.slice(startIndex, endIndex);

    if (newData.length === 0) {
      setHasMore(false);
    } else {
      setWcBoardList(prevData => [...prevData, ...newData]);
      setPage(page + 1);
    }
  };

  return (
    <Container>
      <CategoryTitle>맡긴 내역</CategoryTitle>
      {wcBoardList.length === 0 ? (
        <NoReservations>
          등록된 예약이 없습니다.
          <ReserveButton onClick={() => navigate("/mainpage")}>
            예약하기
          </ReserveButton>
        </NoReservations>
      ) : (
        <InfiniteScroll
          dataLength={wcBoardList.length}
          next={loadMoreData}
          hasMore={hasMore}
          loader={<Loader>Loading...</Loader>}
          style={{ height: "auto", overflow: "unset" }}
        >
          {wcBoardList.map((wcBoard, index) => (
            <ReservationItem key={`${wcBoard.wcboardId}_${index}`}>
              <Top>
                <TopLeft>
                  {wcBoard.wcTag}{" "}
                  {calculateDuration(wcBoard.startTime, wcBoard.endTime)}
                </TopLeft>
                <TopRight>
                  {wcBoard.postStatus === "COMPLETE"
                    ? "완료"
                    : wcBoard.postStatus === "IN_RESERVATION"
                    ? "예약중"
                    : "진행중"}
                </TopRight>
              </Top>
              <Bottom>
                <BottomLeft>
                  <ImgContainer>
                    <ProfileImage
                      src={wcBoard.images} // 서버에서 받아온 프로필 이미지 URL을 사용
                      alt="Profile Image"
                    />
                  </ImgContainer>
                </BottomLeft>
                <BottomRight>
                  <Item>{wcBoard.name}님</Item>
                  <TimeItem>
                    {wcBoard.startTime}-{wcBoard.endTime}
                  </TimeItem>
                </BottomRight>
              </Bottom>
            </ReservationItem>
          ))}
        </InfiniteScroll>
      )}
    </Container>
  );
};

export default DepositedHistory;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const CategoryTitle = styled.p`
  font-size: 18px;
  margin-bottom: 8px;
`;

const NoReservations = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ReserveButton = styled.button`
  background-color: #279eff;
  color: white;
  padding: 8px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  width: fit-content;
  margin-top: 8px;
`;

const ReservationItem = styled.div`
  padding: 16px;
  margin-bottom: 16px;
  border-radius: 8px;
  box-shadow: 4px 4px 30px rgba(39, 44, 86, 0.3);
`;

const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 92px;
  height: 92px;
  padding: 8px;
  margin-top: 8px;
  background-color: #279eff;
  border-radius: 50%;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
`;

const BottomRight = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  font-size: 16px;
`;

const Item = styled.p`
  margin-bottom: 8px;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
`;
const TopLeft = styled.div`
  color: #279eff;
  font-size: 16px;
`;
const TopRight = styled.div`
  color: #279eff;
  font-size: 16px;
`;

const Bottom = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const BottomLeft = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 32px;
`;

const TimeItem = styled.div`
  font-size: 12px;
`;

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  font-size: 16px;
`;
