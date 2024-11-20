import { createBrowserRouter, RouterProvider } from "react-router-dom";

import NotFound from "./page/NotFound.jsx";
import Searchpage from "./page/Search/Searchpage.jsx"; 
import Signuppage from "./page/Signuppage.jsx"; 
import Loginpage from "./page/Loginpage.jsx"; 
import RootLayout from "./layout/RootLayout.jsx";
import Card from "./components/Card.jsx";
import NowPlaying from './page/NowPlaying.jsx'; // 현재 상영중인 영화 페이지
import Popular from './page/Popular.jsx'; // 인기 있는 영화 페이지
import TopRated from './page/TopRated.jsx'; // 높은 평가를 받은 영화 페이지
import UpComing from './page/UpComing.jsx'; // 개봉 예정작 페이지
import MoviesPage from "./page/Moviespage.jsx";
import MovieDetail from './page/MoviesDetail.jsx';
import ReviewSection from "./components/ReviewSection";
import { AuthProvider } from './context/AuthContext';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Popular />
      },
      {
        path: 'movies',
        element: <MoviesPage />
      },
      {
        path: 'movies/now-playing',
        element: <NowPlaying />
      },
      {
        path: 'movies/popular',
        element: <Popular />
      },
      {
        path: 'movies/top-rated',
        element: <TopRated />
      },
      {
        path: 'movies/up-coming',
        element: <UpComing />
      },
      {
        path: 'movies/:movieId', 
        element: <MovieDetail /> 
      },
      {
        path: 'login',
        element: <Loginpage />
      },
      {
        path: 'signup',
        element: <Signuppage />
      },
      {
        path: 'search',
        element: <Searchpage />
      },
      {
        path: '/movies/:movieId/review',
        element: <ReviewSection />
      }
    ]
  },
]);

const queryClinet = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClinet}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;