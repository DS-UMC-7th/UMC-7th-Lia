import * as S from "../src/TodoStyle";

const Loading = () => {
  return (
    <S.LoadingContainer>
      <div>
        <S.Dot />
        <S.Dot />
        <S.Dot />
      </div>
      <S.LoadingText>게시글을 불러오는 중입니다...</S.LoadingText>
    </S.LoadingContainer>
  );
};

export default Loading;
