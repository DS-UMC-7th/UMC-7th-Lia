import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // AuthContext에서 useAuth 가져오기

const StyledNav = styled.nav`
  background: #111;
  color: #c4006a;
  height: 60px;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  color: #c4006a;
  font-size: 24px;
  text-decoration: none;
`;

const Button = styled(Link)`
  background-color: ${props => props.color || '#111'};
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 8px 12px;
  margin-left: 20px;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    background-color: ${props => 
      props.color === '#c4006a' ? '#a0004d' : '#222'};
  }
`;

const Navbar = () => {
  const { user, logout, setUser } = useAuth(); // AuthContext에서 user와 logout, setUser 가져오기
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  // 유저의 이메일에서 @ 앞부분 추출
  const nickname = user && user.email ? user.email.split('@')[0] : ''; 

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('accessToken'); // 토큰 가져오기
      if (!token) return; // 토큰이 없으면 함수 종료
  
      try {
        const response = await fetch('http://localhost:3000/user/me', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Authorization 헤더에 토큰 추가
          },
        });
  
        if (!response.ok) {
          throw new Error('유저 정보를 불러오는 데 실패했습니다.'); // 에러 처리
        }
  
        const userData = await response.json();
        console.log('유저 정보:', userData);
        // 유저 정보를 AuthContext에 업데이트하는 방법을 구현하세요.
      } catch (error) {
        setError(error.message);
        console.error('Error fetching user data:', error);
      }
    };
  
    fetchUserData();
  }, []); // 컴포넌트가 마운트될 때 한 번 실행
  

  return (
    <StyledNav>
      <Logo to="/">YONGCHA</Logo>
      <div>
        {error && <span style={{ color: 'red' }}>{error}</span>} 
        {nickname ? (
          <>
            <span style={{ color: '#c4006a', marginRight: '20px' }}>{nickname}님</span>
            <Button color="#c4006a" onClick={handleLogout}>로그아웃</Button>
          </>
        ) : (
          <>
            <Button color="#111" to="/login">로그인</Button>
            <Button color="#c4006a" to="/signup">회원가입</Button>
          </>
        )}
      </div>
    </StyledNav>
  );
};

export default Navbar;
