import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TodoList from "./TodoList"; // 목록 페이지 컴포넌트
import TodoDetail from "../components/TodoDetail"; // 상세 조회 페이지 컴포넌트

// 라우터 설정
const router = createBrowserRouter([
  {
    path: "/", // 기본 경로
    element: <TodoList />, // ToDo 목록 페이지
  },
  {
    path: "todo/:id", // 상세 조회 페이지
    element: <TodoDetail />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;




