import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (userInfo) => {
    if (userInfo && userInfo.accessToken && userInfo.refreshToken) {
      setUser(userInfo);
      // Access Token과 Refresh Token을 로컬 스토리지에 저장
      localStorage.setItem('accessToken', userInfo.accessToken);
      localStorage.setItem('refreshToken', userInfo.refreshToken);
  
      // 유저 정보를 추가로 가져오는 API 호출
      try {
        const response = await fetch('http://localhost:3000/user/me', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${userInfo.accessToken}`, // 로그인 시 받은 accessToken 사용
          },
        });
  
        if (!response.ok) {
          throw new Error('유저 정보를 불러오는 데 실패했습니다.');
        }
  
        const userData = await response.json();
        setUser(userData); // 유저 정보 업데이트
  
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
      throw new Error('Refresh token is missing');
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
        accessToken: result.accessToken, // 새로운 accessToken 업데이트
      }));
      // 새로운 Access Token을 로컬 스토리지에 저장
      localStorage.setItem('accessToken', result.accessToken);
    } catch (error) {
      console.error('토큰 재발급 에러:', error);
      throw error;
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
