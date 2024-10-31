import React, { useState } from 'react';
import styled from 'styled-components';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import useForm from '../hooks/use-form.js';
import { validationLogin } from '../utils/validate.js';


const Loginpage = () => {

  const login = useForm({
    initialValue: {
      email: '', 
      password: '',
    },
    validate: validationLogin,
  });

  const handlePressLogin=(e)=>{
    e.preventDefault();
    console.log(login.values.email, login.values.password)
  }

  
  return (
    <Container>
    <h3>로그인</h3>
    <Form>

    <Input error={login.touched.email && login.errors.email} type={'email'} 
    placeholder='이메일을 입력해주세요!' {...login.getTextInputProps('email')}/>
    {login.touched.email && login.errors.email && <ErrorText>{login.errors.email}</ErrorText>}

    <Input error={login.touched.password && login.errors.password} type={'password'} 
    placeholder='비밀번호를 입력해주세요!' {...login.getTextInputProps('password')}/>
    {login.touched.password && login.errors.password && <ErrorText>{login.errors.password}</ErrorText>}

    <LoginButton onClick={handlePressLogin}>로그인</LoginButton>
    </Form>
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
  margin:10px 0;
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
   margin:10px 0;
  border-radius: 10px;
  width: 420px; 
  color: white;
  border: none;
  background-color: ${props => (props.disabled ? 'gray' : '#c4006a')};w3

  &:hover {
    background-color: ${props => (props.disabled ? 'gray' : '#000080')};
    color: #fff;
  }
`;

const ErrorText = styled.h1`
  color: red;
  font-size: 12px;
`;

export default Loginpage;