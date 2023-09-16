import { fireEvent, render, screen } from "@testing-library/react";
import TodoForm from "./TodoForm";

test("todo form input should be render", () => {
  render(<TodoForm />);
  const todoInputEl = screen.getByPlaceholderText(/add a todo/i);
  expect(todoInputEl).toBeInTheDocument();
});

test("todo form input should be empty first render", () => {
  render(<TodoForm />);
  const todoInputEl = screen.getByPlaceholderText(/add a todo/i);
  expect(todoInputEl.value).toBe("");
});

test("todo form input should be change", () => {
  render(<TodoForm />);
  const todoInputEl = screen.getByPlaceholderText(/add a todo/i);
  const testValue = "test value";

  fireEvent.change(todoInputEl, { target: { value: testValue } });

  expect(todoInputEl.value).toBe(testValue);
});

test("todo form button add should be rendered", () => {
  render(<TodoForm />);
  const todoButtonAddEl = screen.getByRole("button");
  expect(todoButtonAddEl).toBeInTheDocument();
});

test("todo form button should be disabled if inpput is empty", () => {
  render(<TodoForm />);
  const todoButtonAddEl = screen.getByRole("button");
  const todoInputEl = screen.getByPlaceholderText(/add a todo/i);
  const testValue = "";

  fireEvent.change(todoInputEl, { target: { value: testValue } });
  expect(todoButtonAddEl).toBeDisabled();
});

test("todo form button shouldn't be disabled if inpput is exists", () => {
  render(<TodoForm />);
  const todoButtonAddEl = screen.getByRole("button");
  const todoInputEl = screen.getByPlaceholderText(/add a todo/i);
  const testValue = "test value";

  fireEvent.change(todoInputEl, { target: { value: testValue } });
  expect(todoButtonAddEl).not.toBeDisabled();
});

test("clicking the todo form button with a non-empty input value calls clickHandler", () => {
  const mockAddTodo = jest.fn();

  render(<TodoForm addTodo={mockAddTodo} />);

  const input = screen.getByPlaceholderText("Add a todo");
  fireEvent.change(input, { target: { value: "Test Todo" } });

  const addButton = screen.getByRole("button");
  fireEvent.click(addButton);

  expect(mockAddTodo).toHaveBeenCalledTimes(1);
  expect(mockAddTodo).toHaveBeenCalledWith("Test Todo");
});

test("todo form input should be empty after click button add", () => {
  const mockAddTodo = jest.fn();

  render(<TodoForm addTodo={mockAddTodo} />);
  const todoInputEl = screen.getByPlaceholderText(/add a todo/i);
  const testValue = "test value";
  fireEvent.change(todoInputEl, { target: { value: testValue } });

  const addButton = screen.getByRole("button");
  fireEvent.click(addButton);

  expect(todoInputEl.value).toBe("");
});
