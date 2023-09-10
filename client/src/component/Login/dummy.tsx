export const po = 12;
// "use client";
// import * as yup from "yup";
// import Link from "next/link";
// import useAPI from "@api/index";
// import React, { useState } from "react";
// import { toast } from "react-toastify";
// import { SignupShemeType } from "type";
// import { setCookie } from "cookies-next";
// import axios, { AxiosError } from "axios";
// import { useForm } from "react-hook-form";
// import { styled } from "styled-components";
// import { Main } from "@styles/commonStyles";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { usePathname, useRouter } from "next/navigation";

// // * yup schema 처리
// const schema = yup.object().shape({
//   username: yup.string().required("ID는 필수입니다."),
//   password: yup
//     .string()
//     .min(6, "비밀번호는 6자리 이상이어야 합니다.")
//     .max(15, "비밀번호는 15자리 이하여야 합니다.")
//     .required("비밀번호는 6~15자리 사이여야 합니다."),
// });

// export default function LoginSignupPage() {
//   const router = useRouter();
//   const apiServer = useAPI();
//   // * LOGIN, SIGNUP 페이지 별로 함수, UI 분기 처리
//   const pathname = usePathname();
//   const BtnText = pathname === "/login" ? "LOGIN" : "SIGNUP";

//   //* 이미 존재하는 아이디, 닉네임 에러 메시지
//   const [errorMsg, setErrorMsg] = useState("");

//   // * 회원가입, 로그인 함수
//   const handlePostSignupLogin = async (data: SignupShemeType) => {
//     try {
//       if (BtnText === "LOGIN") {
//         const { data: result } = await apiServer.post(`/auth/local`, {
//           identifier: data.username.trim(),
//           password: data.password.trim(),
//         });
//         if (result.jwt) {
//           setCookie("_ga_t", result.jwt, {
//             expires: new Date(new Date().setDate(new Date().getDate() + 30)),
//           });
//           window.location.href = "/";
//         }
//       } else {
//         await apiServer.post(`/users`, {
//           ...data,
//           email: `${data.nickname}@drink.com`,
//           role: 1,
//           profile: 2,
//         });
//         toast.success("회원가입을 축하합니다", {
//           autoClose: 1000,
//           hideProgressBar: true,
//         });
//         setTimeout(() => {
//           router.push("/login");
//         }, 1000);
//       }
//     } catch (e: AxiosError | unknown) {
//       if (axios.isAxiosError(e)) {
//         if (e.response?.data.error.message === "Email already taken") {
//           setErrorMsg("이미 존재하는 닉네임입니다");
//         }
//         if (e.response?.data.error.message === "This attribute must be unique")
//           setErrorMsg("이미 존재하는 아이디입니다");
//       }
//     }
//   };

//   // * react-hook-from
//   const {
//     register,
//     handleSubmit,
//     formState: { errors }, // 버전 6라면 errors라고 작성함.
//   } = useForm({
//     resolver: yupResolver(schema),
//   });

//   return (
//     <Main>
//       <Logo>Drink Acrhive</Logo>
//       <LoginCard onSubmit={handleSubmit(handlePostSignupLogin)}>
//         <TextInput placeholder="ID" {...register("username")} />
//         {errorMsg.includes("아이디") && <ErrorMsg>{errorMsg}</ErrorMsg>}
//         {errors?.username && <ErrorMsg>{errors?.username.message}</ErrorMsg>}
//         <TextInput
//           placeholder="PASSWORD"
//           type="password"
//           autoComplete="off"
//           {...register("password")}
//         />
//         {errors?.password && <ErrorMsg>{errors?.password?.message}</ErrorMsg>}
//         {BtnText === "SIGNUP" && (
//           <>
//             <TextInput
//               placeholder="PASSWORD CONFIRM"
//               type="password"
//               autoComplete="off"
//               {...register("confirmPassword")}
//             />
//             {errors?.confirmPassword && (
//               <ErrorMsg>{errors?.confirmPassword?.message}</ErrorMsg>
//             )}
//             <TextInput placeholder="NICKNAME" {...register("nickname")} />
//             {errors?.nickname && (
//               <ErrorMsg>{errors?.nickname?.message}</ErrorMsg>
//             )}
//           </>
//         )}
//         {errorMsg.includes("닉네임") && <ErrorMsg>{errorMsg}</ErrorMsg>}
//         <BtnWrap>
//           <Btn>{BtnText}</Btn>
//         </BtnWrap>
//       </LoginCard>
//       {BtnText === "LOGIN" && (
//         <Link href={"/signup"} title="signup">
//           <GoSignup>회원 가입 하러 가기</GoSignup>
//         </Link>
//       )}
//     </Main>
//   );
// }

// const Logo = styled.div`
//   margin-bottom: 24px;
//   ${({ theme }) => theme.textSize.S32W700};
// `;

// const LoginCard = styled.form`
//   display: flex;
//   flex-direction: column;
//   width: 100%;
//   max-width: 400px;
//   padding: 40px 24px;
//   border-radius: 36px;
//   background-color: white;
//   box-shadow: ${({ theme }) => `2px 3px 10px ${theme.shadow}`};
//   gap: 24px;
// `;

// const BtnWrap = styled.div`
//   display: flex;
//   width: 100%;
//   gap: 16px;
// `;

// const TextInput = styled.input`
//   padding: 16px;
//   border: none;
//   border-radius: 24px;
//   background-color: ${({ theme }) => theme.gray.gray90};
//   color: ${({ theme }) => theme.gray.gray10};

//   ${({ theme }) => theme.textSize.S14W400};
// `;

// const Btn = styled.button`
//   flex: 1;
//   padding: 16px 36px;
//   transition: all 0.3s;
//   border: 1px solid ${({ theme }) => theme.palette.orange};
//   border-radius: 24px;
//   background-color: white;
//   color: ${({ theme }) => theme.palette.orange};

//   ${({ theme }) => theme.textSize.S16W700};
//   &:hover {
//     background-color: ${({ theme }) => theme.palette.orange};
//     color: white;
//   }

//   &:active {
//     opacity: 0.5;
//     background-color: ${({ theme }) => theme.palette.orange};
//   }
// `;

// const GoSignup = styled.div`
//   margin-top: 16px;
//   border-bottom: 1px solid ${({ theme }) => theme.gray.gray70};
//   color: ${({ theme }) => theme.gray.gray50};
//   cursor: pointer;

//   ${({ theme }) => theme.textSize.S14W400};
//   &:active {
//     opacity: 0.5;
//   }
// `;

// const ErrorMsg = styled.div`
//   margin-top: -16px;
//   margin-bottom: -16px;
//   margin-left: 8px;
//   color: ${({ theme }) => theme.palette.orange};
//   ${({ theme }) => theme.textSize.S12W400};
// `;

// const ToastMsg = styled.div`
//   color: ${({ theme }) => theme.gray.gray10};
//   ${({ theme }) => theme.textSize.S16W400};
// `;
