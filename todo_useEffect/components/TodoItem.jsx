import * as S from "../src/TodoStyle";
import React, { useState } from "react";
import { patchTodo, deleteTodo } from "../apis/todo";

const TodoItem = ({ todo, editingId, setEditingId, refreshTodos }) => {
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editContent, setEditContent] = useState(todo.content);
  const [isUpdating, setIsUpdating] = useState(false);

  // Todo 수정
  const handleEditSubmit = async () => {
    setIsUpdating(true);
    try {
      await patchTodo({ id: todo.id, title: editTitle, content: editContent });
      setEditingId(null);
      refreshTodos(); // 수정 후 목록 갱신
    } catch (error) {
      console.error("Failed to update todo:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  // 체크 상태 변경
  const handleCheckChange = async () => {
    setIsUpdating(true);
    try {
      await patchTodo({ id: todo.id, checked: !todo.checked });
      refreshTodos(); // 체크 후 목록 갱신
    } catch (error) {
      console.error("Failed to update todo:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    setIsUpdating(true);
    try {
      await deleteTodo({ id: todo.id }); // deleteTodo에 객체로 id 전달
      refreshTodos(); // 삭제 후 목록 갱신
    } catch (error) {
      console.error("Failed to delete todo:", error);
    } finally {
      setIsUpdating(false);
    }
  };
  

  return (
    <S.TodoContainer>
      <input
        type="checkbox"
        defaultChecked={todo.checked}
        disabled={isUpdating}
        onChange={handleCheckChange}
      />
      {editingId === todo.id ? (
        <S.EditContainer>
          <S.InputField
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="제목을 입력하세요"
          />
          <S.InputField
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            placeholder="내용을 입력하세요"
          />
          <S.ButtonContainer>
            <S.SaveButton onClick={handleEditSubmit} disabled={isUpdating}>
              수정완료
            </S.SaveButton>
          </S.ButtonContainer>
        </S.EditContainer>
      ) : (
        <>
          <S.TodoTextContainer>
            <S.ClickableText to={`/todo/${todo.id}`}>{todo.title}</S.ClickableText>
            <S.ClickableText to={`/todo/${todo.id}`}>{todo.content}</S.ClickableText>
          </S.TodoTextContainer>
          <S.ButtonContainer>
            <S.ActionButton
              type="edit"
              onClick={() => setEditingId(todo.id)}
              disabled={isUpdating}
            >
              수정
            </S.ActionButton>
            <S.ActionButton
              type="delete"
              onClick={handleDelete}
              disabled={isUpdating}
            >
              삭제
            </S.ActionButton>
          </S.ButtonContainer>
        </>
      )}
    </S.TodoContainer>
  );
};

export default TodoItem;
