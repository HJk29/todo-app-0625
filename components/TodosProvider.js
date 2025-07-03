import { dateToStr } from "../utils/util";
import React, { createContext, useState, useRef } from "react";

const TodosContext = createContext();

export const TodosProvider = ({ children }) => {


  const testTodo = [
    {
      id: 1,
      content: "테스트 치기",
      regDate: dateToStr(new Date())
    },
    {
      id: 2,
      content: "리액트 공부",
      regDate: dateToStr(new Date())
    },
    {
      id: 3,
      content: "밥 먹기",
      regDate: dateToStr(new Date())
    },
  ]

  // const [todos, setTodos] = useState([]);
  // const lastTodoIdRef = useRef(0);
  
  const [todos, setTodos] = useState([...testTodo]);
  const lastTodoIdRef = useRef(testTodo.length);

  const addTodo = (newContent) => {
    const id = ++lastTodoIdRef.current;
    const newTodo = {
      id,
      content: newContent,
      regDate: dateToStr(new Date),
    };

    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
  };

  //삭제 형태를 이런 식으로 구현함.
  const removeTodo = (id) => {
    const newTodos = todos.filter ((todo) => todo.id != id);
    setTodos(newTodos);
  };

  return (
    <TodosContext.Provider value={{ todos, addTodo, removeTodo }}>
      {children}
    </TodosContext.Provider>
  );
}
export default TodosContext;