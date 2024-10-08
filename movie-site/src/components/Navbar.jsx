import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
  return (
    <StyledNav>
      <Logo to="/">YONGCHA</Logo>
      <div>
        <Button color="#111" to="/login">로그인</Button>
        <Button color="#c4006a" to="/signup">회원가입</Button>
      </div>
    </StyledNav>
  );
};

export default Navbar;
