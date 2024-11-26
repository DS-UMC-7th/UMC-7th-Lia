import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../apis/axios-instance-tv";

const CreditsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
  color: white;
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 15px;
  text-align: center;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }

  p {
    margin: 5px 0;
  }

  .small {
    font-size: 0.8em;
    color: #bbb;
  }
`;

const ProfileImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 8px;
`;

const DefaultImg = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: gray;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 0.8em;
`;

const CreditDetail = () => {
  const { series_id } = useParams();

  // React Query를 활용한 데이터 가져오기
  const { data: aggregate_credits, isLoading, isError } = useQuery({
    queryKey: ["tv", series_id, "aggregate_credits"], // 캐싱 키 설정
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/tv/${series_id}/aggregate_credits?language=ko-KR`
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

  if (!aggregate_credits) {
    return <div>크레딧 정보를 가져올 수 없습니다.</div>;
  }

  const casts = aggregate_credits.cast || [];
  const crews = aggregate_credits.crew || [];

  return (
    <CreditsContainer>
      <h2>출연진</h2>
      <CardContainer>
  {casts?.map((cast, index) => (
    <Card key={cast.cast_id || `cast-${index}`}>
      {cast.profile_path ? (
        <ProfileImg
          src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
          alt="프로필"
        />
      ) : (
        <DefaultImg>프로필 없음</DefaultImg>
      )}
      <p>{cast.name}</p>
      <p className="small">{cast.character}</p>
    </Card>
  ))}
</CardContainer>
<h2>스태프</h2>
<CardContainer>
  {crews?.map((crew, index) => (
    <Card key={crew.credit_id || `crew-${index}`}>
      {crew.profile_path ? (
        <ProfileImg
          src={`https://image.tmdb.org/t/p/w500${crew.profile_path}`}
          alt="프로필"
        />
      ) : (
        <DefaultImg>프로필 없음</DefaultImg>
      )}
      <p>{crew.name}</p>
      <p className="small">{crew.job}</p>
    </Card>
  ))}
</CardContainer>

    </CreditsContainer>
  );
};

export default CreditDetail;
