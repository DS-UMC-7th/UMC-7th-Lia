import axios from "axios";

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: "http://localhost:3000", // 서버의 기본 URL 설정
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터 추가
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken"); // Access Token 가져오기
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`; // 헤더에 Access Token 추가
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 추가 (Access Token 만료 시 재발급)
api.interceptors.response.use(
  (response) => {
    return response; // 응답이 성공적이면 그대로 반환
  },
  async (error) => {
    const originalRequest = error.config;

    // 401 Unauthorized 에러 처리
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // 무한 루프 방지 플래그

      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        console.error("Refresh Token이 없습니다. 로그아웃 처리합니다.");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login"; // 로그아웃 처리
        return Promise.reject(error);
      }

      try {
        // Refresh Token으로 Access Token 재발급
        const response = await axios.post(
          "http://localhost:3000/auth/token/access",
          null,
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`, // Refresh Token 헤더에 추가
            },
          }
        );

        const { accessToken, refreshToken: newRefreshToken } = response.data;

        // 새로 받은 토큰을 저장
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        // 원래 요청에 새 Access Token 설정
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        // 원래 요청 재전송
        return api(originalRequest);
      } catch (refreshError) {
        console.error("토큰 재발급 실패. 로그아웃 처리합니다.");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login"; // 로그아웃 처리
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error); // 다른 에러는 그대로 반환
  }
);

export default api;
