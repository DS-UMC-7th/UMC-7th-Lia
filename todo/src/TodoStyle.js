import styled from "styled-components";

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