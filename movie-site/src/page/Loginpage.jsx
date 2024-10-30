import React from 'react';
import styled from 'styled-components';
import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'

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
  border-radius: 10px;
  width:400px;  
  background-color:white;

  &:hover {
  
  }
`;

const LoginButton = styled.input`
  padding: 10px;  
  border-radius: 10px;
  width:420px;
  background-color: ${props => (props.disabled ? 'gray' : '#c4006a')};
  color:white;

  &:hover {
    background-color: ${props => (props.disabled ? 'gray' : '#000080')};
    color: #fff;
  }
`;

const Loginpage = () => {
  const schema = yup.object().shape({
    email: yup.string().email('올바른 이메일 형식이 아닙니다. 다시 확인해주세요!').required('이메일은 필수 입력 사항입니다.'),
    password: yup.string().min(8,'비밀번호는 8-16자 사이로 입력해주세요!').max(16,'비밀번호는 8-16자 사이로 입력해주세요!').required('비밀번호는 8-16자 사이로 입력해주세요!'),
})

const {register, handleSubmit, formState: {errors}} = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
});

const onSubmit = (data) => {
    console.log('폼 데이터 제출')
    console.log(data);
}

const isDisabled = Object.keys(errors).length > 0;

return (
  <Container>
    <h3>로그인</h3> {}
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input type={'email'} {...register("email")} placeholder="이메일을 입력해주세요!" />
      <p style={{ color: 'red' }}>{errors.email?.message}</p>
      <Input type={'password'} {...register("password")} placeholder="비밀번호를 입력해주세요!" />
      <p style={{ color: 'red' }}>{errors.password?.message}</p>
      <LoginButton type={'submit'} value="로그인"  disabled={isDisabled}/>
    </Form>
  </Container>
);
};

export default Loginpage;



