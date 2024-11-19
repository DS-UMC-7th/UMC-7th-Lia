import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTodo, patchTodo, deleteTodo } from "../apis/todo";
import * as S from "../src/TodoStyle";

const TodoDetail = () => {
  const { id } = useParams(); // URL에서 id 가져오기
  const navigate = useNavigate(); // 삭제 후 목록 페이지로 이동
  const [todo, setTodo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  // ToDo 조회
  useEffect(() => {
    const fetchTodo = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getTodo({ id });
        setTodo(data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodo();
  }, [id]);

  // ToDo 수정
  const handleEditSubmit = async () => {
    try {
      await patchTodo({ id, title: editTitle, content: editContent });
      setTodo((prev) => ({ ...prev, title: editTitle, content: editContent }));
      setIsEditing(false); // 수정 모드 종료
    } catch (error) {
      console.error("Failed to update todo:", error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        await deleteTodo({ id }); // 객체로 id 전달
        console.log("Todo deleted successfully!"); // 디버깅용 로그
        navigate("/"); // 삭제 후 목록 페이지로 이동
      } catch (error) {
        console.error("Failed to delete todo:", error);
      }
    }
  };
  

  const handleEdit = () => {
    setIsEditing(true);
    setEditTitle(todo.title);
    setEditContent(todo.content);
  };

  if (isLoading) return <S.LoadingContainer>로딩 중...</S.LoadingContainer>;
  if (error) return <S.ErrorContainer>에러가 발생했습니다: {error.message}</S.ErrorContainer>;

  return (
    <S.PageContainer>
      <S.Title>⚡ UMC ToDoList ⚡</S.Title>
      <S.DetailContainer>
        {isEditing ? (
          <>
            <S.EditInputField
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="제목 수정"
            />
            <S.EditInputField
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              placeholder="내용 수정"
            />
            <S.DetailButtonContainer>
              <S.DetailButton type="edit" onClick={handleEditSubmit}>
                수정 완료
              </S.DetailButton>
              <S.DetailButton onClick={() => setIsEditing(false)}>
                취소
              </S.DetailButton>
            </S.DetailButtonContainer>
          </>
        ) : (
          <>
            <S.DetailText>
              <strong>Id:</strong> {todo.id}
            </S.DetailText>
            <S.DetailText>
              <strong>제목:</strong> {todo.title}
            </S.DetailText>
            <S.DetailText>
              <strong>내용:</strong> {todo.content}
            </S.DetailText>
            <S.DetailText>
              <strong>상태:</strong> {todo.checked ? "완료" : "진행 중"}
            </S.DetailText>
            <S.DetailText>
              <strong>생성 날짜:</strong> {new Date(todo.createdAt).toLocaleString()}
            </S.DetailText>
            <S.DetailButtonContainer>
              <S.DetailButton type="edit" onClick={handleEdit}>
                수정
              </S.DetailButton>
              <S.DetailButton onClick={handleDelete}>
                삭제
              </S.DetailButton>
            </S.DetailButtonContainer>
          </>
        )}
      </S.DetailContainer>
    </S.PageContainer>
  );
};

export default TodoDetail;
