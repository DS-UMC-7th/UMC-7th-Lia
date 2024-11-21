import { axiosInstance } from "../../apis/axios-instance-tv";

const useGetTv = async ({ category, pageParam }) => {
  if (!category || !pageParam) {
    console.error("카테고리 또는 페이지 번호가 제공되지 않았습니다.");
    return null;
  }

  try {
    const { data } = await axiosInstance.get(
      `/tv/${category}?language=ko-KR&page=${pageParam}`
    );
    return data;
  } catch (error) {
    console.error("API 호출 중 오류 발생:", error);
    return null;
  }
};

export { useGetTv };
