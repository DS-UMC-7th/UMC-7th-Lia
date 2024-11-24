import React, { useState, useEffect } from 'react';
import TodoInput from './features/todos/TodoInput';
import TodosList from './features/todos/TodosList';

const App = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedDate = `${currentTime.getFullYear()}년 ${String(
    currentTime.getMonth() + 1
  ).padStart(2, '0')}월 ${String(currentTime.getDate()).padStart(2, '0')}일`;

  const formattedDay = currentTime.toLocaleDateString('ko-KR', {
    weekday: 'long',
  });

  const formattedTime = currentTime.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return (
    <div className="todo-container">
      <header className="todo-header">
        <div className="todo-date">
          <p>{formattedDate}</p>
          <span>{formattedDay}</span>
        </div>
        <div className="todo-time">{formattedTime}</div>
      </header>
      <TodoInput />
      <TodosList />
    </div>
  );
};

export default App;
