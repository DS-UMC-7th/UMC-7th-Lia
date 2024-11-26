import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

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
  background-color: ${(props) => props.color || "#111"};
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 8px 12px;
  margin-left: 20px;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    background-color: ${(props) =>
      props.color === "#c4006a" ? "#a0004d" : "#222"};
  }
`;

const Navbar = () => {
  const { user, logout, setUser } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const nickname = user?.email ? user.email.split("@")[0] : "";

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:3000/user/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
    
        if (!response.ok) {
          if (response.status === 500) {
            throw new Error("서버에서 문제가 발생했습니다. 잠시 후 다시 시도하세요.");
          }
          throw new Error("유저 정보를 가져오는 데 실패했습니다.");
        }
    
        const data = await response.json();
        console.log("유저 데이터:", data);
        return data;
      } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
      }
    };
    

    if (!user) {
      fetchUserData(); // 유저 정보가 없을 때만 호출
    }
  }, [user, setUser]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <StyledNav>
      <Logo to="/">YONGCHA</Logo>
      <div>
        {error && <span style={{ color: "red" }}>{error}</span>}
        {nickname ? (
          <>
            <span style={{ color: "#c4006a", marginRight: "20px" }}>
              {nickname}님
            </span>
            <Button as="button" color="#c4006a" onClick={handleLogout}>
              로그아웃
            </Button>
          </>
        ) : (
          <>
            <Button color="#111" to="/login">
              로그인
            </Button>
            <Button color="#c4006a" to="/signup">
              회원가입
            </Button>
          </>
        )}
      </div>
    </StyledNav>
  );
};

export default Navbar;
