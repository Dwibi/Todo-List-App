import { fireEvent, render, screen } from "@testing-library/react";
import TodoItem from "./TodoItem";
import React from "react";

test("todo item checkbox should be render", () => {
  const mockDeleteTodo = jest.fn();
  const mockCompletedTodo = jest.fn();
  render(
    <TodoItem
      index={0}
      todo={"test todo"}
      isCompleted={false}
      deleteTodo={mockDeleteTodo}
      completedTodo={mockCompletedTodo}
    />
  );
  const todoCheckboxEl = screen.getByPlaceholderText("checkbox");
  expect(todoCheckboxEl).toBeInTheDocument();
});

test("todo item title should be render", () => {
  const mockDeleteTodo = jest.fn();
  const mockCompletedTodo = jest.fn();
  const todoTitleTest = "test todo";
  render(
    <TodoItem
      index={0}
      todo={todoTitleTest}
      isCompleted={false}
      deleteTodo={mockDeleteTodo}
      completedTodo={mockCompletedTodo}
    />
  );
  const todoCheckboxEl = screen.getByText(/test todo/i);
  expect(todoCheckboxEl).toBeTruthy();
});

test("todo item button delete should be render", () => {
  const mockDeleteTodo = jest.fn();
  const mockCompletedTodo = jest.fn();
  const todoTitleTest = "test todo";
  render(
    <TodoItem
      index={0}
      todo={todoTitleTest}
      isCompleted={false}
      deleteTodo={mockDeleteTodo}
      completedTodo={mockCompletedTodo}
    />
  );
  const deleteButton = screen.getByText("Delete");
  expect(deleteButton).toBeInTheDocument();
});

test("click todo item button delete should be delete", () => {
  const mockDeleteTodo = jest.fn();
  const mockCompletedTodo = jest.fn();
  const todoTitleTest = "test todo";
  render(
    <TodoItem
      index={0}
      todo={todoTitleTest}
      isCompleted={false}
      deleteTodo={mockDeleteTodo}
      completedTodo={mockCompletedTodo}
    />
  );
  const deleteButton = screen.getByText("Delete");
  fireEvent.click(deleteButton);
  expect(mockDeleteTodo).toHaveBeenCalledTimes(1);
  expect(mockDeleteTodo).toHaveBeenCalledWith(0);
});

test("todo item checkbox should be change if click", () => {
  const mockDeleteTodo = jest.fn();
  const mockCompletedTodo = jest.fn();
  render(
    <TodoItem
      index={0}
      todo={"test todo"}
      isCompleted={false}
      deleteTodo={mockDeleteTodo}
      completedTodo={mockCompletedTodo}
    />
  );
  const todoCheckboxEl = screen.getByPlaceholderText("checkbox");
  fireEvent.click(todoCheckboxEl);
  expect(mockCompletedTodo).toHaveBeenCalledTimes(1);
  expect(mockCompletedTodo).toHaveBeenCalledWith(0);
});

test("todo input for change and button change not called first render", () => {
  const mockDeleteTodo = jest.fn();
  const mockCompletedTodo = jest.fn();
  const mockChangeTodoList = jest.fn();
  const testTodoValue = "test todo";

  render(
    <TodoItem
      index={0}
      todo={testTodoValue}
      isCompleted={false}
      deleteTodo={mockDeleteTodo}
      completedTodo={mockCompletedTodo}
      changeTodoList={mockChangeTodoList}
    />
  );

  const todoInputChangeEl = screen.queryByPlaceholderText(
    "Please enter your todo"
  );
  expect(todoInputChangeEl).toBeNull();

  const changeButton = screen.queryByText("Change");
  expect(changeButton).toBeNull();
});

test("todo item paragraph turn into input for change and change button is visible after click edit button", () => {
  const mockDeleteTodo = jest.fn();
  const mockCompletedTodo = jest.fn();
  const mockChangeTodoList = jest.fn();
  const testTodoValue = "test todo";

  render(
    <TodoItem
      index={0}
      todo={testTodoValue}
      isCompleted={false}
      deleteTodo={mockDeleteTodo}
      completedTodo={mockCompletedTodo}
      changeTodoList={mockChangeTodoList}
    />
  );

  const editButton = screen.getByText("Edit");

  fireEvent.click(editButton);

  const todoInputChangeEl = screen.getByPlaceholderText(
    "Please enter your todo"
  );
  expect(todoInputChangeEl).toBeInTheDocument();
  expect(todoInputChangeEl.value).toBe(testTodoValue);

  const changeButton = screen.queryByText("Change");
  expect(changeButton).toBeInTheDocument();

  // call editButton after state change
  const newEditButton = screen.queryByText("Edit");
  expect(newEditButton).not.toBeInTheDocument();

  // call deleteButton after state change
  const newDeleteButton = screen.queryByText("Delete");
  expect(newDeleteButton).not.toBeInTheDocument();
});

test("change button is disabled if input change doesn't exist", () => {
  const mockDeleteTodo = jest.fn();
  const mockCompletedTodo = jest.fn();
  const mockChangeTodoList = jest.fn();
  const testTodoValue = "test todo";

  render(
    <TodoItem
      index={0}
      todo={testTodoValue}
      isCompleted={false}
      deleteTodo={mockDeleteTodo}
      completedTodo={mockCompletedTodo}
      changeTodoList={mockChangeTodoList}
    />
  );

  const editButton = screen.getByText("Edit");
  fireEvent.click(editButton);

  const todoInputChangeEl = screen.getByPlaceholderText(
    "Please enter your todo"
  );
  const testValue = "";
  fireEvent.change(todoInputChangeEl, { target: { value: testValue } });
  expect(todoInputChangeEl.value).toBe(testValue);

  const changeButton = screen.queryByText("Change");
  expect(changeButton).toBeDisabled();
});

test("checkbox is disabled if in edit mode", () => {
  const mockDeleteTodo = jest.fn();
  const mockCompletedTodo = jest.fn();
  const mockChangeTodoList = jest.fn();
  const testTodoValue = "test todo";

  render(
    <TodoItem
      index={0}
      todo={testTodoValue}
      isCompleted={false}
      deleteTodo={mockDeleteTodo}
      completedTodo={mockCompletedTodo}
      changeTodoList={mockChangeTodoList}
    />
  );

  const editButton = screen.getByText("Edit");
  fireEvent.click(editButton);

  const todoCheckboxEl = screen.getByPlaceholderText("checkbox");
  expect(todoCheckboxEl).toBeDisabled();
});

test("todo is change after click change button", () => {
  const mockDeleteTodo = jest.fn();
  const mockCompletedTodo = jest.fn();
  const mockChangeTodoList = jest.fn();
  const testTodoValue = "test todo";

  render(
    <TodoItem
      index={0}
      todo={testTodoValue}
      isCompleted={false}
      deleteTodo={mockDeleteTodo}
      completedTodo={mockCompletedTodo}
      changeTodoList={mockChangeTodoList}
    />
  );

  const editButton = screen.getByText("Edit");
  fireEvent.click(editButton);

  const todoInputChangeEl = screen.queryByPlaceholderText(
    "Please enter your todo"
  );
  const testValue = "test todo test";
  fireEvent.change(todoInputChangeEl, { target: { value: testValue } });

  const changeButton = screen.queryByText("Change");
  expect(changeButton).toBeInTheDocument();
  fireEvent.click(changeButton);
  expect(mockChangeTodoList).toHaveBeenCalledTimes(1);
  expect(mockChangeTodoList).toHaveBeenCalledWith(0, testValue);

  // get editButton again
  const newEditButton = screen.getByText("Edit");
  expect(newEditButton).toBeInTheDocument();

  // get input change again
  const newTodoInputChangeEl = screen.queryByPlaceholderText(
    "Please enter your todo"
  );
  expect(newTodoInputChangeEl).toBeNull();

  // get change button again
  const newChangeButton = screen.queryByText("Change");
  expect(newChangeButton).toBeNull();
});
