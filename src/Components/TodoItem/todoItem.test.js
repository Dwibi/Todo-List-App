import { fireEvent, render, screen } from "@testing-library/react";
import TodoItem from "./TodoItem";
import React from "react";

describe("TodoItem Component", () => {
  it("Should render checkbox for first render", () => {
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

  it("Should render paragraph for first render", () => {
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

  it("Should render delete button for first render", () => {
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

  it("Should render edit button for first render", () => {
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
    const deleteButton = screen.getByText("Edit");
    expect(deleteButton).toBeInTheDocument();
  });

  it("Should not render input for first render", () => {
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
  });

  it("Should not render change button for first render", () => {
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
    const changeButton = screen.queryByText("Change");
    expect(changeButton).toBeNull();
  });

  it("Delete button should delete todo from list if delete button was click", () => {
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

  it("Checkbox should be change if checkbox was click", () => {
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

  it("Paragraph should be turn into input and value must same with paragraph if edit button was click", () => {
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
  });

  it("Edit button and delete button should be turn into change button if edit button was click", () => {
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

    const changeButton = screen.queryByText("Change");
    expect(changeButton).toBeInTheDocument();

    // call editButton after state change
    const newEditButton = screen.queryByText("Edit");
    expect(newEditButton).not.toBeInTheDocument();

    // call deleteButton after state change
    const newDeleteButton = screen.queryByText("Delete");
    expect(newDeleteButton).not.toBeInTheDocument();
  });

  it("Change button should disabled if input change doesn't exist", () => {
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

  it("Checkbox should disabled if edit button was click", () => {
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

  it("Paragraph should change if input have value and change button was click", () => {
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
});
