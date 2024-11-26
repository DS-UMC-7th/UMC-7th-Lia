import * as S from "../src/TodoStyle";
import React, { useState } from "react";


const TodoItem = ({ todo, editingId, setEditingId, patchTodo, deleteTodo }) => {
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editContent, setEditContent] = useState(todo.content);

  const handleEditSubmit = () => {
    patchTodo({ id: todo.id, title: editTitle, content: editContent });
    setEditingId(null);
  };



  return (
    <S.TodoContainer>
      <input
        type="checkbox"
        defaultChecked={todo.checked}
        onChange={() => patchTodo({ id: todo.id, checked: !todo.checked })}
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
            <S.SaveButton onClick={handleEditSubmit}>수정완료</S.SaveButton>
          </S.ButtonContainer>
        </S.EditContainer>
      ) : (
        <>
          <S.TodoTextContainer>
            <S.ClickableText to={`/todo/${todo.id}`}>{todo.title}</S.ClickableText>
            <S.ClickableText to={`/todo/${todo.id}`}>{todo.content}</S.ClickableText>
          </S.TodoTextContainer>
          <S.ButtonContainer>
            <S.ActionButton type="edit" onClick={() => setEditingId(todo.id)}>
              수정
            </S.ActionButton>
            <S.ActionButton
              type="delete"
              onClick={()=>deleteTodo({id:todo.id})} 
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
