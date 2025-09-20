import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
//import App from './App.tsx'
//import Todolist from "./components/TodoList.tsx";
// import Grade from "./components/Grade.tsx";
//import TodolistHook from "./components/TodoListHook.tsx";
import State from "./components/State.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/*<App />*/}
    {/*<Todolist />*/}
    {/* {<Grade />} */}
    {/*<TodolistHook />*/}
    <State />
  </StrictMode>
);
