import axios from "axios";
//NGrok 갱신마다 이 페이지의 주소만 바꾸면됨.
export async function fetchData({ email, password }, setErrorMsg) {
  const api = process.env.REACT_APP_DB_HOST;

  try {
    const data = {
      email: email,
      password: password,
    };
    const res = await axios.post(`${api}/members/login`, data);
    console.log(res);
    const userData = {
      nickName: res.data.nickName,
      profileImage: res.data.profileImage,
      accessToken: res.headers.authorization,
      refreshToken: res.headers.refresh,
    };
    return userData;
  } catch (error) {
    setErrorMsg("로그인 정보를 확인하세요");
  }
}
