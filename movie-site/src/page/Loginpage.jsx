import React, { useState } from 'react';
import styled from 'styled-components';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import useForm from '../hooks/use-form';
import { validationLogin } from '../utils/validate';

/*const Container = styled.div`
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
  border-radius: 10px;
  width: 400px;  
  background-color: white;
`;

const LoginButton = styled.input`
  padding: 10px;  
  border-radius: 10px;
  width: 420px;
  background-color: ${props => (props.disabled ? 'gray' : '#c4006a')};
  color: white;

  &:hover {
    background-color: ${props => (props.disabled ? 'gray' : '#000080')};
    color: #fff;
  }
`;

const Loginpage = () => {
  const schema = yup.object().shape({
    email: yup.string().email('올바른 이메일 형식이 아닙니다. 다시 확인해주세요!').required('이메일은 필수 입력 사항입니다.'),
    password: yup.string().min(8, '비밀번호는 8-16자 사이로 입력해주세요!').max(16, '비밀번호는 8-16자 사이로 입력해주세요!').required('비밀번호는 필수 입력 사항입니다.'),
  });

  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = (data) => {
    console.log('폼 데이터 제출');
    console.log(data);
  };

  const isDisabled = Object.keys(errors).length > 0;

  return (
    <Container>
      <h3>로그인</h3>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input 
          type='email' 
          placeholder="이메일을 입력해주세요!" 
          onChange={(e) => setValue('email', e.target.value)} 
          {...register("email")} 
        />
        <p style={{ color: 'red' }}>{errors.email?.message}</p>
        <Input 
          type='password' 
          placeholder="비밀번호를 입력해주세요!" 
          onChange={(e) => setValue('password', e.target.value)} 
          {...register("password")} 
        />
        <p style={{ color: 'red' }}>{errors.password?.message}</p>
        <LoginButton type='submit' value="로그인" disabled={isDisabled} />
      </Form>
    </Container>
  );
};

export default Loginpage;*/

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
  border: ${props => props.error ? '4px solid red' : '1px solid #ccc'};

  &:focus {
    border-color: #000080;
  }
`;

const LoginButton = styled.button` 
  padding: 10px;  
   margin:10px 0;
  border-radius: 10px;
  width: 420px; 
  background-color: ${props => (props.disabled ? 'gray' : '#c4006a')};
  color: white;
  border: none;

  &:hover {
    background-color: ${props => (props.disabled ? 'gray' : '#000080')};
    color: #fff;
  }
`;

const ErrorText = styled.h1`
  color: red;
  font-size: 12px;
`;

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
    <Form onSubmit={handlePressLogin}>
    {/* 
    <input
      onBlur={() => handleBlur('email')}
      value={values.email}
      onChange={(e) => handleChangeInput('email', e.target.value)}
    />
    <input
      onBlur={() => handleBlur('password')}
      value={values.password}
      onChange={(e) => handleChangeInput('password', e.target.value)}
    />
    */}

    <Input error={login.touched.email && login.errors.email} type={'email'} 
    placeholder='이메일을 입력해주세요!' {...login.getTextInputProps('email')}/>
    {login.touched.email && login.errors.email && <ErrorText>{login.errors.email}</ErrorText>}
    <Input error={login.touched.password && login.errors.password} type={'password'} 
    placeholder='비밀번호를 입력해주세요!' {...login.getTextInputProps('password')}/>
    {login.touched.password && login.errors.password && <ErrorText>{login.errors.password}</ErrorText>}

    <LoginButton type="submit">로그인</LoginButton>
    </Form>
  </Container>
  );
};

export default Loginpage;