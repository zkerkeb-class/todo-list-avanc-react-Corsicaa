import { useState, useCallback, useEffect } from 'react';

function useTasks() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = useCallback((taskText) => {
    setTasks((prevTasks) => [
      ...prevTasks,
      { text: taskText, completed: false },
    ]);
  }, []);

  const deleteTask = useCallback((index) => {
    setTasks((prevTasks) => prevTasks.filter((_, idx) => idx !== index));
  }, []);

  const toggleTaskCompletion = useCallback((index) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, idx) =>
        idx === index ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  return { tasks, addTask, deleteTask, toggleTaskCompletion };
}

export default useTasks;
