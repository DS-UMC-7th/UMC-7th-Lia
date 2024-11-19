import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";

// 전체 form 컨테이너
export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  width: 50%;
  margin: 50px auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

// 인풋 필드 스타일
export const InputField = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`;

// 버튼 스타일
export const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

// TodoContainer 스타일
export const TodoContainer = styled.div`
  display: flex;

  align-items: flex-start;
  justify-content: center;
  padding: 15px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;

  p {
    margin: 5px 0;
    font-size: 16px;
    color: #333;
  }

  &:hover {
    background-color: #f1f1f1;
    border-color: #bbb;
  }
`;

export const Container = styled.div`
    display: flex;
  flex-direction: column;
  gap:20px;
`;

export const ClickableText = styled(Link)`
  cursor: pointer;
  text-decoration: none; /* 기본 밑줄 제거 */
color:black;
  
  &:hover {
    text-decoration: none; /* 호버 시에도 밑줄 제거 */
color:black;
  }
`;

// 점이 움직이는 애니메이션 정의
const bounce = keyframes`
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
`;

// 로딩 컨테이너 스타일
export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px; /* 로딩 영역 높이 */
  text-align: center;
`;

// 점 스타일
export const Dot = styled.div`
  width: 12px;
  height: 12px;
  margin: 0 5px;
  background-color: #3498db;
  border-radius: 50%;
  display: inline-block;
  animation: ${bounce} 1.4s infinite ease-in-out both;
  
  &:nth-child(1) {
    animation-delay: -0.32s;
  }
  &:nth-child(2) {
    animation-delay: -0.16s;
  }
  &:nth-child(3) {
    animation-delay: 0;
  }
`;

// 로딩 텍스트 스타일
export const LoadingText = styled.p`
  font-size: 16px;
  color: #555;
  margin-top: 10px;
`;

// 에러 아이콘
export const ErrorIcon = styled.div`
  font-size: 60px;
  color: #e74c3c;
  margin-bottom: 15px;
  animation: ${bounce} 1s infinite; /* 아이콘도 살짝 튀는 효과 */
`;

// 에러 메시지 텍스트
export const ErrorText = styled.p`
  font-size: 18px;
  color: #e74c3c;
  margin-top: 5px;
  text-align: center;
`;

// 에러 컨테이너
export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  padding: 20px;
  background: #ffe6e6;
  border: 2px solid #f5c2c2;
  border-radius: 10px;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
`;

