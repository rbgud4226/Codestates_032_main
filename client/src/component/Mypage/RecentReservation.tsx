import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const RecentReservation = () => {
  const [deposited, setdeposited] = useState([]);
  const [careRecent, setCareRecent] = useState([]);

  useEffect(() => {
    const api = process.env.REACT_APP_DB_HOST;
    const ngrokSkipBrowserWarning = "69420";
    const page = 1;
    const fetchRecentDeposits = async () => {
      try {
        const response = await axios.get(`${api}/members`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            Accept: "application/json",
            "ngrok-skip-browser-warning": ngrokSkipBrowserWarning,
          },
          params: {
            page: page,
          },
        });

        const responseData = response.data;
        setdeposited(responseData.wcBoardDtoGet);
      } catch (error) {
        console.error("데이터를 불러오는 중 오류가 발생했습니다.", error);
      }
    };

    const fetchRecentCare = async () => {
      try {
        const response = await axios.get(`${api}/petsitter/recent`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            Accept: "application/json",
            "ngrok-skip-browser-warning": ngrokSkipBrowserWarning,
          },
          params: {
            page: page,
          },
        });

        const responseData = response.data;
        setCareRecent(responseData.data);
      } catch (error) {
        console.error("데이터를 불러오는 중 오류가 발생했습니다.", error);
      }
    };

    fetchRecentDeposits();
    fetchRecentCare();
  }, []);

  console.log("최근맡긴내역 :", deposited);

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

  return (
    <Container>
      <Category>
        <CategoryTitle>최근 맡긴 예약</CategoryTitle>
        {deposited.length === 0 ? (
          <Message>아직 맡긴 내역이 없습니다!</Message>
        ) : (
          <RecentContainer>
            {deposited.map(reservation => (
              <ReservationItem key={reservation.wcboardId}>
                <Left>
                  {reservation.wcTag}{" "}
                  {calculateDuration(
                    reservation.startTime,
                    reservation.endTime,
                  )}
                  <ImgContainer>
                    <ProfileImage
                      src={reservation.petSitterImage}
                      alt="Profile Image"
                    />
                  </ImgContainer>
                </Left>
                <Details>
                  <Item>{reservation.petSitterNickname}님</Item>
                  <TimeItem>
                    {reservation.startTime}-{reservation.endTime}
                  </TimeItem>
                </Details>
              </ReservationItem>
            ))}
          </RecentContainer>
        )}
      </Category>

      <Category>
        <CategoryTitle>최근 케어 내역</CategoryTitle>
        {careRecent.length === 0 ? (
          <Message>아직 케어 내역이 없습니다!</Message>
        ) : (
          <RecentContainer>
            {careRecent.map(reservation => (
              <ReservationItem key={reservation.id}>
                <Left>
                  {reservation.wcTag}{" "}
                  {calculateDuration(
                    reservation.startTime,
                    reservation.endTime,
                  )}
                  <ImgContainer>
                    <ProfileImage
                      src={reservation.memberImage} // 서버에서 받아온 프로필 이미지 URL을 사용
                      alt="Profile Image"
                    />
                  </ImgContainer>
                </Left>
                <Details>
                  <Item>{reservation.nickName}님</Item>
                  <TimeItem>
                    {reservation.startTime} - {reservation.endTime}
                  </TimeItem>
                </Details>
              </ReservationItem>
            ))}
          </RecentContainer>
        )}
      </Category>
    </Container>
  );
};

export default RecentReservation;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Category = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
`;

const CategoryTitle = styled.p`
  font-size: 18px;
  margin-bottom: 8px;
`;

const RecentContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  box-shadow: 4px 4px 30px rgba(39, 44, 86, 0.3);
  width: 100%;
`;

const ReservationItem = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #ccc;
`;

const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 84px;
  height: 84px;
  padding: 8px;
  margin-top: 8px;
  background-color: #279eff;
  border-radius: 50%;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
`;

const Details = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 16px;
  font-size: 16px;
`;

const Item = styled.p`
  margin-bottom: 8px;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
`;

const TimeItem = styled.div`
  font-size: 12px;
`;
const Message = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  box-shadow: 4px 4px 30px rgba(39, 44, 86, 0.3);
  width: 100%;
  height: 96px;
`;
