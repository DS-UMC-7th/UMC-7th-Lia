import React from "react";
import MovieList from "../components/MovieList.jsx";
import CardListSkeleton from "../components/Skeleton/card-list-skeleton.jsx";
import * as S from "../components/Skeleton/card-skeleton-style";
import { useQuery } from "@tanstack/react-query";
import { useGetMovies } from "../hooks/queries/useGetMovies";

const NowPlaying = () => {
    const { data: movies, isPending, isError } = useQuery({
        queryKey: ['movies', 'now-playing', 1],
        queryFn: () => useGetMovies({ category: 'now_playing', pageParam: 1 }),
        cacheTime:10000,
        staleTime:10000,
    });


    if (isPending) {
        return (
            <S.Container>
                <CardListSkeleton num={20} />
            </S.Container>
        );
    }

    if (isError) {
        return <h1 style={{ color: 'white' }}>에러가 발생했습니다.</h1>;
    }

    return <MovieList movies={movies?.results || []} />;
};

export default NowPlaying;
