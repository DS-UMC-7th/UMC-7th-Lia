import { useEffect, useState } from "react";
import axios from "axios";
import MovieList from "../components/MovieList.jsx";

const NowPlaying = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko&page=1&with_release_type=2|3&release_date.gte={min_date}&release_date.lte={max_date}`, 
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

  return <MovieList movies={movies} />; 
};

export default NowPlaying;


