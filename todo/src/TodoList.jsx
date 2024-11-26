import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getTodoList, postTodo, patchTodo, deleteTodo } from "../apis/todo";
import { queryClient } from "./main";
import TodoForm from "../components/TodoForm";
import TodoItem from "../components/TodoItem";
import Loading from "../components/Loading";
import ErrorDisplay from "../components/ErrorDisplay";
import * as S from "./TodoStyle";

const TodoList = () => {
  // const [search, setSearch] = useState(""); // 검색어 상태
  // const [debouncedSearch, setDebouncedSearch] = useState(""); // 디바운스된 검색어

  const [editingId, setEditingId] = useState(null);

  const { data: todos, isPending, isError, error } = useQuery({
    queryFn: () => getTodoList({ title: "" }), // 빈 검색어로 모든 데이터를 가져옵니다.
    queryKey: ["todos"],
  });

  const { mutate: postTodoMutation } = useMutation({
    mutationFn: postTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const { mutate: patchTodoMutation } = useMutation({
    mutationFn: patchTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const { mutate: deleteTodoMutation } = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  // 검색 기능 관련 코드 주석 처리
  /*
  const debouncedUpdate = _.debounce((value) => {
    setDebouncedSearch(value);
  }, 300);

  useEffect(() => {
    debouncedUpdate(search);
    return () => debouncedUpdate.cancel();
  }, [search]);
  */

  const handleCreate = (title, content) => {
    postTodoMutation({ title, content });
  };


return (
  <S.PageContainer>
    <S.Title>⚡ UMC ToDoList ⚡</S.Title>
     {/* 검색 기능 비활성화 */}
      {/* 
      <S.InputField
        placeholder="검색어를 입력하세요"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      /> 
      */}
    <TodoForm onCreate={handleCreate} />

    {isPending ? (
      <Loading />
    ) : isError ? (
      <ErrorDisplay message={error.message} />
    ) : (
      <S.Container>
        {todos[0]?.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            editingId={editingId}
            setEditingId={setEditingId}
            patchTodo={patchTodoMutation}
            deleteTodo={deleteTodoMutation}
          />
        ))}
      </S.Container>
    )}
  </S.PageContainer>
);
};

export default TodoList;