import React from 'react';
import styled from 'styled-components';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form'



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

const StyledInput = styled.input`
  padding: 10px;  
  border-radius: 10px;
  width: 400px;  
  background-color: white;
  margin-bottom: 8px;
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

const Input = ({ type, placeholder, register, name, error }) => (
  <>
    <StyledInput type={type} placeholder={placeholder} {...register(name)} />
    {error && <p style={{ color: 'red' }}>{error.message}</p>}
  </>
);

const Signuppage = () => {
  const schema = yup.object().shape({
    email: yup
      .string('문자열이어야 합니다.')
      .email('유효한 이메일 형식이어야 합니다.')
      .required('이메일을 반드시 입력해주세요!'),
    password: yup
      .string('문자열이어야 합니다.')
      .min(8, '비밀번호는 8자 이상이어야 합니다.')
      .max(16, '비밀번호는 16자 이하여야 합니다.')
      .required('비밀번호는 필수 입력요소입니다.'),
      passwordCheck: yup
      .string()
      .oneOf([yup.ref('password'), null], '비밀번호가 일치하지 않습니다.')
      .required('비밀번호 검증 또한 필수요소입니다.'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = (data) => {
    console.log('폼 데이터 제출', data);
    Object.entries(data).forEach(([key, value]) => {
      console.log(`${key}: ${value}`);
    });
  };

  const isDisabled = Object.keys(errors).length > 0;

  return (
    <Container>
      <h3>회원가입</h3>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="email"
          placeholder="이메일을 입력해주세요!"
          register={register}
          name="email"
          error={errors.email}
        />
        
        <Input
          type="password"
          placeholder="비밀번호를 입력해주세요!"
          register={register}
          name="password"
          error={errors.password}
        />

        <Input
          type="passwordCheck"
          placeholder="비밀번호를 다시 입력해주세요!"
          register={register}
          name="passwordCheck"
          error={errors.passwordCheck}
        />

        <LoginButton type="submit" value="제출" disabled={isDisabled} />
      </Form>
    </Container>
  );
};

export default Signuppage;