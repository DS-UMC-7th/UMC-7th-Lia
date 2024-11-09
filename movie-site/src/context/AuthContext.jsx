import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (userInfo) => {
    if (userInfo && userInfo.accessToken && userInfo.refreshToken) {
      setUser(userInfo);
      localStorage.setItem('accessToken', userInfo.accessToken);
      localStorage.setItem('refreshToken', userInfo.refreshToken);

      try {
        const response = await fetch('http://localhost:3000/user/me', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${userInfo.accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('유저 정보를 불러오는 데 실패했습니다.');
        }

        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user data after login:', error);
      }
    } else {
      console.error('로그인 정보가 유효하지 않습니다.');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  };

  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      console.error('Refresh token is missing');
      logout();
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/auth/token/access', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${refreshToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '토큰 재발급 실패');
      }

      const result = await response.json();
      setUser((prevUser) => ({
        ...prevUser,
        accessToken: result.accessToken,
      }));
      localStorage.setItem('accessToken', result.accessToken);
    } catch (error) {
      console.error('토큰 재발급 에러:', error);
      logout(); // 토큰 재발급 실패 시 로그아웃 처리
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, refreshAccessToken, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
