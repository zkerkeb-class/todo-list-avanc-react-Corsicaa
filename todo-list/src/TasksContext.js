import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react';
import useFetch from './hooks/useFetch';

const TasksContext = createContext();

export const useTasksContext = () => useContext(TasksContext);

export function TasksProvider({ children }) {
  const { data: fetchedTasks, loading } = useFetch(
    'https://jsonplaceholder.typicode.com/todos?_limit=10'
  );
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (!loading && fetchedTasks.length > 0) {
      const formattedTasks = fetchedTasks.map((task) => ({
        text: task.title,
        completed: task.completed,
      }));
      setTasks(formattedTasks);
    }
  }, [fetchedTasks, loading]);

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

  return (
    <TasksContext.Provider
      value={{ tasks, addTask, deleteTask, toggleTaskCompletion }}
    >
      {children}
    </TasksContext.Provider>
  );
}
