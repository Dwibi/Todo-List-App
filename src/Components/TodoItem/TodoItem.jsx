import { useState } from "react";
import "./todoItem.css";

function TodoItem({
  index,
  todo,
  isCompleted,
  deleteTodo,
  completedTodo,
  changeTodoList,
}) {
  const [newTodo, setNewTodo] = useState(todo);
  const [isEdit, setIsEdit] = useState(false);

  const deleteHandler = () => {
    deleteTodo(index);
  };

  const checkboxHandler = () => {
    completedTodo(index);
  };

  const clickChangeHandler = () => {
    setIsEdit(false);
    changeTodoList(index, newTodo);
  };

  return (
    <div className="item-wrapper">
      <input
        readOnly
        onClick={checkboxHandler}
        disabled={isEdit}
        type="checkbox"
        placeholder="checkbox"
        checked={isCompleted}
      />

      {isEdit ? (
        <input
          type="text"
          placeholder="Please enter your todo"
          onChange={(e) => setNewTodo(e.target.value)}
          value={newTodo}
        />
      ) : (
        <p>{todo}</p>
      )}

      {isEdit ? (
        <button disabled={!newTodo} onClick={clickChangeHandler}>
          Change
        </button>
      ) : (
        <>
          <button onClick={() => setIsEdit(true)}>Edit</button>
          <button onClick={deleteHandler}>Delete</button>
        </>
      )}
    </div>
  );
}

export default TodoItem;
