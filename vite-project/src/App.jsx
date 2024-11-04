import { useContext, useState } from 'react';
import './App.css';
import Button from './Button';
import Input from './Input';
import { TodoContext } from './context/TodoContext';

function App() {
  const {todos,
    text,
    setText,
    editText,
    editingId,
    setEditingId,
    setEditText,
    handleSubmit,
    addTodo,
    deleteTodo,
    updateTodo,} = useContext(TodoContext);

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="todo-form">
        <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="할 일을 입력하세요" />
        <Button onClick={addTodo} type="submit">할 일 등록</Button>
      </form>

      <div className="todo-list">
        {todos.map((todo) => (
          <div key={todo.id} className="todo-item">
            {editingId !== todo.id ? (
              <div className="todo-text">
                <p>{todo.id}.</p>
                <p>{todo.task}</p>
              </div>
            ) : (
              <div className="todo-edit">
                <p>{todo.id}.</p>
                <Input defaultValue={todo.task} onChange={(e) => setEditText(e.target.value)} />
              </div>
            )}

            <div className="btn-group">
              <Button onClick={() => deleteTodo(todo.id)}>삭제하기</Button>
              {editingId === todo.id ? (
                <Button onClick={() => updateTodo(editingId, editText)}>수정 완료</Button>
              ) : (
                <Button onClick={() => setEditingId(todo.id)}>수정 진행</Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
