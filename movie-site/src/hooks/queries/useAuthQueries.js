import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../apis/axios";

export const useFetchUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await api.get("/user/me"); // axios.js 사용
      return response.data;
    },
    enabled: !!localStorage.getItem("accessToken"), // Access Token이 있을 때만 실행
    onError: (error) => {
      if (error.response?.status === 401) {
        console.error("Access Token이 만료되었거나 유효하지 않습니다.");
      } else {
        console.error("유저 정보 요청 에러:", error.message);
      }
    },
  });
};


export const useLoginMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userInfo) => {
  

      // 로그인 요청
      const response = await api.post("/auth/login", {
        email: userInfo.email,
        password: userInfo.password,
      });

      const { accessToken, refreshToken, user } = response.data;

      // 토큰 저장
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      return user; // 유저 정보 반환
    },
    onSuccess: (data) => {
      // 유저 정보 캐싱
      queryClient.setQueryData(["user"], data);
    },
    onError: (error) => {
      console.error("로그인 에러:", error.message);
    },
  });
};

export const useRefreshAccessTokenMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await api.post("/auth/token/access");
      const { accessToken, refreshToken } = response.data;

      // 새 토큰 저장
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      return { accessToken, refreshToken };
    },
    onSuccess: () => {
      // 유저 정보 쿼리 무효화 후 재요청
      queryClient.invalidateQueries(["user"]);
    },
    onError: (error) => {
      console.error("토큰 재발급 에러:", error.message);
    },
  });
};
