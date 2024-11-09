import React, { useState } from 'react';
import * as S from './Searchpage.style.js';
import { useSearchParams, useNavigate } from 'react-router-dom';
import useCustomFetch from '../../hooks/useCustomFetch.js';
import MovieList from "../../components/MovieList.jsx";

const Searchpage = () => {
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();
  
  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value);
  };

  const[searchParams,setSearchParams]=useSearchParams({
    query :''
  })

  const query = searchParams.get('query');

  const handleSearchMovie=()=>{
    if(query==searchValue) return;
    navigate(`/search?query=${searchValue}`)
  }

  const handleSearchMovieWithKeyboard=(e)=>{
    if(e.key=='Enter'){
      handleSearchMovie();
    }
  }

  const url = `/search/movie?query=${searchValue}&include_adult=false&language=ko-KR&page=1`;


  const {data:movies,isLoading,isError} = useCustomFetch(url);

  console.log(movies);

  
  return (
    <>
      <S.Container>
        <input
          placeholder="영화제목을 입력해주세요..."
          value={searchValue}
          onChange={onChangeSearchValue}
          onKeyDown={handleSearchMovieWithKeyboard}
        />
        <button onClick={handleSearchMovie}>검색</button>
      </S.Container>
      <div>
      <MovieList movies={movies} />
      </div>
    </>
  );
};

export default Searchpage;
