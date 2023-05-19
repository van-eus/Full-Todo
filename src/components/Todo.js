import React from 'react'
import '../App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
export const Todo = ({task, deleteTodo, editTodo, toggleComplete}) => {
 
  return (
    <div className="Todo">
    <label className={`${task.completed ? 'completed' : ""}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleComplete(task.id)}
      />
      {task.task}
    </label>
    <div>
      <FontAwesomeIcon icon={faPenToSquare} onClick={() => editTodo(task.id)} />
      <FontAwesomeIcon icon={faTrash} onClick={() => deleteTodo(task.id)} />
    </div>
  </div>
  )
  
}