import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import useForm from "../hooks/use-form.js";
import { validationLogin } from "../utils/validate.js";

const Loginpage = () => {
  const navigate = useNavigate();
  const { login: loginUser, setUser } = useAuth();
  const [apiError, setApiError] = useState(null);

  const login = useForm({
    initialValue: {
      email: "",
      password: "",
    },
    validate: validationLogin,
  });

  const handlePressLogin = async (e) => {
    e.preventDefault();
    setApiError(null);
  
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: login.values.email,
          password: login.values.password,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || "로그인 정보가 유효하지 않습니다.");
      }
  
      const result = await response.json();
      console.log("로그인 응답 데이터:", result);
  
      // Access Token 및 Refresh Token 저장
      localStorage.setItem("accessToken", result.accessToken);
      localStorage.setItem("refreshToken", result.refreshToken);
  
      if (!result.user) {
        // /user/me 호출로 유저 정보 가져오기
        const userResponse = await fetch("http://localhost:3000/user/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${result.accessToken}`,
          },
        });
  
        if (!userResponse.ok) {
          const errorData = await userResponse.text();
          throw new Error(
            errorData || "유저 정보를 가져오는 데 실패했습니다."
          );
        }
  
        const userData = await userResponse.json();
        console.log("유저 정보:", userData);
        setUser(userData); // 유저 정보 저장
      } else {
        setUser(result.user);
      }
  
      loginUser({
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      });
  
      navigate("/");
    } catch (error) {
      setApiError(error.message);
      console.error("Error:", error);
    }
  };
  
  

  const handleTokenRefresh = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      setApiError("로그인이 만료되었습니다. 다시 로그인하세요.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/auth/token/access", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          // Refresh Token 만료 시 로그아웃 처리
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          navigate("/login");
          throw new Error("Refresh Token이 만료되었습니다. 다시 로그인하세요.");
        }
        throw new Error("토큰 재발급 실패");
      }

      const result = await response.json();
      console.log("토큰 재발급 성공:", result);

      // 새 토큰 저장
      localStorage.setItem("accessToken", result.accessToken);
      localStorage.setItem("refreshToken", result.refreshToken);
    } catch (error) {
      setApiError(error.message);
      console.error("토큰 재발급 에러:", error);
    }
  };

  return (
    <Container>
      <h3>로그인</h3>
      {apiError && <ErrorText>{apiError}</ErrorText>}
      <Form onSubmit={handlePressLogin}>
        <Input
          error={login.touched.email && !!login.errors.email}
          type="email"
          placeholder="이메일을 입력해주세요!"
          {...login.getTextInputProps("email")}
        />
        {login.touched.email && login.errors.email && (
          <ErrorText>{login.errors.email}</ErrorText>
        )}

        <Input
          error={login.touched.password && !!login.errors.password}
          type="password"
          placeholder="비밀번호를 입력해주세요!"
          {...login.getTextInputProps("password")}
        />
        {login.touched.password && login.errors.password && (
          <ErrorText>{login.errors.password}</ErrorText>
        )}

        <LoginButton type="submit">로그인</LoginButton>
      </Form>
      <RefreshButton type="button" onClick={handleTokenRefresh}>
        Access Token 재발급
      </RefreshButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  color: white;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input.withConfig({
  shouldForwardProp: (prop) => prop !== "error",
})`
  padding: 10px;
  margin: 10px 0;
  border-radius: 10px;
  width: 400px;
  background-color: white;
  border: ${({ error }) => (error ? "4px solid red" : "1px solid #ccc")};

  &:focus {
    border-color: #000080;
  }
`;

const LoginButton = styled.button`
  padding: 10px;
  margin: 10px 0;
  border-radius: 10px;
  width: 420px;
  color: white;
  border: none;
  background-color: #c4006a;

  &:hover {
    background-color: #000080;
    color: #fff;
  }
`;

const RefreshButton = styled.button`
  padding: 10px;
  margin: 10px 0;
  border-radius: 10px;
  width: 420px;
  color: white;
  border: none;
  background-color: #007bff;

  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorText = styled.h1`
  color: red;
  font-size: 12px;
`;

export default Loginpage;
