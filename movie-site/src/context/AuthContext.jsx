import React, { createContext, useContext, useState, useEffect } from "react";
import { useFetchUser, useLoginMutation, useRefreshAccessTokenMutation } from "../hooks/queries/useAuthQueries";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { data: fetchedUser, isLoading } = useFetchUser();
  const loginMutation = useLoginMutation();
  const refreshAccessTokenMutation = useRefreshAccessTokenMutation();

  // 유저 정보를 Fetch 시 동기화
  useEffect(() => {
    if (fetchedUser) {
      setUser(fetchedUser);
    }
  }, [fetchedUser]);

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
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
    throw new Error("useAuth는 AuthProvider 내부에서만 사용할 수 있습니다.");
  }
  return context;
};
