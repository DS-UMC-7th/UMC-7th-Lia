import { useState, useEffect } from "react";
import { getTodoList, postTodo, patchTodo, deleteTodo } from "../apis/todo";
import TodoForm from "../components/TodoForm";
import TodoItem from "../components/TodoItem";
import Loading from "../components/Loading";
import ErrorDisplay from "../components/ErrorDisplay";
import * as S from "./TodoStyle";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);

  // fetchTodos 함수 정의
  const fetchTodos = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getTodoList({ title: "" });
      setTodos(data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect로 데이터 로드
  useEffect(() => {
    fetchTodos();
  }, []);

  // Todo 생성
  const handleCreate = async (title, content) => {
    try {
      await postTodo({ title, content });
      fetchTodos(); // 생성 후 데이터 다시 로드
    } catch (err) {
      console.error("Failed to create todo:", err);
    }
  };

  // Todo 수정
  const handleUpdate = async (id, updatedData) => {
    try {
      await patchTodo({ id, ...updatedData });
      fetchTodos(); // 수정 후 데이터 다시 로드
    } catch (err) {
      console.error("Failed to update todo:", err);
    }
  };

  // Todo 삭제
  const handleDelete = async (id) => {
    try {
      await deleteTodo({ id });
      fetchTodos(); // 삭제 후 데이터 다시 로드
    } catch (err) {
      console.error("Failed to delete todo:", err);
    }
  };

  if (isLoading) return <Loading />;
  if (error) return <ErrorDisplay message={error.message} />;

  return (
    <S.PageContainer>
      <S.Title>⚡ UMC ToDoList ⚡</S.Title>
      <TodoForm onCreate={handleCreate} />

      <S.Container>
        {todos[0]?.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            editingId={editingId}
            setEditingId={setEditingId}
            patchTodo={handleUpdate}
            deleteTodo={handleDelete}
            refreshTodos={fetchTodos}
          />
        ))}
      </S.Container>
    </S.PageContainer>
  );
};

export default TodoList;
