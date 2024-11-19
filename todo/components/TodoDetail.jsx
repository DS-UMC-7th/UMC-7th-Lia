import { useQuery } from "@tanstack/react-query";
import { getTodo } from "../apis/todo";
import { useParams } from "react-router-dom";
import * as S from "../src/TodoStyle";

const TodoDetail = () => {
  const { id } = useParams(); // URL에서 id 가져오기
  const { data: todo, isPending, error } = useQuery({
    queryFn: () => getTodo({ id }), // 특정 투두 조회 API 호출
    queryKey: ["todo", id],
  });

  if (isPending) return <div>로딩 중...</div>;
  if (error) return <div>에러가 발생했습니다: {error.message}</div>;

  return (
    <S.Container>
      <h1>⚡ UMC ToDoList ⚡</h1>
      <S.TodoContainer>
        <p><strong>Id:</strong> {todo.id}</p>
        <p><strong>제목:</strong> {todo.title}</p>
        <p><strong>내용:</strong> {todo.content}</p>
        <p><strong>상태:</strong> {todo.checked ? "완료" : "진행 중"}</p>
        <p><strong>생성 날짜:</strong> {new Date(todo.createdAt).toLocaleString()}</p>
      </S.TodoContainer>
    </S.Container>
  );
};

export default TodoDetail;

