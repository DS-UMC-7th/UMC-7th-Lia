import { axiosInstance } from "../../apis/axios-instance";

const useGetMovies = async ({ category, pageParam }) => {
    // 동적으로 URL 생성
    const { data } = await axiosInstance.get( `/movie/${category}?language=ko-KR&page=${pageParam}`);

    return data; // API 응답 데이터 반환
};

export { useGetMovies };
