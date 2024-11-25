import * as S from "../src/TodoStyle";

const ErrorDisplay = ({ message }) => {
  return (
    <S.ErrorContainer>
      <S.ErrorIcon>❌</S.ErrorIcon>
      <S.ErrorText>오류가 발생했습니다: {message}</S.ErrorText>
    </S.ErrorContainer>
  );
};

export default ErrorDisplay;
