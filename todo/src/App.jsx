import { useState } from "react";
import * as S from "./TodoStyle";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteTodo, getTodoList, patchTodo, postTodo } from "../apis/todo";
import { queryClient } from "./main";

function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  const { data: todos, isPending } = useQuery({
    queryFn: () => getTodoList({ title: search }),
    queryKey: ["todos", search],
  });

  const { mutate: postTodoMutation } = useMutation({
    mutationFn: postTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { mutate: deleteTodoMutation } = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });

  const { mutate: patchTodoMutation } = useMutation({
    mutationFn: patchTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    postTodoMutation({ title, content });
    setTitle("");
    setContent("");
  };

  const handleEdit = (todo) => {
    setEditingId(todo.id);
    setEditTitle(todo.title);
    setEditContent(todo.content);
  };

  const handleEditSubmit = (id) => {
    patchTodoMutation({ id, title: editTitle, content: editContent });
    setEditingId(null);
    setEditTitle("");
    setEditContent("");
  };

  return (
    <>
      <h1>⚡ UMC ToDoList ⚡</h1>
      <S.InputField
        placeholder="검색어를 입력하세요"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <S.FormContainer onSubmit={handleSubmit}>
        <S.InputField
          name="title"
          placeholder="제목을 입력해주세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <S.InputField
          name="content"
          placeholder="내용을 입력해주세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <S.SubmitButton type="submit">ToDo 생성</S.SubmitButton>
      </S.FormContainer>
      {isPending ? (
        <div>로딩 중입니다.</div>
      ) : (
        <S.Container>
          {todos[0]?.map((todo) => (
            <S.TodoContainer key={todo.id}>
              <input
                type="checkbox"
                defaultChecked={todo.checked}
                onChange={() =>
                  patchTodoMutation({ id: todo.id, checked: !todo.checked })
                }
              />
              {editingId === todo.id ? (
                <div>
                  <S.InputField
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                  <S.InputField
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                  />
                  <button onClick={() => handleEditSubmit(todo.id)}>수정완료</button>
                </div>
              ) : (
                <div>
                  <p>{todo.title}</p>
                  <p>{todo.content}</p>
                  <button onClick={() => handleEdit(todo)}>수정</button>
                  <button onClick={() => deleteTodoMutation({ id: todo.id })}>삭제</button>
                </div>
              )}
            </S.TodoContainer>
          ))}
        </S.Container>
      )}
    </>
  );
}

export default App;
