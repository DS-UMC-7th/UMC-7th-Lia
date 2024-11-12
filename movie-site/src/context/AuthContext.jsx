import React, { createContext, useContext, useState } from "react";
import { useFetchUser, useLoginMutation, useRefreshAccessTokenMutation } from "../hooks/queries/useAuthQueries";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { data: user, isLoading } = useFetchUser(); // 유저 정보 Fetch
  const loginMutation = useLoginMutation(); // 로그인 Mutation
  const refreshAccessTokenMutation = useRefreshAccessTokenMutation(); // 토큰 갱신 Mutation

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login: loginMutation.mutate,
        logout,
        refreshAccessToken: refreshAccessTokenMutation.mutate,
      }}
    >
      {isLoading ? <p>로딩 중...</p> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
