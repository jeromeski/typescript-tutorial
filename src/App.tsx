// - Import necessary modules and components:
//   - React and useState from "react"
import React, { useState } from "react";
//   - CSS file "./App.css"
import "./App.css";
//   - InputField component from "./components/InputField"
//   - TodoList component from "./components/TodoList"
//   - DragDropContext and DropResult from "react-beautiful-dnd"
//   - Todo model from "./models/models"
import { Todo } from "./models";
import InputField from "./components/InputField";

// - Define the main component named App as a functional component:
const App: React.FC = () => {
	//   - Initialize state variables:
	//     - todo: string
	const [todo, setTodo] = useState<string>("");
	//     - todos: array of Todo objects
	//     - CompletedTodos: array of Todo objects
	const [todos, setTodos] = useState<Todo[]>([]);
	// - Define a function handleAdd to handle addition of todos:
	const handleAdd = (e: React.FormEvent) => {
		//   - Prevent default form submission behavior
		e.preventDefault();
		//   - Check if todo is not empty
		if (todo) {
			//     - If not empty, add a new todo to the todos array with current timestamp as id, todo text, and isDone set to false
			setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
			//     - Reset the todo input field to empty
			setTodo("");
		}
	};

	return (
		<div className="App">
			<InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
			<code>{JSON.stringify(todos)}</code>
		</div>
	);
};

export default App;
