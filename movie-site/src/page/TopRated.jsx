import React, { useState } from "react";
import MovieList from "../components/MovieList.jsx";
import * as S from "../components/Skeleton/card-skeleton-style";
import { useQuery } from "@tanstack/react-query";
import { getMovies } from "../hooks/queries/useGetMovies.js"; 
import CardListSkeleton from "../components/Skeleton/card-list-skeleton.jsx";
import PaginationControls from "../components/movie/PaginationControls.jsx";


const TopRated = () => {
    /*const { data: movies, isLoading, isError } = useQuery({
        queryKey: ['movies', 'top-rated', 1], 
        queryFn: () => getMovies({ category: 'top_rated', pageParam: 1 }),
        cacheTime: 10000,
        staleTime: 10000, 
    });*/

    /*const {
        data,
        isLoading,
        hasNextPage,
        fetchNextPage,
        isFetching,
        isFetchingNextPage,
        isError,
      } = useGetInfiniteMovies("top_rated");
      
      const { ref, inView } = useInView({
        threshold: 0,
      });
      
      useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
      }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);*/
      
      
      const [page, setPage] = useState(1);
    
    const { data: movies, isLoading, isError, isFetching } = useQuery({
        queryKey: ["movies", "top-rated", page], 
        queryFn: () => getMovies({ category: "top_rated", pageParam: page }), 
        keepPreviousData: true,
        staleTime: 10000, 
    });



    // 로딩 상태 처리
    if (isLoading) {
        return (
            <S.Container>
                <CardListSkeleton num={20} />
            </S.Container>
        );
    }

    // 에러 상태 처리
    if (isError) {
        return <S.Container>데이터를 불러오는 중 오류가 발생했습니다.</S.Container>;
    }

    return (
        <>
            <S.Container>
                {/* 데이터를 안전하게 렌더링 */}
                {movies?.results?.length ? (
                    <MovieList movies={movies.results} />
                ) : (
                    <S.Container>데이터가 없습니다.</S.Container>
                )}
                {isFetching && <CardListSkeleton num={16} />}
            </S.Container>

            {/* 페이지네이션 컨트롤 */}
            <PaginationControls
                page={page}
                setPage={setPage}
                isPreviousDisabled={page <= 1}
            />
        </>
    );
};

export default TopRated;
