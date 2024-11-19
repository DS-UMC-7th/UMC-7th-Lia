import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TodoList from "./TodoList"; // 목록 페이지 컴포넌트
import TodoDetail from "../components/TodoDetail";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true, // 기본 경로
        element: <TodoList /> // ToDo 목록 페이지
      },
      {
        path: "todo/:id", // 상세 조회 페이지
        element: <TodoDetail />
      }
    ]
  }
]);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;



