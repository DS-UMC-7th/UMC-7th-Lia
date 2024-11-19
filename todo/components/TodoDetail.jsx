import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getTodo, patchTodo, deleteTodo } from "../apis/todo";
import { useParams, useNavigate } from "react-router-dom";
import * as S from "../src/TodoStyle";
import { queryClient } from "../src/main";

const TodoDetail = () => {
  const { id } = useParams(); // URL에서 id 가져오기
  const navigate = useNavigate(); // 삭제 후 목록 페이지로 이동
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  // ToDo 조회
  const { data: todo, isPending, error } = useQuery({
    queryFn: () => getTodo({ id }),
    queryKey: ["todo", id],
  });

  // ToDo 수정
  const { mutate: patchTodoMutation } = useMutation({
    mutationFn: patchTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todo", id] }); // 상세 조회 데이터 갱신
      setIsEditing(false); // 수정 모드 종료
    },
  });

  // ToDo 삭제
  const { mutate: deleteTodoMutation } = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] }); // 목록 데이터 갱신
      navigate("/"); // 삭제 후 목록 페이지로 이동
    },
  });

  const handleEdit = () => {
    setIsEditing(true);
    setEditTitle(todo.title);
    setEditContent(todo.content);
  };

  const handleEditSubmit = () => {
    patchTodoMutation({ id, title: editTitle, content: editContent });
  };

  const handleDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      deleteTodoMutation({ id });
    }
  };

  if (isPending) return <div>로딩 중...</div>;
  if (error) return <div>에러가 발생했습니다: {error.message}</div>;

  return (
    <S.Container>
      <h1>⚡ UMC ToDoList ⚡</h1>
      <S.TodoContainer>
        <p><strong>Id:</strong> {todo.id}</p>
        {isEditing ? (
          <>
            <S.InputField
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="제목 수정"
            />
            <S.InputField
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              placeholder="내용 수정"
            />
            <button onClick={handleEditSubmit}>수정 완료</button>
            <button onClick={() => setIsEditing(false)}>취소</button>
          </>
        ) : (
          <>
            <p><strong>제목:</strong> {todo.title}</p>
            <p><strong>내용:</strong> {todo.content}</p>
            <p><strong>상태:</strong> {todo.checked ? "완료" : "진행 중"}</p>
            <p><strong>생성 날짜:</strong> {new Date(todo.createdAt).toLocaleString()}</p>
            <button onClick={handleEdit}>수정</button>
            <button onClick={handleDelete}>삭제</button>
          </>
        )}
      </S.TodoContainer>
    </S.Container>
  );
};

export default TodoDetail;
