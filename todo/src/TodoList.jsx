import { useState, useEffect } from "react";
import _ from "lodash";
import * as S from "./TodoStyle";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteTodo, getTodoList, patchTodo, postTodo } from "../apis/todo";
import { queryClient } from "./main";

const TodoList = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  const { data: todos, isPending, isError, error } = useQuery({
    queryFn: () => getTodoList({ title: debouncedSearch }),
    queryKey: ["todos", debouncedSearch],
  });

  const { mutate: postTodoMutation } = useMutation({
    mutationFn: postTodo,
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

  const { mutate: deleteTodoMutation } = useMutation({
    mutationFn: deleteTodo,
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

  const debouncedUpdate = _.debounce((value) => {
    setDebouncedSearch(value);
  }, 300);

  useEffect(() => {
    debouncedUpdate(search);
    return () => debouncedUpdate.cancel();
  }, [search]);

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
        <S.LoadingContainer>
          <div>
            <S.Dot />
            <S.Dot />
            <S.Dot />
          </div>
          <S.LoadingText>게시글을 불러오는 중입니다...</S.LoadingText>
        </S.LoadingContainer>
      ) : isError ? (
        <S.ErrorContainer>
          <S.ErrorIcon>❌</S.ErrorIcon>
          <S.ErrorText>오류가 발생했습니다: {error.message}</S.ErrorText>
        </S.ErrorContainer>
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
                  <S.ClickableText to={`/todo/${todo.id}`}>
                    {todo.title}
                  </S.ClickableText>
                  <S.ClickableText to={`/todo/${todo.id}`}>
                    {todo.content}
                  </S.ClickableText>
                  <button onClick={() => handleEdit(todo)}>수정</button>
                  <button onClick={() => deleteTodoMutation({ id: todo.id })}>
                    삭제
                  </button>
                </div>
              )}
            </S.TodoContainer>
          ))}
        </S.Container>
      )}
    </>
  );
  
};

export default TodoList;
