import MovieList from "../components/MovieList.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import useCustomFetch from '../hooks/useCustomFetch';


const TopRated = () => {
  const { data: movies, isLoading, isError } = useCustomFetch(`/movie/top_rated?language=ko-KR&page=1`);

  if (isLoading) {
    return <h1 style={{ color: 'white' }}>로딩중입니다..</h1>;
}

if (isError) {
    return <h1 style={{ color: 'white' }}>에러가 발생했습니다.</h1>;
}

  return <MovieList movies={movies} />;
};

export default TopRated;