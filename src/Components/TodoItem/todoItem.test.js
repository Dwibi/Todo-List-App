import { fireEvent, render, screen } from "@testing-library/react";
import TodoItem from "./TodoItem";
import React from "react";

describe("TodoItem Component", () => {
  it("Should render checkbox for first render", () => {
    const mockDeleteTodo = jest.fn(); // Make Mock deleteTodo function and pass into prop
    const mockCompletedTodo = jest.fn(); // Make Mock completedTodo function and pass into prop
    const mockChangeTodoList = jest.fn(); // Make Mock changeTodoList function and pass into prop
    const todoTitleTest = "test todo"; // value that will be pass into prop

    render(
      <TodoItem
        index={0}
        todo={todoTitleTest}
        isCompleted={false}
        deleteTodo={mockDeleteTodo}
        completedTodo={mockCompletedTodo}
        changeTodoList={mockChangeTodoList}
      />
    ); // Render the component for first time and pass the mock function as a prop

    const checkboxElement = screen.getByPlaceholderText("checkbox"); // Get a element that have placehodler text "checkbox" in this case a checkbox input element
    expect(checkboxElement).toBeInTheDocument(); // Expect button is show in screen
  });

  it("Should render paragraph for first render", () => {
    const mockDeleteTodo = jest.fn(); // Make Mock deleteTodo function and pass into prop
    const mockCompletedTodo = jest.fn(); // Make Mock completedTodo function and pass into prop
    const mockChangeTodoList = jest.fn(); // Make Mock changeTodoList function and pass into prop
    const todoTitleTest = "test todo"; // value that will be pass into prop

    render(
      <TodoItem
        index={0}
        todo={todoTitleTest}
        isCompleted={false}
        deleteTodo={mockDeleteTodo}
        completedTodo={mockCompletedTodo}
        changeTodoList={mockChangeTodoList}
      />
    ); // Render the component for first time and pass the mock function as a prop

    const paragraphElement = screen.getByText(/test todo/i); // Get a element that have text equal to regExp /add a todo/i in this case a paragraph element
    expect(paragraphElement).toBeTruthy(); //Expect paragraph is show in screen
  });

  it("Should render delete button for first render", () => {
    const mockDeleteTodo = jest.fn(); // Make Mock deleteTodo function and pass into prop
    const mockCompletedTodo = jest.fn(); // Make Mock completedTodo function and pass into prop
    const mockChangeTodoList = jest.fn(); // Make Mock changeTodoList function and pass into prop
    const todoTitleTest = "test todo"; // value that will be pass into prop

    render(
      <TodoItem
        index={0}
        todo={todoTitleTest}
        isCompleted={false}
        deleteTodo={mockDeleteTodo}
        completedTodo={mockCompletedTodo}
        changeTodoList={mockChangeTodoList}
      />
    ); // Render the component for first time and pass the mock function as a prop

    const deleteButton = screen.getByText("Delete"); // Get a element that have text "Delete" in this case a button element // Get a element that have text "Delete" in this case a button element
    expect(deleteButton).toBeInTheDocument(); // Expect button delete is show in screen
  });

  it("Should render edit button for first render", () => {
    const mockDeleteTodo = jest.fn(); // Make Mock deleteTodo function and pass into prop
    const mockCompletedTodo = jest.fn(); // Make Mock completedTodo function and pass into prop
    const mockChangeTodoList = jest.fn(); // Make Mock changeTodoList function and pass into prop
    const todoTitleTest = "test todo"; // value that will be pass into prop

    render(
      <TodoItem
        index={0}
        todo={todoTitleTest}
        isCompleted={false}
        deleteTodo={mockDeleteTodo}
        completedTodo={mockCompletedTodo}
        changeTodoList={mockChangeTodoList}
      />
    ); // Render the component for first time and pass the mock function as a prop

    const deleteButton = screen.getByText("Edit"); // Get a element that have text "Edit" in this case a button element
    expect(deleteButton).toBeInTheDocument(); // Expect button edit is show in screen
  });

  it("Should not render input for first render", () => {
    const mockDeleteTodo = jest.fn(); // Make Mock deleteTodo function and pass into prop
    const mockCompletedTodo = jest.fn(); // Make Mock completedTodo function and pass into prop
    const mockChangeTodoList = jest.fn(); // Make Mock changeTodoList function and pass into prop
    const todoTitleTest = "test todo"; // value that will be pass into prop

    render(
      <TodoItem
        index={0}
        todo={todoTitleTest}
        isCompleted={false}
        deleteTodo={mockDeleteTodo}
        completedTodo={mockCompletedTodo}
        changeTodoList={mockChangeTodoList}
      />
    ); // Render the component for first time and pass the mock function as a prop

    const inputChangeElement = screen.queryByPlaceholderText(
      "Please enter your todo"
    ); // Get a element that have placeholder text "Please enter your todo" in this case a input text element
    expect(inputChangeElement).toBeNull(); // Expect inputChangeElement is not show in screen
  });

  it("Should not render change button for first render", () => {
    const mockDeleteTodo = jest.fn(); // Make Mock deleteTodo function and pass into prop
    const mockCompletedTodo = jest.fn(); // Make Mock completedTodo function and pass into prop
    const mockChangeTodoList = jest.fn(); // Make Mock changeTodoList function and pass into prop
    const todoTitleTest = "test todo"; // value that will be pass into prop

    render(
      <TodoItem
        index={0}
        todo={todoTitleTest}
        isCompleted={false}
        deleteTodo={mockDeleteTodo}
        completedTodo={mockCompletedTodo}
        changeTodoList={mockChangeTodoList}
      />
    ); // Render the component for first time and pass the mock function as a prop

    const changeButton = screen.queryByText("Change"); // Get element that have text "Change" in this case a button element
    expect(changeButton).toBeNull(); // Expect changeButton is not show in screen
  });

  it("Delete button should call deleteTodo function if delete button was click", () => {
    const mockDeleteTodo = jest.fn(); // Make Mock deleteTodo function and pass into prop
    const mockCompletedTodo = jest.fn(); // Make Mock completedTodo function and pass into prop
    const mockChangeTodoList = jest.fn(); // Make Mock changeTodoList function and pass into prop
    const todoTitleTest = "test todo"; // value that will be pass into prop

    render(
      <TodoItem
        index={0}
        todo={todoTitleTest}
        isCompleted={false}
        deleteTodo={mockDeleteTodo}
        completedTodo={mockCompletedTodo}
        changeTodoList={mockChangeTodoList}
      />
    ); // Render the component for first time and pass the mock function as a prop

    const deleteButton = screen.getByText("Delete"); // Get a element that have text "Delete" in this case a button element
    fireEvent.click(deleteButton); // Click the Delete Button Element to run mockDeleteTodo function
    expect(mockDeleteTodo).toHaveBeenCalledTimes(1); // Expect mockDeleteTodo function is called once
    expect(mockDeleteTodo).toHaveBeenCalledWith(0); // Expect mockDeleteTodo to call with arguments 0 (index from prop)
  });

  it("Checkbox should be change and call completedTodo function if checkbox was click", () => {
    const mockDeleteTodo = jest.fn(); // Make Mock deleteTodo function and pass into prop
    const mockCompletedTodo = jest.fn(); // Make Mock completedTodo function and pass into prop
    const mockChangeTodoList = jest.fn(); // Make Mock changeTodoList function and pass into prop
    const todoTitleTest = "test todo"; // value that will be pass into prop

    render(
      <TodoItem
        index={0}
        todo={todoTitleTest}
        isCompleted={false}
        deleteTodo={mockDeleteTodo}
        completedTodo={mockCompletedTodo}
        changeTodoList={mockChangeTodoList}
      />
    ); // Render the component for first time and pass the mock function as a prop

    const checkboxElement = screen.getByPlaceholderText("checkbox"); // Get a element that have placehodler text "checkbox" in this case a checkbox input element
    fireEvent.click(checkboxElement); // Click the checkbox input element to run mockCompletedTodo function
    expect(mockCompletedTodo).toHaveBeenCalledTimes(1); // Expect mockCompletedTodo function is called once
    expect(mockCompletedTodo).toHaveBeenCalledWith(0); // Expect mockCompletedTodo to call with arguments 0 (index from prop)
  });

  it("Paragraph should be turn into input and value must same with paragraph if edit button was click", () => {
    const mockDeleteTodo = jest.fn(); // Make Mock deleteTodo function and pass into prop
    const mockCompletedTodo = jest.fn(); // Make Mock completedTodo function and pass into prop
    const mockChangeTodoList = jest.fn(); // Make Mock changeTodoList function and pass into prop
    const todoTitleTest = "test todo"; // value that will be pass into prop

    render(
      <TodoItem
        index={0}
        todo={todoTitleTest}
        isCompleted={false}
        deleteTodo={mockDeleteTodo}
        completedTodo={mockCompletedTodo}
        changeTodoList={mockChangeTodoList}
      />
    ); // Render the component for first time and pass the mock function as a prop

    const editButton = screen.getByText("Edit"); // Get a element that have text "Edit" in this case a button element
    fireEvent.click(editButton); // Click the Delete Edit Element to run setIsEdit function (change a state)

    const inputChangeElement = screen.getByPlaceholderText(
      "Please enter your todo"
    ); // Get a element that have placeholder text "Please enter your todo" in this case a input text

    expect(inputChangeElement).toBeInTheDocument(); // Expect input text element is show in screen
    expect(inputChangeElement.value).toBe(todoTitleTest); // Expect input text value is same as todoTitleTest
  });

  it("Edit button and delete button should be turn into change button if edit button was click", () => {
    const mockDeleteTodo = jest.fn(); // Make Mock deleteTodo function and pass into prop
    const mockCompletedTodo = jest.fn(); // Make Mock completedTodo function and pass into prop
    const mockChangeTodoList = jest.fn(); // Make Mock changeTodoList function and pass into prop
    const todoTitleTest = "test todo"; // value that will be pass into prop

    render(
      <TodoItem
        index={0}
        todo={todoTitleTest}
        isCompleted={false}
        deleteTodo={mockDeleteTodo}
        completedTodo={mockCompletedTodo}
        changeTodoList={mockChangeTodoList}
      />
    ); // Render the component for first time and pass the mock function as a prop

    const editButton = screen.getByText("Edit"); // Get a element that have text "Edit" in this case a button element
    fireEvent.click(editButton); // Click the Delete Edit Element to run setIsEdit function (change a state)

    const changeButton = screen.queryByText("Change"); // Get element that have text "Change" in this case a button element
    expect(changeButton).toBeInTheDocument(); // Expect input change button is show in screen

    const newEditButton = screen.queryByText("Edit"); // Get a element after state change that have text "Edit" in this case a button element
    expect(newEditButton).not.toBeInTheDocument(); // Expect input edit button is not show in screen

    const newDeleteButton = screen.queryByText("Delete"); // Get a element after state change that have text "Edit" in this case a button element
    expect(newDeleteButton).not.toBeInTheDocument(); // Expect input delete button is not show in screen
  });

  it("Change button should disabled if input change doesn't exist", () => {
    const mockDeleteTodo = jest.fn(); // Make Mock deleteTodo function and pass into prop
    const mockCompletedTodo = jest.fn(); // Make Mock completedTodo function and pass into prop
    const mockChangeTodoList = jest.fn(); // Make Mock changeTodoList function and pass into prop
    const todoTitleTest = "test todo"; // value that will be pass into prop

    render(
      <TodoItem
        index={0}
        todo={todoTitleTest}
        isCompleted={false}
        deleteTodo={mockDeleteTodo}
        completedTodo={mockCompletedTodo}
        changeTodoList={mockChangeTodoList}
      />
    ); // Render the component for first time and pass the mock function as a prop

    const editButton = screen.getByText("Edit"); // Get a element that have text "Edit" in this case a button element
    fireEvent.click(editButton); // Click the Delete Edit Element to run setIsEdit function (change a state)

    const inputChangeElement = screen.getByPlaceholderText(
      "Please enter your todo"
    ); // Get a element that have placeholder text "Please enter your todo" in this case a input text
    const testValue = ""; // value that will be passed to input value
    fireEvent.change(inputChangeElement, { target: { value: testValue } }); // Change the input value to be the same as testValue
    expect(inputChangeElement.value).toBe(testValue); // Expect input value to be the same as testValue

    const changeButton = screen.queryByText("Change"); // Get element that have text "Change" in this case a button element
    expect(changeButton).toBeDisabled(); // Expect the Change button to be Disabled
  });

  it("Checkbox should disabled if edit button was click", () => {
    const mockDeleteTodo = jest.fn(); // Make Mock deleteTodo function and pass into prop
    const mockCompletedTodo = jest.fn(); // Make Mock completedTodo function and pass into prop
    const mockChangeTodoList = jest.fn(); // Make Mock changeTodoList function and pass into prop
    const todoTitleTest = "test todo"; // value that will be pass into prop

    render(
      <TodoItem
        index={0}
        todo={todoTitleTest}
        isCompleted={false}
        deleteTodo={mockDeleteTodo}
        completedTodo={mockCompletedTodo}
        changeTodoList={mockChangeTodoList}
      />
    ); // Render the component for first time and pass the mock function as a prop

    const editButton = screen.getByText("Edit"); // Get a element that have text "Edit" in this case a button element
    fireEvent.click(editButton); // Click the Edit Button Element to run setIsEdit function (change a state)

    const checkboxElement = screen.getByPlaceholderText("checkbox"); // Get a element that have placehodler text "checkbox" in this case a checkbox input element
    expect(checkboxElement).toBeDisabled(); // Expect the checkbox input to be Disabled
  });

  it("Change button should call changeTodoList function and hide input text and change button if input have value and change button was click", () => {
    const mockDeleteTodo = jest.fn(); // Make Mock deleteTodo function and pass into prop
    const mockCompletedTodo = jest.fn(); // Make Mock completedTodo function and pass into prop
    const mockChangeTodoList = jest.fn(); // Make Mock changeTodoList function and pass into prop
    const todoTitleTest = "test todo"; // value that will be pass into prop

    render(
      <TodoItem
        index={0}
        todo={todoTitleTest}
        isCompleted={false}
        deleteTodo={mockDeleteTodo}
        completedTodo={mockCompletedTodo}
        changeTodoList={mockChangeTodoList}
      />
    ); // Render the component for first time and pass the mock function as a prop

    const editButton = screen.getByText("Edit"); // Get a element that have text "Edit" in this case a button element
    fireEvent.click(editButton); // Click the Delete Edit Element to run setIsEdit function (change a state)

    const inputChangeElement = screen.queryByPlaceholderText(
      "Please enter your todo"
    ); // Get a element that have placeholder text "Please enter your todo" in this case a input text
    const testValue = "test todo test"; // value that will be passed to input value
    fireEvent.change(inputChangeElement, { target: { value: testValue } }); // Change the input value to be the same as testValue

    const changeButton = screen.queryByText("Change"); // Get element that have text "Change" in this case a button element
    expect(changeButton).toBeInTheDocument(); // Expect the Change button is show in screen
    fireEvent.click(changeButton); // Click the change button Element to run mockChangeTodoList function
    expect(mockChangeTodoList).toHaveBeenCalledTimes(1); // Expect mockChangeTodoList funtion to be called once
    expect(mockChangeTodoList).toHaveBeenCalledWith(0, testValue); // Expect mockChangeTodoList funtion to be called with argument 0 (index from prop) and value from input text

    const newEditButton = screen.getByText("Edit"); // Get a element after state change that have text "Edit" in this case a button element
    expect(newEditButton).toBeInTheDocument(); // Expect Edit button is show in screen

    const newinputChangeElement = screen.queryByPlaceholderText(
      "Please enter your todo"
    ); // Get a element after state change that have placeholder text "Please enter your todo" in this case a input text
    expect(newinputChangeElement).toBeNull(); // Expect input text is now show in screen

    // get change button again
    const newChangeButton = screen.queryByText("Change"); // Get element that have text "Change" in this case a button element
    expect(newChangeButton).toBeNull(); // Expect Change button is now show in screen
  });
});
