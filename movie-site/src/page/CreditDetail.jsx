import { useParams } from "react-router-dom";
import styled from "styled-components";
import useCustomFetch from "../hooks/useCustomFetchDetail";

const CreditsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
  color: white; 
`;


const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); /*->최소 크기 설정하기*/
  gap: 15px;
  text-align: center;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column; 
  align-items: center; 

  border-radius: 8px; 
  padding: 10px; /
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

  object-fit: cover; /*->비율 유지*/
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
  const params = useParams();
  const { data: credits, isLoading, isError } = useCustomFetch(`/movie/${params.movieId}/credits?language=ko-KR`);

  if (isLoading) {
    return <h1 style={{ color: 'white' }}>로딩중입니다..</h1>;
  }

  if (isError) {
    return <h1 style={{ color: 'white' }}>에러가 발생했습니다.</h1>;
  }

  // API 응답이 정의되지 않은 경우 처리 -> 계속 오류나서 어느 부분에서 오류났는지 확인하기 위해 추가함
  if (!credits) {
    return <div>크레딧 정보를 가져올 수 없습니다.</div>;
  }

  const casts = credits.cast;
  const crews = credits.crew; 

  return (
    <CreditsContainer>
      <h1>감독/출연</h1>
      <CardContainer>
        {casts?.map(cast => (
          <Card key={cast.cast_id}>
            {cast.profile_path ? (
              <ProfileImg src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`} alt="프로필" />
            ) : (
              <DefaultImg>프로필 없음</DefaultImg>
            )}
            <p>{cast.name}</p>
            <p className="small">{cast.character}</p>
          </Card>
        ))}
      </CardContainer>
      <CardContainer>
        {crews?.map(crew => (
          <Card key={crew.credit_id}>
            {crew.profile_path ? (
              <ProfileImg src={`https://image.tmdb.org/t/p/w500${crew.profile_path}`} alt="프로필" />
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
}

export default CreditDetail;
