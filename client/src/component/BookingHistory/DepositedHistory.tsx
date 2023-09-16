import React from "react";
import styled from "styled-components";

const DepositedHistory = () => {
  const wcBoards = [
    {
      id: 1,
      wcTag: "산책",
      profileImage: "", // 프로필 이미지를 여기에 추가해야 합니다.
      startTime: "2023-09-01 10:00",
      endTime: "2023-09-01 11:00",
      userName: "홍길동",
      duration: "1시간",
      category: "entrusted",
    },
    {
      id: 2,
      wcTag: "케어",
      profileImage: "", // 프로필 이미지를 여기에 추가해야 합니다.
      startTime: "2023-09-02 14:00",
      endTime: "2023-09-02 15:00",
      userName: "김루피",
      duration: "1시간",
      category: "entrusted",
    },
    {
      id: 3,
      wcTag: "케어",
      profileImage: "", // 프로필 이미지를 여기에 추가해야 합니다.
      startTime: "2023-09-02 14:00",
      endTime: "2023-09-02 15:00",
      userName: "신조로",
      duration: "1시간",
      category: "entrusted",
    },
    {
      id: 4,
      wcTag: "케어",
      profileImage: "", // 프로필 이미지를 여기에 추가해야 합니다.
      startTime: "2023-09-02 14:00",
      endTime: "2023-09-02 15:00",
      userName: "송로빈",
      duration: "1시간",
      category: "entrusted",
    },
    {
      id: 5,
      wcTag: "케어",
      profileImage: "", // 프로필 이미지를 여기에 추가해야 합니다.
      startTime: "2023-09-02 14:00",
      endTime: "2023-09-02 15:00",
      userName: "최우솝",
      duration: "1시간",
      category: "entrusted",
    },
    // 추가적인 예약 정보를 필요에 따라 배열에 추가할 수 있습니다.
  ];

  return (
    <Container>
      <CategoryTitle>케어 내역</CategoryTitle>

      <RecentContainer>
        {wcBoards.map(wcBoard => (
          <ReservationItem key={wcBoard.id}>
            <Top>
              {wcBoard.wcTag} {wcBoard.duration}
            </Top>
            <Bottom>
              <Left>
                <ImgContainer>
                  <img src={wcBoard.profileImage} alt="프로필 이미지" />
                </ImgContainer>
              </Left>
              <Details>
                <Item>{wcBoard.userName}님</Item>
                <TimeItem>
                  {wcBoard.startTime}-{wcBoard.endTime}
                </TimeItem>
              </Details>
            </Bottom>
          </ReservationItem>
        ))}
      </RecentContainer>
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

const RecentContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  box-shadow: 4px 4px 30px rgba(39, 44, 86, 0.3);
  width: 100%;
`;

const ReservationItem = styled.div`
  padding: 16px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 8px; /* 각각의 컨테이너 사이에 간격 추가 */
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

const Details = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  font-size: 16px;
`;

const Item = styled.p`
  margin-bottom: 8px;
`;

const Top = styled.div`
  color: #279eff;
  font-size: 20px;
`;

const Bottom = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Left = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 32px;
`;

const TimeItem = styled.div`
  font-size: 12px;
`;
