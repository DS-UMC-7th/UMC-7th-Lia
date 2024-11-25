import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTodo, patchTodo, deleteTodo } from "../apis/todo";
import useFetch from "../hooks/useFetch";
import Loading from "../components/Loading";
import ErrorDisplay from "../components/ErrorDisplay";
import * as S from "../src/TodoStyle";

const TodoDetail = () => {
  const { id } = useParams(); // URL에서 id 가져오기
  const navigate = useNavigate(); // 삭제 후 목록 페이지로 이동
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  // Custom Hook으로 ToDo 조회
  const { data: todo, isLoading, error } = useFetch(getTodo, { id }, [id]);

  // ToDo 수정
  const handleEditSubmit = async () => {
    try {
      await patchTodo({ id, title: editTitle, content: editContent });
      alert("수정이 완료되었습니다!");
      setIsEditing(false); // 수정 모드 종료
    } catch (error) {
      console.error("Failed to update todo:", error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        await deleteTodo({ id });
        console.log("Todo deleted successfully!");
        navigate("/"); // 삭제 후 목록 페이지로 이동
      } catch (error) {
        console.error("Failed to delete todo:", error);
      }
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditTitle(todo?.title || "");
    setEditContent(todo?.content || "");
  };

  return (
    <S.PageContainer>
      <S.Title>⚡ UMC ToDoDetail ⚡</S.Title>

      {/* 로딩 상태 */}
      {isLoading && <Loading />}

      {/* 에러 상태 */}
      {error && <ErrorDisplay message={error.message} />}

      {/* 정상 데이터 렌더링 */}
      {!isLoading && !error && todo && (
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
                <strong>생성 날짜:</strong>{" "}
                {new Date(todo.createdAt).toLocaleString()}
              </S.DetailText>
              <S.DetailButtonContainer>
                <S.DetailButton type="edit" onClick={handleEdit}>
                  수정
                </S.DetailButton>
                <S.DetailButton onClick={handleDelete}>삭제</S.DetailButton>
              </S.DetailButtonContainer>
            </>
          )}
        </S.DetailContainer>
      )}
    </S.PageContainer>
  );
};

export default TodoDetail;
