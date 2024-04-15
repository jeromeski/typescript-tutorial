// Import React library and useRef hook
import { useRef } from "react";
// Import CSS file
// import styles from "./styles.css";
// Define interface for props
interface props {
	todo: string;
	setTodo: React.Dispatch<React.SetStateAction<string>>;
	handleAdd: (e: React.FormEvent) => void;
}

// Define a function component named InputField that accepts props
const InputField: React.FC<props> = ({ todo, setTodo, handleAdd }) => {
	// Create a reference to a DOM input element
	const inputRef = useRef<HTMLInputElement>(null);
	// Return a form element
	return (
		<form
			// Add a class name to the form element
			className="input"
			// Add an event listener for form submission
			onSubmit={
				// Call the handleAdd function passed in props when the form is submitted
				(e) => {
					handleAdd(e);
					// Check if the inputRef has been initialized before accessing its properties
					//Remove focus from the input element
					inputRef.current?.blur();
				}
			}>
			<input
				// Set the input type to text
				type="text"
				// Set a placeholder text for the input
				placeholder="Enter a task"
				// Set the value of the input to the value of the todo state passed in props
				value={todo}
				// Assign the inputRef to the input element
				ref={inputRef}
				// Add an event listener for input changes
				onChange={(e) => setTodo(e.target.value)}
				// Add a class name to the input element
				className="input__box"
			/>
			<button
				// Set the button type to submit
				type="submit"
				// Add a class name to the button element
				className="input__submit">
				GO
			</button>
		</form>
	);
};

// Export the InputField component as default
export default InputField;
