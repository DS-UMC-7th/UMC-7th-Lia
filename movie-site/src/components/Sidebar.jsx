import React from 'react';
import styled from 'styled-components';
import { FaSearch, FaFilm ,FaTv } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const StyledSidebar = styled.aside`
  width: 160px;
  background: #111; 
  color: #fff;
  padding: 15px;
  display: flex;
  flex-direction: column;
`;

const MenuItem = styled(Link)`
  margin: 10px 0;
  color: #fff;
  text-decoration: none;
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    color: #ccc;
  }
`;

const Sidebar = () => {
  return (
    <StyledSidebar>
      <MenuItem to="/search">
        <FaSearch style={{ marginRight: '15px' }} /> 찾기
      </MenuItem>
      <MenuItem to="/movies">
        <FaFilm style={{ marginRight: '15px' }} /> 영화
      </MenuItem>
      <MenuItem to="/tv">
        <FaTv  style={{ marginRight: '15px' }} /> TV
      </MenuItem>
    </StyledSidebar>
  );
};

export default Sidebar;
