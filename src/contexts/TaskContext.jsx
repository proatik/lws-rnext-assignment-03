import { useState, useReducer, createContext, useContext } from "react";

// task reducer and initial state.
import { taskReducer, initialState } from "../reducers/taskReducer";

// utility functions.
import { getRandomColor } from "../utils//utilities.js";

const TaskContext = createContext(null);

const useTaskContext = () => {
  return useContext(TaskContext);
};

const tagsColor = {};

const TaskContextProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);
  const [state, dispatch] = useReducer(taskReducer, initialState);

  const openFormModal = () => setShowModal(true);
  const closeFormModal = () => setShowModal(false);

  const getTagColor = (tag) => {
    const key = tag.toLowerCase();

    if (!(key in tagsColor)) {
      tagsColor[key] = getRandomColor();
    }
    return tagsColor[key];
  };

  const getNextTaskId = () => {
    const maxId = Math.max(...state.tasks.map((task) => task.id), 0);
    return maxId + 1;
  };

  const addTask = (newTask) => {
    dispatch({
      type: "ADD_TASK",
      payload: newTask,
    });
  };

  const updateTask = (task) => {
    dispatch({
      type: "UPDATE_TASK",
      payload: task,
    });
  };

  const deleteTask = (taskId) => {
    dispatch({
      type: "DELETE_TASK",
      payload: taskId,
    });
  };

  const toggleFavorite = (taskId) => {
    dispatch({
      type: "TOGGLE_FAVORITE",
      payload: taskId,
    });
  };

  const deleteAllTasks = () => {
    dispatch({ type: "DELETE_ALL_TASKS" });
  };

  const value = {
    state,
    showModal,
    searchTerm,
    taskToUpdate,

    addTask,
    updateTask,
    deleteTask,
    getTagColor,
    setSearchTerm,
    getNextTaskId,
    openFormModal,
    closeFormModal,
    deleteAllTasks,
    toggleFavorite,
    setTaskToUpdate,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export { TaskContext, TaskContextProvider, useTaskContext };
