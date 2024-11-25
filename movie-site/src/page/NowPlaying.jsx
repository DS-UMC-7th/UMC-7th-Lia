import React, { useEffect } from "react";
import MovieList from "../components/MovieList.jsx";
import * as S from "../components/Skeleton/card-skeleton-style";
import { useGetInfiniteMovies } from "../hooks/queries/useGetInfiniteMovies";
import { useInView } from "react-intersection-observer";
import ClipLoader from "react-spinners/ClipLoader";
import CardListSkeleton from "../components/Skeleton/card-list-skeleton.jsx";


const NowPlaying = () => {

    /*const { data: movies, isPending, isError } = useQuery({
        queryKey: ['movies', 'now-playing', 1],
        queryFn: () => useGetMovies({ category: 'now-playing', pageParam: 1 }),
        cacheTime:10000,
        staleTime:10000,
    });*/

    const {
        data,
        isLoading,
        hasNextPage,
        fetchNextPage,
        isFetching,
        isFetchingNextPage,
        isError,
    } = useGetInfiniteMovies("now_playing");

    const { ref, inView } = useInView({
        threshold: 0,
    });

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);
    

    if (isLoading) {
        return (
            <S.Container>
                <CardListSkeleton num={20} />
            </S.Container>
        );
    }
    

    if (isError) {
        return <S.Container>데이터를 불러오는 중 오류가 발생했습니다.</S.Container>;
    }


    return (
        <>
            <S.Container>
                {!isLoading && data?.pages.map((page, index) => (
                    <MovieList movies={page.results || []} key={index} />
                ))}
                {isFetchingNextPage && <CardListSkeleton num={16} />}
            </S.Container>
        
            <div
                ref={ref}
                style={{
                    marginTop: "50px",
                    height: "1px",
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                  }}
            >
                {isFetchingNextPage && <ClipLoader color={"#ffffff"} size={50} />
            }
            </div>
        </>
    );
};

export default NowPlaying;
