import styled from 'styled-components';

const Container = styled.h1`
  color:white;
  margin-top:5px;
  padding: 5px;
  display:flex;
  justify-content:center;


  input{
    flex:1;
    padding:15px;
    border-top-left-radius:5px;
    border-bottom-left-radius:5px;
    border:1px solid rgb(220,220,220);
    height:40px;

  }

  button{
    width:80px;
    color:white;
    background-color: #c4006a;
    cursor:pointer;
    border:none;
    border-top-right-radius:5px;
    border-bottom-right-radius:5px;

    &:hover {
    background-color:#a0004d;
    color: #fff;
  }

  }
`;



export {Container};