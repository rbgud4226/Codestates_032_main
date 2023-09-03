import React from "react";
import styled from "styled-components";

const Petsitter = ({ petSitter }: { petSitter: boolean }) => {
  return (
    <Container>
      {petSitter ? (
        <PetSitterContainer>
          <NameWrapper>
            <h2>펫시터 홍길동</h2>
          </NameWrapper>
          <InfoWrapper>
            <Item>
              <div>케어활동수</div>
              <div>10회</div>
            </Item>
            <Item>
              <div>리뷰수</div>
              <div>5개</div>
            </Item>
            <Item>
              <div>평점</div>
              <div>4.5</div>
            </Item>
          </InfoWrapper>
        </PetSitterContainer>
      ) : (
        <PetSitterContainer>
          <h2>펫시터 등록하기</h2>
          <p>원할 때 일해봐요!</p>
          <RegisterButton>등록하기</RegisterButton>
        </PetSitterContainer>
      )}
    </Container>
  );
};

export default Petsitter;

const Container = styled.div`
  margin-top: 8px;

  text-align: center;
`;

const PetSitterContainer = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
`;
const InfoWrapper = styled.div`
  display: flex;
  padding: 8px;
  background-color: #82bec2;
  justify-content: space-between;
`;

const NameWrapper = styled.div`
  padding: 8px;
  text-align: left;
  background-color: pink;
`;
const Item = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px;
  background-color: pink;
`;

const RegisterButton = styled.button`
  background-color: #279eff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
`;
