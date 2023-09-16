import { fireEvent, render, screen } from "@testing-library/react";
import TodoForm from "./TodoForm";

describe("TodoForm Component", () => {
  it("Should render input for first render", () => {
    render(<TodoForm />);
    const todoInputEl = screen.getByPlaceholderText(/add a todo/i);
    expect(todoInputEl).toBeInTheDocument();
  });

  it("Input should be empty on first render", () => {
    render(<TodoForm />);
    const todoInputEl = screen.getByPlaceholderText(/add a todo/i);
    expect(todoInputEl.value).toBe("");
  });

  it("Input should be change if the input element is changing", () => {
    render(<TodoForm />);
    const todoInputEl = screen.getByPlaceholderText(/add a todo/i);
    const testValue = "test value";
    fireEvent.change(todoInputEl, { target: { value: testValue } });
    expect(todoInputEl.value).toBe(testValue);
  });

  it("Should render add button for first render", () => {
    render(<TodoForm />);
    const todoButtonAddEl = screen.getByRole("button");
    expect(todoButtonAddEl).toBeInTheDocument();
  });

  it("Add button should be disabled when the input value does not exist", () => {
    render(<TodoForm />);
    const todoButtonAddEl = screen.getByRole("button");
    const todoInputEl = screen.getByPlaceholderText(/add a todo/i);
    const testValue = "";
    fireEvent.change(todoInputEl, { target: { value: testValue } });
    expect(todoButtonAddEl).toBeDisabled();
  });

  it("Add button should not be disabled when the input value do exist", () => {
    render(<TodoForm />);
    const todoButtonAddEl = screen.getByRole("button");
    const todoInputEl = screen.getByPlaceholderText(/add a todo/i);
    const testValue = "test value";
    fireEvent.change(todoInputEl, { target: { value: testValue } });
    expect(todoButtonAddEl).not.toBeDisabled();
  });

  it("Add button should be call addTodo function if Add button was click and input value was exist", () => {
    const mockAddTodo = jest.fn();

    render(<TodoForm addTodo={mockAddTodo} />);

    const input = screen.getByPlaceholderText("Add a todo");
    fireEvent.change(input, { target: { value: "Test Todo" } });

    const addButton = screen.getByRole("button");
    fireEvent.click(addButton);

    expect(mockAddTodo).toHaveBeenCalledTimes(1);
    expect(mockAddTodo).toHaveBeenCalledWith("Test Todo");
  });

  it("Input value should be empty after click add button", () => {
    const mockAddTodo = jest.fn();

    render(<TodoForm addTodo={mockAddTodo} />);
    const todoInputEl = screen.getByPlaceholderText(/add a todo/i);
    const testValue = "test value";
    fireEvent.change(todoInputEl, { target: { value: testValue } });

    const addButton = screen.getByRole("button");
    fireEvent.click(addButton);

    expect(todoInputEl.value).toBe("");
  });
});
