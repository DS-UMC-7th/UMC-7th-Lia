import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import useForm from '../hooks/use-form.js';
import { validationLogin } from '../utils/validate.js';
import api from '../apis/axios'; // Axios 인스턴스 가져오기

const Loginpage = () => {
  const navigate = useNavigate();
  const { login: loginUser, setUser } = useAuth();
  const [apiError, setApiError] = useState(null);

  const login = useForm({
    initialValue: {
      email: '',
      password: '',
    },
    validate: validationLogin,
  });

  const handlePressLogin = async (e) => {
    e.preventDefault();
    setApiError(null);
  
    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: login.values.email,
          password: login.values.password,
        }),
      });
  
      // 응답이 성공적인지 확인
      if (!response.ok) {
        // 응답에서 JSON 데이터를 가져오는 부분 수정
        const errorData = await response.text(); // text()로 응답을 가져오기
        throw new Error(errorData || '이메일 또는 비밀번호가 올바르지 않습니다.');
      }
  
      // 성공적인 경우 응답을 JSON으로 변환
      const result = await response.json(); // 여기서 json()을 사용
  
      console.log('로그인 성공:', result);
  
      // 로그인 시 받은 유저 정보를 setUser로 설정
      setUser(result.user); // 로그인 응답에서 user 정보를 사용하여 상태 업데이트
      loginUser({ accessToken: result.accessToken, refreshToken: result.refreshToken });
      navigate('/');
      
    } catch (error) {
      setApiError(error.message);
      console.error('Error:', error);
    }
  };
  
  const handleTokenRefresh = async () => {
    try {
      const response = await api.post('/auth/token/access', {}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('refreshToken')}` // 저장된 refreshToken 사용
        }
      }); // 토큰 재발급 요청
  
      const { accessToken, refreshToken } = response.data;
  
      // 새로 받은 토큰을 로컬 스토리지에 저장
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
  
      // 콘솔에 새로 받은 토큰 출력
      console.log('Access Token 재발급 성공:', accessToken);
      console.log('Refresh Token 재발급 성공:', refreshToken);
      
    } catch (error) {
      setApiError('토큰 재발급 오류: ' + error.message);
      console.error('토큰 재발급 에러:', error);
    }
  };
  
  

  return (
    <Container>
      <h3>로그인</h3>
      {apiError && <ErrorText>{apiError}</ErrorText>}
      <Form onSubmit={handlePressLogin}>
        <Input 
          error={login.touched.email && login.errors.email} 
          type='email' 
          placeholder='이메일을 입력해주세요!' 
          {...login.getTextInputProps('email')}
        />
        {login.touched.email && login.errors.email && <ErrorText>{login.errors.email}</ErrorText>}

        <Input 
          error={login.touched.password && login.errors.password} 
          type='password' 
          placeholder='비밀번호를 입력해주세요!' 
          {...login.getTextInputProps('password')}
        />
        {login.touched.password && login.errors.password && <ErrorText>{login.errors.password}</ErrorText>}

        <LoginButton type="submit">로그인</LoginButton>
      </Form>
      <RefreshButton type="button" onClick={handleTokenRefresh}>Access Token 재발급</RefreshButton>
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

const Input = styled.input`
  padding: 10px;  
  margin: 10px 0;
  border-radius: 10px;
  width: 400px;  
  background-color: white;
  border: ${({ error }) => (error ? '4px solid red' : '1px solid #ccc')};

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
