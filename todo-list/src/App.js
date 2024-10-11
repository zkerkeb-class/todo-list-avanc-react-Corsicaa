import React, { useState, useMemo } from 'react';
import useTasks from './useTasks';
import TodoItem from './components/TodoItem';

function App() {
  const [task, setTask] = useState('');
  const [filter, setFilter] = useState('all');
  const { tasks, addTask, deleteTask, toggleTaskCompletion } = useTasks();

  const handleAddTask = () => {
    if (task.trim()) {
      addTask(task);
      setTask('');
    }
  };

  const filteredTasks = useMemo(() => {
    if (filter === 'completed') {
      return tasks.filter((task) => task.completed);
    }
    if (filter === 'incomplete') {
      return tasks.filter((task) => !task.completed);
    }
    return tasks;
  }, [tasks, filter]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-400 via-teal-500 to-green-400">
      <div className="w-full max-w-xl p-8 bg-white shadow-2xl rounded-xl">
        <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-8 tracking-wide">
          TodoList
        </h1>

        <div className="flex mb-6">
          <input
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="flex-grow p-4 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="What's on your mind?"
          />
          <button
            onClick={handleAddTask}
            className="bg-gradient-to-r from-teal-500 to-green-500 text-white px-6 py-4 rounded-r-lg font-semibold hover:from-teal-600 hover:to-green-600 transition-all"
          >
            Add Task
          </button>
        </div>

        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full font-semibold focus:outline-none transition-all ${
              filter === 'all'
                ? 'bg-teal-500 text-white'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-4 py-2 rounded-full font-semibold focus:outline-none transition-all ${
              filter === 'completed'
                ? 'bg-teal-500 text-white'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
          >
            Completed
          </button>
          <button
            onClick={() => setFilter('incomplete')}
            className={`px-4 py-2 rounded-full font-semibold focus:outline-none transition-all ${
              filter === 'incomplete'
                ? 'bg-teal-500 text-white'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
          >
            Incomplete
          </button>
        </div>

        <ul className="divide-y divide-gray-200 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task, index) => (
              <TodoItem
                key={index}
                task={task}
                onToggleComplete={() => toggleTaskCompletion(index)}
                onDelete={() => deleteTask(index)}
              />
            ))
          ) : (
            <li className="text-center text-gray-500 py-4">
              No tasks available! Add one above.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
