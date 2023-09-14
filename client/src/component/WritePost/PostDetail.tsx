import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const api = process.env.REACT_APP_DB_HOST;

const PostDetail = () => {
  const { wcboardId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${api}/wcboard/${wcboardId}`, {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            Accept: "application/json",
            "ngrok-skip-browser-warning": "69420",
          },
        });

        setPost(response.data);
      } catch (error) {
        console.error("API 요청 중 오류 발생:", error);
      }
    };

    fetchData();
  }, [wcboardId]);

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
};

export default PostDetail;
