import MovieList from "../components/MovieList.jsx";
import { useEffect, useState } from "react";
import useCustomFetch from "../hooks/useCustomFetch"; 
import axios from "axios";
import CardListSkeleton from "../components/Skeleton/card-list-skeleton.jsx"; 
import * as S from "../components/Skeleton/card-skeleton-style"; 

const UpComing = () => {
  const { data: movies, isLoading, isError } = useCustomFetch(
      `/movie/upcoming?language=ko-KR&page=1`
  );

  if(isLoading) {
    return <S.Container>
        <CardListSkeleton num={20}/>
    </S.Container>
  }

  if (isError) {
    // 에러 발생 시 에러 메시지를 보여줌
    return <h1 style={{ color: 'white' }}>에러가 발생했습니다.</h1>;
  }

  // 데이터가 로드되었을 때 MovieList 컴포넌트를 보여줌
  return <MovieList movies={movies} />;
};

export default UpComing;
