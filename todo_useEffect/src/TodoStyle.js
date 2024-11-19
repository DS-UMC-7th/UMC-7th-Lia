import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";

// 페이지 배경색
export const PageContainer = styled.div`
  background-color: #fce4ec; /* 연한 핑크색 */
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

// 메인 제목 스타일
export const Title = styled.h1`
  font-size: 24px;
  color: #ad1457; /* 진한 핑크 */
  margin-bottom: 20px;
`;

// FormContainer: 수직 정렬로 변경
export const FormContainer = styled.form`
  display: flex;
  flex-direction: column; /* 수직 정렬 */
  gap: 10px; /* 각 입력 필드 간 간격 */
  margin-bottom: 20px;
  width: 100%;
  max-width: 400px; /* 적당한 너비 설정 */
`;

// 입력 필드 (수정 상태)
export const InputField = styled.input`
  padding: 10px;
  border: 2px solid #f8bbd0;
  border-radius: 5px;
  font-size: 14px;
  outline: none;

  &:focus {
    border-color: #ec407a;
  }
`;

// 버튼 스타일
export const SubmitButton = styled.button`
  background-color: #ec407a; /* 핑크 */
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #d81b60; /* 진한 핑크 */
  }

  &:disabled {
    background-color: #f8bbd0; /* 비활성화 상태 */
    cursor: not-allowed;
  }
`;

// ToDo 리스트 컨테이너
export const Container = styled.div`
  width: 100%;
  max-width: 600px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

// ToDo 아이템 컨테이너
export const TodoContainer = styled.div`
  display: flex;
  justify-content: space-between; /* 좌우 배치 */
  align-items: center; /* 수직 가운데 정렬 */
  background-color: #fff;
  padding: 15px 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
  }
`;

// 제목과 내용을 담는 컨테이너
export const TodoTextContainer = styled.div`
  display: flex;
  flex-direction: column; /* 수직 정렬 */
  gap: 5px; /* 제목과 내용 간 간격 */
  flex: 1; /* 버튼과 공간 분리 */
`;

// 버튼 컨테이너
export const ButtonContainer = styled.div`
  display: flex;
  gap: 10px; /* 버튼 간 간격 */
`;

// ToDo 텍스트
export const TodoText = styled.p`
  font-size: 16px;
  color: #333;
  flex: 1;
`;

// 수정 및 삭제 버튼
export const ActionButton = styled.button`
  background-color: ${(props) => (props.type === "edit" ? "#f8bbd0" : "#d81b60")};
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) =>
      props.type === "edit" ? "#ec407a" : "#ad1457"};
  }
`;

// 수정 완료 버튼 스타일
export const SaveButton = styled.button`
  background-color: #ec407a; 
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #ad1457;
  }
`;

// 수정 모드 컨테이너
export const EditContainer = styled.div`
  display: flex;
  flex-direction: column; /* 수직 정렬 */
  gap: 5px; /* 필드 간 간격 */
  flex: 1; /* 버튼과 공간 분리 */
  margin-left:15px;
`;

export const NoResults = styled.p`
  text-align: center;
  color: #555;
  font-size: 16px;
  margin-top: 20px;
`;

export const ClickableText = styled(Link)`
  cursor: pointer;
   font-size: 16px;
  color: #444;
  text-decoration: none;
  margin-right: 15px;
  margin-left: 15px;

  &:hover {
   color: #ec407a; /* 진한 핑크 */
    text-decoration: none;
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

// 상세 페이지 컨테이너
export const DetailContainer = styled.div`
  background-color: #fff;
  padding: 20px 30px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 700px;
  margin: 20px auto; /* 가운데 정렬 */
`;

// 상세 텍스트 스타일
export const DetailText = styled.p`
  font-size: 16px;
  color: #333;
  margin: 10px 0;
`;

// 수정 모드 입력 필드
export const EditInputField = styled.input`
  width: 100%;
  padding: 10px;
  border: 2px solid #f8bbd0;
  border-radius: 5px;
  font-size: 14px;
  margin-bottom: 10px;
  outline: none;

  &:focus {
    border-color: #ec407a;
  }
`;

// 버튼 컨테이너
export const DetailButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-top: 20px;
`;

// 수정 및 삭제 버튼
export const DetailButton = styled.button`
  background-color: ${(props) => (props.type === "edit" ? "#f8bbd0" : "#d81b60")};
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) =>
      props.type === "edit" ? "#ec407a" : "#ad1457"};
  }
`;


