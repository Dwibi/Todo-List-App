import App from "./App";
import { fireEvent, render, screen } from "@testing-library/react";

jest.mock("./Components/TodoForm/TodoForm", () => {
  return ({ addTodo }) => (
    <div>
      <button onClick={() => addTodo("Todo Title")}>Todo</button>
    </div>
  );
});

jest.mock("./Components/TodoItem/TodoItem", () => {
  const React = require("react");

  return ({
    index,
    todo,
    isCompleted,
    deleteTodo,
    completedTodo,
    changeTodoList,
  }) => {
    const [newTodo, setNewTodo] = React.useState(todo);
    const [isEdit, setIsEdit] = React.useState(false);

    const clickChangeHandler = () => {
      setIsEdit(false);
      changeTodoList(index, newTodo);
    };

    return (
      <div className="item-wrapper">
        <input
          readOnly
          onClick={() => completedTodo(index)}
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
            <button onClick={() => deleteTodo(index)}>Delete</button>
          </>
        )}
      </div>
    );
  };
});

describe("App component", () => {
  beforeEach(() => {
    localStorage.clear(); // Clear localStorage before each test
  });

  it("Should render its component children", () => {
    render(<App />);
    const todoElement = screen.getByText("Todo");
    const todoTitle = screen.getByText("TODO LIST");

    expect(todoElement).toBeTruthy();
    expect(todoTitle).toBeTruthy();
  });

  it("Should add a list into state and localstorage", () => {
    const { rerender } = render(<App />);
    const todoElement = screen.getByText("Todo");
    fireEvent.click(todoElement);

    rerender(<App />);

    const todoElementSecond = screen.getByText(/Todo Title/i);
    const mockJson = [{ todo: "Todo Title", isCompleted: false }];
    const mockId = "todoList";
    expect(todoElementSecond).toBeTruthy();
    expect(localStorage.getItem(mockId)).toEqual(JSON.stringify(mockJson));
  });

  it("Should change isCompleted on state and localstorage if checkbox was click", () => {
    const { rerender } = render(<App />);
    const todoElement = screen.getByText("Todo");
    fireEvent.click(todoElement);

    rerender(<App />);

    const todoCheckboxEl = screen.getByPlaceholderText("checkbox");
    fireEvent.click(todoCheckboxEl);

    expect(todoCheckboxEl.checked).toBe(true);

    rerender(<App />);

    const mockJson = [{ todo: "Todo Title", isCompleted: true }];
    const mockId = "todoList";

    expect(todoCheckboxEl.checked).toBe(true);
    expect(localStorage.getItem(mockId)).toEqual(JSON.stringify(mockJson));
  });

  it("Should delete a list on state and localstorage if delete button was click", () => {
    const { rerender } = render(<App />);

    // add a todo list
    const todoElement = screen.getByText("Todo");
    fireEvent.click(todoElement);

    rerender(<App />);

    //trigger the button delete button
    const todoDeleteElement = screen.getByText("Delete");
    fireEvent.click(todoDeleteElement);

    rerender(<App />);

    // Check if the deleted todo item is not present in the rendered output
    const todoElementSecond = screen.queryByText(/Todo Title/i);
    const mockJson = [];
    const mockId = "todoList";

    expect(localStorage.getItem(mockId)).toEqual(JSON.stringify(mockJson));
    expect(todoElementSecond).toBeNull();
  });

  it("should update a list on state and localstorage if change button was click", () => {
    const { rerender } = render(<App />);

    // add a todo list
    const todoElement = screen.getByText("Todo");
    fireEvent.click(todoElement);

    rerender(<App />);

    //trigger the button edit button button
    // to show Change button and input for change
    const todoEditElement = screen.getByText("Edit");
    fireEvent.click(todoEditElement);

    rerender(<App />);

    const todoInputChangeEl = screen.queryByPlaceholderText(
      "Please enter your todo"
    );

    const testValue = "test todo test";
    // change input to test value
    fireEvent.change(todoInputChangeEl, { target: { value: testValue } });

    const changeButton = screen.queryByText("Change");

    expect(changeButton).toBeInTheDocument();

    fireEvent.click(changeButton);

    // Check if the updated todo item is present in the rendered output
    // and update the localStorage
    const todoElementSecond = screen.queryByText(testValue);
    const mockJson = [{ todo: testValue, isCompleted: false }];
    const mockId = "todoList";

    expect(localStorage.getItem(mockId)).toEqual(JSON.stringify(mockJson));
    expect(todoElementSecond).toBeTruthy();
  });
});
