import { axiosInstance } from "../../apis/axios-instance-tv";

const useGetTv  = async ({ category, pageParam }) => {
    
    const { data } = await axiosInstance.get( `/tv/${category}?language=ko-KR&page=${pageParam}`);

    return data; 
};

export { useGetTv  };
