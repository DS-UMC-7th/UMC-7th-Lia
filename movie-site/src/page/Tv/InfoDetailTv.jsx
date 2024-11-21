import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../apis/axios-instance-tv";

const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  background-color: #1a1a1a; /* 배경 색 추가 */
`;

const Left = styled.div`
  flex: 1;
  padding: 10px;
`;

const Right = styled.div`
  flex: 1;
  padding: 10px;
`;

const BackImg = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
  object-fit: cover; /* 이미지를 비율 유지하며 맞춤 */
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
`;

const DetailText = styled.p`
  font-size: 16px;
  margin-bottom: 10px;
`;

const InfoDetail = () => {
  const { series_id } = useParams();

  // React Query를 사용해 TV 정보 가져오기
  const { data: tv, isLoading, isError } = useQuery({
    queryKey: ["tv", series_id],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/tv/${series_id}?language=ko-KR`
      );
      return response.data;
    },
    cacheTime: 10000,
    staleTime: 10000,
  });

  if (isLoading) {
    return <h1 style={{ color: "white" }}>로딩중입니다...</h1>;
  }

  if (isError) {
    return <h1 style={{ color: "white" }}>에러가 발생했습니다.</h1>;
  }

  if (!tv) {
    return <div style={{ color: "white" }}>TV 정보를 가져올 수 없습니다.</div>;
  }

  const IMG_URL = "https://image.tmdb.org/t/p/w500";

  return (
    <InfoContainer>
      <Left>
        <Title>{tv.name || "제목 정보 없음"}</Title>
        <DetailText>
          평균 평점:{" "}
          {tv.vote_average !== undefined
            ? Math.round(tv.vote_average * 10) / 10
            : "정보 없음"}
        </DetailText>
        <DetailText>
          첫 방영일: {tv.first_air_date ? tv.first_air_date : "정보 없음"}
        </DetailText>
        <DetailText>
          에피소드 수: {tv.number_of_episodes || "정보 없음"}
        </DetailText>
        <DetailText>
          시즌 수: {tv.number_of_seasons || "정보 없음"}
        </DetailText>
        <DetailText>{tv.overview || "설명 정보 없음"}</DetailText>
      </Left>
      <Right>
        {tv.backdrop_path ? (
          <BackImg src={`${IMG_URL}${tv.backdrop_path}`} alt="이미지" />
        ) : (
          <DetailText>이미지 정보 없음</DetailText>
        )}
      </Right>
    </InfoContainer>
  );
};

export default InfoDetail;
