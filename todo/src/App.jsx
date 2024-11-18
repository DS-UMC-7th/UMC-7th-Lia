import { useState } from "react";
import * as S from "./TodoStyle";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteTodo, getTodoList ,patchTodo,postTodo} from "../apis/todo";
import { queryClient } from "./main";


function App() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [search,setSearch] = useState("")

  const {data:todos,isPending} =useQuery({
    queryFn: () => getTodoList({title:search}),
    queryKey: ["todos",search],
  })

  const {mutate:postTodoMutation} = useMutation({
    mutationFn:postTodo,
    onSuccess: ()=>{
      queryClient.invalidateQueries({
        queryKey:["todos"],
      })
     },
    onError: (error)=>{
      console.log(error);
     },

  })

  const {mutate:deleteTodoMutation} = useMutation({
    mutationFn:deleteTodo,
    onSuccess: ()=>{
      queryClient.invalidateQueries({
        queryKey:["todos"],
      })
     },

  })

  const {mutate:patchTodoMutation} = useMutation({
    mutationFn:patchTodo,
    onSuccess: ()=>{
      queryClient.invalidateQueries({
        queryKey:["todos"],
      })
     },

  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(title,content)
    postTodoMutation({title,content})
  };

  return (
    <>
    <h1>todo검색</h1>
    <S.InputField value={search} onChange={(e) => setSearch(e.target.value)}/>
      <S.FormContainer onSubmit={handleSubmit}>
      <S.InputField
        name="title"
        placeholder="제목을 입력해주세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <S.InputField
        name="content"
        placeholder="컨텐츠를 입력해주세요"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <S.SubmitButton type="submit">Todo 생성</S.SubmitButton>
    </S.FormContainer>
    {isPending ? (
        <div>로딩중입니다.</div>
      ) : (
        <S.Container>
          {todos[0]?.map((todo) => {
            console.log(todo);
            return (
              <S.TodoContainer key={todo.id}>
                <input type="checkbox" defaultChecked={todo.checked} onChange={(e)=>patchTodoMutation({id:todo.id,checked:!todo.checked})}/>
                <div>
                <p>{todo.title}</p>
                <p>{todo.content}</p>
                </div>
                <button onClick={()=>deleteTodoMutation({id:todo.id})}>삭제하기</button>
              </S.TodoContainer>
            );
          })}
        </S.Container>
      )}
    </>
  );
}


export default App;
