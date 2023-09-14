import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const api = process.env.REACT_APP_DB_HOST;

const PostDetailPage = () => {
  const { wcboardId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${api}/wcboard/1`, {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            Accept: "application/json",
            "ngrok-skip-browser-warning": "69420",
          },
        });
        console.log(response.data);
        setPost(response.data); // 여기에서 .data를 사용하여 데이터를 가져옵니다.
      } catch (error) {
        console.error("API 요청 중 오류 발생:", error);
      }
    };

    fetchData();
  }, [wcboardId]);

  // if (!post) {
  //   return <p>Loading...</p>;
  // }

  return (
    <PDCtn>
      <Logo src={"/Logo.png"} />
    </PDCtn>
  );
};

export default PostDetailPage;

export const PDCtn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Logo = styled.img`
  height: 50px;
  width: 60px;
`;

export const PostSection = styled.section``;
