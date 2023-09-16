import { useState } from "react";
import "./todoForm.css";

export default function TodoForm({ addTodo }) {
  const [todo, setTodo] = useState("");

  const clickHandler = (e) => {
    e.preventDefault();
    addTodo(todo);
    setTodo("");
  };

  return (
    <form className="form">
      <input
        className="input"
        type="text"
        placeholder="Add a todo"
        onChange={(e) => setTodo(e.target.value)}
        value={todo}
      />
      <button className="btn-add" onClick={clickHandler} disabled={!todo}>
        Add
      </button>
    </form>
  );
}
