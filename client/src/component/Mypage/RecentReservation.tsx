import React from "react";
import styled from "styled-components";
import ProfileImg from "./ProfileImg";

const RecentReservation = () => {
  // 예약 내역 더미 데이터
  const reservations = [
    {
      id: 1,
      wcTag: "산책",
      profileImage: <ProfileImg />,
      startTime: "2023-09-01 10:00",
      endTime: "2023-09-01 11:00",
      userName: "홍길동",
      duration: "1시간",
      category: "entrusted",
    },
    {
      id: 2,
      wcTag: "돌봄",
      profileImage: <ProfileImg />,
      startTime: "2023-09-02 14:00",
      endTime: "2023-09-02 16:00",
      userName: "이몽룡",
      duration: "2시간",
      category: "cared",
    },
  ];

  const entrustedReservations = reservations.filter(
    reservation => reservation.category === "entrusted",
  );

  const caredReservations = reservations.filter(
    reservation => reservation.category === "cared",
  );

  return (
    <Container>
      <Category>
        <CategoryTitle>최근 맡긴 예약</CategoryTitle>
        <RecentContainer>
          {entrustedReservations.map(reservation => (
            <ReservationItem key={reservation.id}>
              <Left>
                {reservation.wcTag} {reservation.duration}
                <ImgContainer>{reservation.profileImage}</ImgContainer>
              </Left>
              <Details>
                <Item>{reservation.userName}님</Item>
                <TimeItem>
                  {reservation.startTime}-{reservation.endTime}
                </TimeItem>
              </Details>
            </ReservationItem>
          ))}
        </RecentContainer>
      </Category>

      <Category>
        <CategoryTitle>최근 케어 내역</CategoryTitle>
        <RecentContainer>
          {caredReservations.map(reservation => (
            <ReservationItem key={reservation.id}>
              <Left>
                {reservation.wcTag} {reservation.duration}
                <ImgContainer>{reservation.profileImage}</ImgContainer>
              </Left>
              <Details>
                <Item>{reservation.userName}님</Item>
                <TimeItem>
                  {reservation.startTime}-{reservation.endTime}
                </TimeItem>
              </Details>
            </ReservationItem>
          ))}
        </RecentContainer>
      </Category>
    </Container>
  );
};

export default RecentReservation;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;

const Category = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
`;

const CategoryTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 8px;
`;

const RecentContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 320px;
  border-radius: 8px;
  box-shadow: 4px 4px 30px rgba(39, 44, 86, 0.3);
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
