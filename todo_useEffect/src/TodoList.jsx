import { useState, useEffect } from "react";
import { getTodoList, postTodo, patchTodo, deleteTodo } from "../apis/todo";
import TodoForm from "../components/TodoForm";
import TodoItem from "../components/TodoItem";
import Loading from "../components/Loading";
import ErrorDisplay from "../components/ErrorDisplay";
import useDebounce from "../hooks/useDebounce"; // 디바운스 훅 임포트
import * as S from "./TodoStyle";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태
  const debouncedSearchTerm = useDebounce(searchTerm, 700); // 디바운싱 적용

  // fetchTodos 함수 정의
  const fetchTodos = async (title = "") => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getTodoList({ title }); // 검색어를 query parameter로 전달
      setTodos(data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect로 데이터 로드 및 검색어에 따른 호출
  useEffect(() => {
    fetchTodos(debouncedSearchTerm); // 디바운스된 검색어로 호출
  }, [debouncedSearchTerm]);

  // 검색 핸들러
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

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

  return (
    <S.PageContainer>
      <S.Title>⚡ UMC ToDoList ⚡</S.Title>
      <TodoForm onCreate={handleCreate} />

      {/* 검색 입력 필드 */}
      <S.SearchInput
        type="text"
        placeholder="제목으로 검색"
        value={searchTerm}
        onChange={handleSearch}
      />

      <S.Container>
        {isLoading && <Loading />} {/* 로딩 상태 표시 */}
        {error && <ErrorDisplay message={error.message} />} {/* 에러 상태 표시 */}
        {!isLoading &&
          !error &&
          todos[0]?.map((todo) => (
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

