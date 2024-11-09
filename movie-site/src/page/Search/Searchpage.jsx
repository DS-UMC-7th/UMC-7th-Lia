import React, { useState } from 'react';
import * as S from './Searchpage.style.js';
import { useSearchParams, useNavigate } from 'react-router-dom';
import SearchMovieList from '../../components/movie/search-movie-list.jsx';

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
      <SearchMovieList />
      </div>
    </>
  );
};

export default Searchpage;
