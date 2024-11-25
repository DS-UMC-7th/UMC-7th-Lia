import * as S from "../src/TodoStyle";
import { useState } from "react";

const TodoForm = ({ onCreate }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(title, content);
    setTitle("");
    setContent("");
  };

  return (
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
  );
};

export default TodoForm;
