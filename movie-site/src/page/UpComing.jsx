import MovieList from "../components/MovieList.jsx";
import { useEffect, useState } from "react";
import axios from "axios";

const UpComing = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      //const min_date = new Date().toISOString().split('T')[0]; // 오늘 날짜 (YYYY-MM-DD)
      //const max_date = "2024-12-31"; // 미래의 특정 날짜

      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2|3&release_date.gte={min_date}&release_date.lte={max_date}`,
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

export default UpComing;
