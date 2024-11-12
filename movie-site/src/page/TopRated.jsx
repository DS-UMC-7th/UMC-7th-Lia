import MovieList from "../components/MovieList.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import useCustomFetch from '../hooks/useCustomFetch';
import CardListSkeleton from "../components/Skeleton/card-list-skeleton.jsx"; 
import * as S from "../components/Skeleton/card-skeleton-style"; 


const TopRated = () => {
  const { data: movies, isLoading, isError } = useCustomFetch(`/movie/top_rated?language=ko-KR&page=1`);

  if (isLoading) {
    // 로딩 중일 때 스켈레톤 UI 표시
    return (
        <S.Container>
            <CardListSkeleton num={20} />
        </S.Container>
    );
}

if (isError) {
    return <h1 style={{ color: 'white' }}>에러가 발생했습니다.</h1>;
}

  return <MovieList movies={movies} />;
};

export default TopRated;