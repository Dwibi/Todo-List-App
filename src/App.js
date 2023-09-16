import { useEffect, useState } from "react";
import "./App.css";
import TodoForm from "./Components/TodoForm/TodoForm";
import TodoItem from "./Components/TodoItem/TodoItem";

const localValue = localStorage.getItem("todoList");

function App() {
  const [todoList, setTodoList] = useState(() => JSON.parse(localValue) || []);

  const addTodo = (todo) => {
    setTodoList([...todoList, { todo: todo, isCompleted: false }]);
  };

  const deleteTodo = (index) => {
    let tempTodoList = [...todoList];
    tempTodoList.splice(index, 1);
    setTodoList(tempTodoList);
  };

  const completedTodo = (index) => {
    let tempTodoList = [...todoList];
    tempTodoList[index].isCompleted = !tempTodoList[index].isCompleted;
    setTodoList(tempTodoList);
  };

  const changeTodoList = (index, value) => {
    let tempTodoList = [...todoList];
    tempTodoList[index].todo = value;
    setTodoList(tempTodoList);
  };

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div className="App">
      <h1>TODO LIST</h1>
      <TodoForm addTodo={addTodo} />
      <div className="todo-list-container">
        {todoList.map((value, index) => {
          return (
            <TodoItem
              key={index}
              index={index}
              todo={value.todo}
              isCompleted={value.isCompleted}
              deleteTodo={deleteTodo}
              completedTodo={completedTodo}
              changeTodoList={changeTodoList}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
