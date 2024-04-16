// - Import necessary modules and components:
//   - React and useState from "react"
import React, { useState } from "react";
//   - CSS file "./App.css"
import "./App.css";
//   - InputField component from "./components/InputField"
import InputField from "./components/InputField";
//   - TodoList component from "./components/TodoList"
import TodoList from "./components/TodoList";
//   - DragDropContext and DropResult from "react-beautiful-dnd"
import { DragDropContext, DropResult } from "react-beautiful-dnd";
//   - Todo model from "./models/models"
import { Todo } from "./models";

// - Define the main component named App as a functional component:
const App: React.FC = () => {
	//   - Initialize state variables:
	//     - todo: string
	const [todo, setTodo] = useState<string>("");
	//     - todos: array of Todo objects
	//     - CompletedTodos: array of Todo objects
	const [todos, setTodos] = useState<Todo[]>([]);
	// - Define a function handleAdd to handle addition of todos:
	const [CompletedTodos, setCompletedTodos] = useState<Array<Todo>>([]);
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

	const onDragEnd = (result: DropResult) => {
		const { destination, source } = result;

		console.log(result);

		if (!destination) {
			return;
		}

		if (destination.droppableId === source.droppableId && destination.index === source.index) {
			return;
		}

		let add;
		let active = todos;
		let complete = CompletedTodos;
		// Source Logic
		if (source.droppableId === "TodosList") {
			add = active[source.index];
			active.splice(source.index, 1);
		} else {
			add = complete[source.index];
			complete.splice(source.index, 1);
		}

		// Destination Logic
		if (destination.droppableId === "TodosList") {
			active.splice(destination.index, 0, add);
		} else {
			complete.splice(destination.index, 0, add);
		}

		setCompletedTodos(complete);
		setTodos(active);
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div className="App">
				<span className="heading">Taskify</span>
				<InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
				<TodoList
					todos={todos}
					setTodos={setTodos}
					CompletedTodos={CompletedTodos}
					setCompletedTodos={setCompletedTodos}
				/>
			</div>
		</DragDropContext>
	);
};

export default App;
