import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

export const Button = styled.button`
   width:80px;
    color:white;
    background-color: #c4006a;
    cursor:pointer;
    border:none;
     font-size: 16px;
    border-radius:10px;

    &:hover {
    background-color:#a0004d;
    color: #fff;
  }
    &:disabled {
    background-color: #ddd; 
    color: #999; 
    cursor: not-allowed;
  }
`;



export const PageInfo = styled.span`
  font-size: 16px;
  line-height: 32px;
  margin: 0 20px;
  color:white;
`;
