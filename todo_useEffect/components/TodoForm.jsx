import * as S from "../src/TodoStyle";
import { useState } from "react";

const TodoForm = ({ onCreate }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return; // 중복 제출 방지

    setIsSubmitting(true);
    try {
      await onCreate(title, content); // 비동기 작업 수행
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Failed to create ToDo:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <S.FormContainer onSubmit={handleSubmit}>
      <S.InputField
        name="title"
        placeholder="제목을 입력해주세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={isSubmitting} // 제출 중에는 입력 비활성화
      />
      <S.InputField
        name="content"
        placeholder="내용을 입력해주세요"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        disabled={isSubmitting} // 제출 중에는 입력 비활성화
      />
      <S.SubmitButton type="submit" disabled={isSubmitting}>
        {isSubmitting ? "생성 중..." : "ToDo 생성"}
      </S.SubmitButton>
    </S.FormContainer>
  );
};

export default TodoForm;
