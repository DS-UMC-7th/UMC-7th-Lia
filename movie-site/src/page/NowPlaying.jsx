import React from "react";
import useCustomFetch from "../hooks/useCustomFetch"; 
import MovieList from "../components/MovieList.jsx";

const NowPlaying = () => {
    const { data: movies, isLoading, isError } = useCustomFetch(
        `/movie/now_playing?language=ko-KR&page=1`
    );

    if (isLoading) {
        return <h1 style={{ color: 'white' }}>로딩중입니다..</h1>;
    }

    if (isError) {
        return <h1 style={{ color: 'white' }}>에러가 발생했습니다.</h1>;
    }

    return <MovieList movies={movies} />;

};

export default NowPlaying;
