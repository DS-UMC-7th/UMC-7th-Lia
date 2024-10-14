import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar'; 
import Sidebar from '../components/Sidebar'; 
import styled from 'styled-components';

// 전체 레이아웃을 감싸는 컨테이너
const Container = styled.div`
  background: #000; 
  height: 100vh; 
  display: flex;
  flex-direction: column; 
`;

// 내비바 아래에 위치할 컨텐츠 영역
const Content = styled.div`
  display: flex;
  flex: 1; 
  overflow-y: auto; 
`;

// 사이드바 스타일
const StyledSidebar = styled(Sidebar)`
  width: 160px; 
`;

// 콘텐츠 영역
const MainContent = styled.div`
  flex: 1; 
  padding: 5px; 
  overflow-y: auto; 
`;

const RootLayout = () => {
  return (
    <Container>
      <Navbar /> 
      <Content>
        <StyledSidebar /> 
        <MainContent>
          <Outlet /> 
        </MainContent>
      </Content>
    </Container>
  );
};

export default RootLayout;
