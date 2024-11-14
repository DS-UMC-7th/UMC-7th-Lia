import { useInfiniteQuery } from "@tanstack/react-query";
import { getMovies } from "./useGetMovies.js";

function useGetInfiniteMovies(category) {
    return useInfiniteQuery({
        queryFn: ({ pageParam = 1 }) => getMovies({ category, pageParam }), // getMovies 호출
        queryKey: ["movies", category],
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            const lastMovie = lastPage.results.at(-1);
            //return lastMovie ? allPages.length + 1 : undefined;
            return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined;
        },
     
        
    });
}

export { useGetInfiniteMovies };

