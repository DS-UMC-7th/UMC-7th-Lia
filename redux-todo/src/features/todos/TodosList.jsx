import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTodo, deleteTodo } from './todosSlice';

export default function TodosList() {
  const todos = useSelector((state) => state.todos); // Redux에서 todos 상태 가져오기
  const dispatch = useDispatch();

  return (
    <ul className="todo-list">
      {todos.length === 0 ? (
        <li className="empty-message">할 일이 없습니다!</li>
      ) : (
        todos.map((todo) => (
          <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <span
              className="todo-text"
              onClick={() => dispatch(toggleTodo(todo.id))}
            >
              {todo.text}
            </span>
            <div className="todo-buttons">
              <button
                className="complete-button"
                onClick={() => dispatch(toggleTodo(todo.id))}
              >
                {todo.completed ? '취소' : '완료'}
              </button>
              <button
                className="delete-button"
                onClick={() => dispatch(deleteTodo(todo.id))}
              >
                삭제
              </button>
            </div>
          </li>
        ))
      )}
    </ul>
  );
}
