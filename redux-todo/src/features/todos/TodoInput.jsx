import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from  './todosSlice';
import '../../../src/styles.css';


export default function InputTodo() {
  const dispatch = useDispatch();

  const [todolist, setTodolist] = useState({
    id: 0,
    text: '',
  });

  function handleText(e) {
    setTodolist({
      id: Date.now(), // 고유 ID 추가
      text: e.target.value,
    });
  }

  function onReset() {
    setTodolist({ id: Date.now(), text: '' }); // ID 유지
  }

  return (
    <div className="InputTodo">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (todolist.text !== '') {
            dispatch(addTodo(todolist.text)); // Redux로 액션 디스패치
          } else {
            alert('할 일을 입력해주세요!');
          }
          onReset(); // 입력 필드 리셋
        }}
      >
        <div>
          <input
            className="textbar"
            type="text"
            value={todolist.text}
            onChange={handleText}
            placeholder="할 일을 입력하세요"
          />
          <input className="submitbutton" type="submit" value="+" />
        </div>
      </form>
    </div>
  );
}