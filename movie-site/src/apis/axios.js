import axios from 'axios';

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: 'http://localhost:3000', // 서버의 기본 URL 설정
});

// 요청 인터셉터 추가
api.interceptors.request.use(
  (config) => {
    const refreshToken = localStorage.getItem('refreshToken'); // localStorage에서 refreshToken 가져오기
    if (refreshToken) {
      config.headers.Authorization = `Bearer ${refreshToken}`; // 헤더에 refreshToken 추가
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 추가 (accessToken 만료 시 재발급)
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // 401 에러가 발생하면 (토큰 만료 등)
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await api.post('/auth/token/access'); // 토큰 재발급 요청
        const { accessToken, refreshToken } = response.data; // 응답에서 accessToken 및 refreshToken 추출

        // 토큰을 localStorage에 저장
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        // 재발급 받은 accessToken으로 원래 요청 재전송
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
