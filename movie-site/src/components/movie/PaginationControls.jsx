import React from "react";
import * as S from "./Pagination-style";

const PaginationControls = ({ page, setPage, isPreviousDisabled }) => {
  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  return (
    <S.Container>
      <S.Button onClick={handlePreviousPage} disabled={isPreviousDisabled}>
        이전
      </S.Button>
      <S.PageInfo>{page} 페이지</S.PageInfo>
      <S.Button onClick={handleNextPage}>다음</S.Button>
    </S.Container>
  );
};

export default PaginationControls;
