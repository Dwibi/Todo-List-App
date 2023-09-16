import { fireEvent, render, screen } from "@testing-library/react";
import TodoForm from "./TodoForm";

describe("TodoForm Component", () => {
  it("Should render input for first render", () => {
    render(<TodoForm />); // Render the component for first time
    const todoInputEl = screen.getByPlaceholderText(/add a todo/i); // Get a element that have text equal to regExp /add a todo/i in this case a input
    expect(todoInputEl).toBeInTheDocument(); // Expect input is show in screen
  });

  it("Input should be empty on first render", () => {
    render(<TodoForm />); // Render the component for first time
    const todoInputEl = screen.getByPlaceholderText(/add a todo/i); // Get a element that have text equal to regExp /add a todo/i in this case a input
    expect(todoInputEl.value).toBe(""); // Expect input has no value
  });

  it("Input should be change if the input element was changing", () => {
    render(<TodoForm />); // Render the component for first time

    const todoInputEl = screen.getByPlaceholderText(/add a todo/i); // Get a element that have text equal to regExp /add a todo/i in this case a input
    const testValue = "test value"; // Make variable that will be passed to input value
    fireEvent.change(todoInputEl, { target: { value: testValue } }); // Change the input value to be the same as the testValue variable
    expect(todoInputEl.value).toBe(testValue); // Expect input has a value equal to testValue variable
  });

  it("Should render add button for first render", () => {
    render(<TodoForm />); // Render the component for first time

    const todoButtonAddEl = screen.getByRole("button"); // Get button element by role
    expect(todoButtonAddEl).toBeInTheDocument(); // Expect button is show in screen
  });

  it("Add button should be disabled when the input value does not exist", () => {
    render(<TodoForm />); // Render the component for first time

    const todoInputEl = screen.getByPlaceholderText(/add a todo/i); // Get a element that have text equal to regExp /add a todo/i in this case a input
    const testValue = ""; // Make variable that will be passed to input value
    fireEvent.change(todoInputEl, { target: { value: testValue } }); // Change the input value to be the same as the testValue variable

    const todoButtonAddEl = screen.getByRole("button"); // Get button element by role
    expect(todoButtonAddEl).toBeDisabled(); // Expect the button is disabled
  });

  it("Add button should not be disabled when the input value do exist", () => {
    render(<TodoForm />); // Render the component for first time

    const todoButtonAddEl = screen.getByRole("button"); // Get button element by role
    const todoInputEl = screen.getByPlaceholderText(/add a todo/i); // Get a element that have text equal to regExp /add a todo/i in this case a input

    const testValue = "test value"; // Make variable that will be passed to input value
    fireEvent.change(todoInputEl, { target: { value: testValue } }); // Change the input value to be the same as the testValue variable
    expect(todoButtonAddEl).not.toBeDisabled(); // Expect the button is not disabled
  });

  it("Add button should be call addTodo function if Add button was click and input value was exist", () => {
    const mockAddTodo = jest.fn(); // Make Mock addTodo function and pass into prop
    render(<TodoForm addTodo={mockAddTodo} />); // Render the component for first time and pass the mock function as a prop

    const testValue = "Test Todo"; // Make variable that will be passed to input value
    const input = screen.getByPlaceholderText("Add a todo"); // Get a element that have text equal to regExp "Add a todo" in this case a input
    fireEvent.change(input, { target: { value: testValue } }); // Change the input value to be the same as the testValue variable

    const addButton = screen.getByRole("button"); // Get button element by role
    fireEvent.click(addButton); // click the button element to execute a function

    expect(mockAddTodo).toHaveBeenCalledTimes(1); // Expect mockAddTodo to be called once
    expect(mockAddTodo).toHaveBeenCalledWith(testValue); // Expect mockAddTodo to call with arguments same as testValue variable
  });

  it("Input value should be empty after click add button", () => {
    const mockAddTodo = jest.fn(); // Make Mock addTodo function and pass into prop
    render(<TodoForm addTodo={mockAddTodo} />); // Render the component for first time and pass the mock function as a prop
    const todoInputEl = screen.getByPlaceholderText(/add a todo/i);
    const testValue = "test value"; // Make variable that will be passed to input value
    fireEvent.change(todoInputEl, { target: { value: testValue } }); // Change the input value to be the same as the testValue variable

    const addButton = screen.getByRole("button"); // Get button element by role
    fireEvent.click(addButton); // click the button element to execute a function

    expect(todoInputEl.value).toBe(""); //Expect input has no value
  });
});
