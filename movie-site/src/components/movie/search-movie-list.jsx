import { useSearchParams } from "react-router-dom";
import styled from "styled-components"; 
import useCustomFetch from "../../hooks/useCustomFetch.js";
import MovieList from "../../components/MovieList.jsx";
import CardListSkeleton from "../Skeleton/card-list-skeleton.jsx";
import * as S from "../Skeleton/card-skeleton-style";

const ErrorMessage = styled.div`
  color: white;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
`;

const SearchMovieList = () => {
  const [searchParams] = useSearchParams({
    query: "",
  });

  const query = searchParams.get("query");
  const url = `/search/movie?query=${query}&include_adult=false&language=ko-KR&page=1`;
  const { data: movies, isLoading, isError } = useCustomFetch(url);

  console.log(movies);

  if(isError){
    return<ErrorMessage>
    <h1>에러가 발생했습니다. 다시 시도해주세요.</h1>
  </ErrorMessage>
  }

  if(isLoading) {
    return <S.Container>
        <CardListSkeleton num={20}/>
    </S.Container>
  }

  if (query && Array.isArray(movies) && movies.length === 0) {
    return (
      <ErrorMessage>
        <h1>검색어 "{query}"에 해당하는 데이터가 없습니다.</h1>
      </ErrorMessage>
    );
  }

  return (
    <div>
      <MovieList movies={movies}/>
    </div>
  );
};

export default SearchMovieList;
