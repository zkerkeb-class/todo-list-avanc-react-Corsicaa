import React from 'react';

function TodoItem({ task, onToggleComplete, onDelete }) {
  return (
    <li className="flex justify-between items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg">
      <span
        className={`flex-grow text-lg font-medium ${
          task.completed ? 'line-through text-gray-400' : 'text-gray-800'
        }`}
      >
        {task.text}
      </span>
      <div className="flex space-x-2">
        <button
          onClick={onToggleComplete}
          className={`px-4 py-2 rounded-lg font-semibold ${
            task.completed
              ? 'bg-teal-500 text-white'
              : 'bg-teal-500 text-white '
          } transition-colors duration-300`}
        >
          {task.completed ? 'Undo' : 'Complete'}
        </button>
        <button
          onClick={onDelete}
          className="bg-red-200 text-red-700 px-4 py-2 rounded-lg font-semibold hover:bg-red-300 transition-colors duration-300"
        >
          Delete
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
