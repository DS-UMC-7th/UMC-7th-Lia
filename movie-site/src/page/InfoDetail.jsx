import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMovies } from "../hooks/queries/useGetMovies";

const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
`;

const Left = styled.div`
  flex: 1;
  padding: 10px;
`;

const Right = styled.div`
  flex: 1;
`;

const BackImg = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
`;

const InfoDetail = () => {
  const { movieId } = useParams();

  const { data: movie, isLoading, isError } = useQuery({
    queryKey: ['movie', movieId],
    queryFn: () => getMovies({ category: movieId, pageParam: 1 }), 
    cacheTime: 10000,
    staleTime: 10000,
  });

  if (isLoading) {
    return <h1 style={{ color: 'white' }}>로딩중입니다..</h1>;
  }

  if (isError) {
    return <h1 style={{ color: 'white' }}>에러가 발생했습니다.</h1>;
  }

  if (!movie) {
    return <div>영화 정보를 가져올 수 없습니다.</div>;
  }

  const IMG_URL = "https://image.tmdb.org/t/p/w500";

  return (
    <InfoContainer>
      <Left>
        <h1>{movie.title || "제목 정보 없음"}</h1>
        <p>평균 {movie.vote_average !== undefined ? Math.round(movie.vote_average * 10) / 10 : "정보 없음"}</p>
        <p>{movie.release_date ? movie.release_date.substring(0, 4) : "정보 없음"}</p>
        <p>{movie.runtime ? `${movie.runtime}분` : "정보 없음"}</p>
        <p>{movie.overview || "설명 정보 없음"}</p>
      </Left>
      <Right>
        <BackImg src={`${IMG_URL}${movie.backdrop_path}`} alt="이미지" />
      </Right>
    </InfoContainer>
  );
};

export default InfoDetail;
