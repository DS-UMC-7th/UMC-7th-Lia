import MovieList from "../components/MovieList.jsx";
import {useEffect, useState} from "react";
import axios from "axios";

const TopRated = () => {
    const [movies, setMovies] = useState([])

    useEffect(() => {
      const getMovies = async () => {
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko&page=1&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200`, 
            {
              headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhN2FjYmFhOTBlNjczM2MxYjJkMWZmYTJhZmMzY2MzZiIsIm5iZiI6MTcyODM4ODkwNi40NTk3NSwic3ViIjoiNjcwM2YzMWNjYzkwNGYxMmQ5MTM5ZGZkIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.q16fWO2QGu5aTtN8Q4SrbJe9LA7bDsfWrpUG6O9XH7Y`,
              },
            }
          );
          setMovies(response.data.results); 
        } catch (error) {
          console.error("Error fetching movies:", error);
        }
      };
  
      getMovies();
    }, []);

      return (
        <MovieList movies={movies} />
    );
  
};

export default TopRated;