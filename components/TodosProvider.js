import { dateToStr } from "../utils/util";
import React, { createContext, useState, useRef } from "react";
import testTodosData from "./TestTodosData";

const TodosContext = createContext();

export const TodosProvider = ({ children }) => {


  // const [todos, setTodos] = useState([]);
  // const lastTodoIdRef = useRef(0);
  
  const [todos, setTodos] = useState([...testTodosData]);
  const lastTodoIdRef = useRef(testTodosData.length);

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

    const modifyTodo = (id, newContent) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, content: newContent } : todo
    );

    setTodos(newTodos);
  };

  //삭제 형태를 이런 식으로 구현함.
  const removeTodo = (id) => {
    const newTodos = todos.filter ((todo) => todo.id != id);
    setTodos(newTodos);
  };

  return (
    <TodosContext.Provider value={{ todos, addTodo, removeTodo, modifyTodo }}>
      {children}
    </TodosContext.Provider>
  );
}
export default TodosContext;