import React, { useState } from "react";
import TvList from "../../components/TvList.jsx";
import * as S from "../../components/Skeleton/card-skeleton-style";
import { useQuery } from "@tanstack/react-query";
import { useGetTv } from "../../hooks/queries/useGetTv.js"; 
import CardListSkeleton from "../../components/Skeleton/card-list-skeleton.jsx";
import PaginationControls from "../../components/movie/PaginationControls.jsx";
const Ontheair = () => {

const [page, setPage] = useState(1);
    
    const { data: tvs, isLoading, isError, isFetching } = useQuery({
        queryKey: ["tvs", "on_the_air", page], 
        queryFn: () => useGetTv({ category: "on_the_air", pageParam: page }), 
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
                {tvs?.results?.length ? (
                    <TvList tvs={tvs.results} />
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

export default Ontheair;

