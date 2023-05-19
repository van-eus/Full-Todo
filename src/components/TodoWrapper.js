import React, { useState } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import { EditTodoForm } from "./EditTodoForm";

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);
  const [showCompleted, setShowCompleted] = useState(true);
  const [showIncomplete, setShowIncomplete] = useState(true);

  const addTodo = (todo) => {
    setTodos([
      ...todos,
      { id: uuidv4(), task: todo, completed: false, isEditing: false },
    ]);
  };

  const deleteTodo = (id) => setTodos(todos.filter((todo) => todo.id !== id));

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const editTask = (task, id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const filteredTodos = todos.filter((todo) => {
    if (showCompleted && showIncomplete) {
      return true; // Show all todos
    }
    if (showCompleted && todo.completed) {
      return true; // Show completed todos
    }
    if (showIncomplete && !todo.completed) {
      return true; // Show incomplete todos
    }
    return false;
  });

  return (
    <div className="TodoWrapper">
      <h1>Get Things Done!</h1>
      <div>
        <label>
          <input
            type="checkbox"
            style={{ color: 'white' }}
            checked={showCompleted}
            onChange={() => setShowCompleted(!showCompleted)}
          />
          Show Completed Tasks
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            style={{ color: 'white' }}
            checked={showIncomplete}
            onChange={() => setShowIncomplete(!showIncomplete)}
          />
          Show Incomplete Tasks
        </label>
      </div>
      <TodoForm addTodo={addTodo} />
      {/* Display filtered todos */}
      {filteredTodos.map((todo) =>
        todo.isEditing ? (
          <EditTodoForm editTodo={editTask} task={todo} />
        ) : (
          <Todo
            key={todo.id}
            task={todo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            toggleComplete={toggleComplete}
          />
        )
      )}
    </div>
  );
};
