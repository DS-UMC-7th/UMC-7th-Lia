import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../apis/axios-instance";

export const useFetchUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) return null;

      const response = await axiosInstance.get("/user/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("유저 정보를 불러오는 데 실패했습니다.");
      }

      return response.data;
    },
    enabled: !!localStorage.getItem("accessToken"), // AccessToken이 있을 때만 실행
  });
};

export const useLoginMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userInfo) => {
      if (!userInfo || !userInfo.accessToken || !userInfo.refreshToken) {
        throw new Error("로그인 정보가 유효하지 않습니다.");
      }

      localStorage.setItem("accessToken", userInfo.accessToken);
      localStorage.setItem("refreshToken", userInfo.refreshToken);

      const response = await axiosInstance.get("/user/me", {
        headers: {
          Authorization: `Bearer ${userInfo.accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("유저 정보를 불러오는 데 실패했습니다.");
      }

      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data); // 캐싱된 유저 데이터 업데이트
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
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) throw new Error("Refresh token is missing");

      const response = await axiosInstance.post("/auth/token/access", null, {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("토큰 재발급 실패");
      }

      return response.data;
    },
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.accessToken);
      queryClient.invalidateQueries(["user"]); // 유저 관련 쿼리 새로고침
    },
    onError: (error) => {
      console.error("토큰 재발급 에러:", error.message);
    },
  });
};
