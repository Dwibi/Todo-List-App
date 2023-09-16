import App from "./App";
import { fireEvent, render, screen } from "@testing-library/react";

// Mock a component that App page use
jest.mock("./Components/TodoForm/TodoForm", () => {
  return ({ addTodo }) => (
    <div>
      <button onClick={() => addTodo("Todo Title")}>Add</button>
    </div>
  );
});

// Mock a component that App page use
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
    render(<App />); // Render the component for first time

    const addButtonElement = screen.getByText("Add"); // Get a element that have text "Add" in this case a button
    const todoTitle = screen.getByText("TODO LIST"); // Get a element that have text "TODO LIST" in this case a h1 element / title

    expect(addButtonElement).toBeTruthy(); // Expect add button to show in screen
    expect(todoTitle).toBeTruthy(); // Expect h1 element / title to show in screen
  });

  it("Should add a list into state and localstorage", () => {
    const { rerender } = render(<App />); // Render the component for first time

    const addButtonElement = screen.getByText("Add"); // Get a element that have text "Add" in this case a button
    fireEvent.click(addButtonElement); // click the Add Button Element to run AddTodo function

    rerender(<App />); // Rerender the component after click the add button element

    const paragraphElement = screen.getByText(/Todo Title/i); // Get a element that have text same like RegExp /Todo Title/i in this case a paragraph element
    const mockJson = [{ todo: "Todo Title", isCompleted: false }]; // value that will be in the localstorage
    const localStorageKey = "todoList"; // a key that will be passed into localstorage getItem function

    expect(paragraphElement).toBeTruthy(); // Expect the paragraph element to show in screen
    expect(localStorage.getItem(localStorageKey)).toEqual(
      JSON.stringify(mockJson)
    ); // Expect the localStorage that have key "todoList" have a value like mockJson variable
  });

  it("Should change isCompleted on state and localstorage if checkbox was click", () => {
    const { rerender } = render(<App />); // Render the component for first time
    const addButtonElement = screen.getByText("Add"); // Get a element that have text "Add" in this case a button
    fireEvent.click(addButtonElement); // Click the Add Button Element to run AddTodo function

    rerender(<App />); // Rerender the component after click the add button element

    const CheckboxElement = screen.getByPlaceholderText("checkbox"); // Get a element that have placehodler text "checkbox" in this case a checkbox input element
    fireEvent.click(CheckboxElement); // Click the checkbox input Element to run completedTodo function
    expect(CheckboxElement.checked).toBe(true); // Expect the checkbox to be checked

    rerender(<App />); // Rerender the component after click the checkbox input element

    const mockJson = [{ todo: "Todo Title", isCompleted: true }]; // value that will be in the localstorage
    const localStorageKey = "todoList"; // a key that will be passed into localstorage getItem function
    expect(localStorage.getItem(localStorageKey)).toEqual(
      JSON.stringify(mockJson)
    ); // Expect the localStorage that have key "todoList" have a value like mockJson variable
  });

  it("Should delete a list on state and localstorage if delete button was click", () => {
    const { rerender } = render(<App />); // Render the component for first time

    // add a todo list
    const addButtonElement = screen.getByText("Add"); // Get a element that have text "Add" in this case a button
    fireEvent.click(addButtonElement); // click the Add Button Element to run AddTodo function

    rerender(<App />); // Rerender the component after click the add button element

    //trigger the button delete button
    const todoDeleteElement = screen.getByText("Delete");
    fireEvent.click(todoDeleteElement);

    rerender(<App />); // Rerender the component after click the add button element

    const paragraphElement = screen.queryByText(/Todo Title/i); // Get a element that have text same like RegExp /Todo Title/i in this case a paragraph element
    expect(paragraphElement).toBeNull(); // Expect the paragraph element is not show in screen

    const mockJson = []; // value that will be in the localstorage
    const localStorageKey = "todoList"; // a key that will be passed into localstorage getItem function
    expect(localStorage.getItem(localStorageKey)).toEqual(
      JSON.stringify(mockJson)
    ); // Expect the localStorage that have key "todoList" have a value like mockJson variable
  });

  it("should update a list on state and localstorage if change button was click", () => {
    const { rerender } = render(<App />); // Render the component for first time

    // add a todo list
    const addButtonElement = screen.getByText("Add"); // Get a element that have text "Add" in this case a button
    fireEvent.click(addButtonElement); // click the Add Button Element to run AddTodo function

    rerender(<App />); // Rerender the component after click the add button element

    //trigger the button edit button button
    // to show Change button and input for change
    const EditElement = screen.getByText("Edit"); // Get a element that have text "Edit" in this case a button
    fireEvent.click(EditElement); // click the edit button to run setIsEdit function

    rerender(<App />); // Rerender the component after click the edit button element

    const inputChangeEl = screen.queryByPlaceholderText(
      "Please enter your todo"
    ); // Get a element that have placeholder text "Please enter your todo" in this case a input text

    const testValue = "test todo test"; // value that will be passed to input value
    fireEvent.change(inputChangeEl, { target: { value: testValue } }); // Change the input value to be the same as testValue

    const changeButton = screen.queryByText("Change"); // Get a element that have text "Change" in this case a button
    fireEvent.click(changeButton); // Click the change button to run clickChangeHandler function

    const paragraphElement = screen.queryByText(testValue); // Get a element that have text same like testValue in this case a paragraph element
    expect(paragraphElement).toBeTruthy(); // Expect paragraph element to show in screen

    const mockJson = [{ todo: testValue, isCompleted: false }]; // value that will be in the localstorage
    const localStorageKey = "todoList"; // a key that will be passed into localstorage getItem function

    expect(localStorage.getItem(localStorageKey)).toEqual(
      JSON.stringify(mockJson)
    ); // Expect the localStorage that have key "todoList" have a value like mockJson variable
  });
});
