const initialState = {
  tasks: [
    {
      id: 1,
      title: "Integration API",
      description:
        "Connect an existing API to a third-party database using secure methods and handle data exchange efficiently.",
      tags: ["Web", "Python", "API"],
      priority: "Medium",
      isFavorite: false,
    },
    {
      id: 2,
      title: "API Data Synchronization with Python",
      description:
        "Implement a Python solution to synchronize data between an API and a third-party database securely, optimizing data exchange.",
      tags: ["Web", "API", "Data Synchronization"],
      priority: "High",
      isFavorite: true,
    },
  ],
};

const taskReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TASK": {
      const newTask = action.payload;

      return { ...state, tasks: [...state.tasks, newTask] };
    }

    case "UPDATE_TASK": {
      const updatedTask = action.payload;
      const updatedTasks = state.tasks.map((task) => {
        if (task.id === updatedTask.id) {
          return updatedTask;
        } else return task;
      });

      return { ...state, tasks: updatedTasks };
    }

    case "TOGGLE_FAVORITE": {
      const taskId = action.payload;
      const updatedTasks = state.tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, isFavorite: !task.isFavorite };
        } else return task;
      });

      return { ...state, tasks: updatedTasks };
    }

    case "DELETE_TASK": {
      const taskId = action.payload;
      const updatedTasks = state.tasks.filter((task) => task.id !== taskId);
      return { ...state, tasks: updatedTasks };
    }

    case "DELETE_ALL_TASKS": {
      return { ...state, tasks: [] };
    }

    default:
      return state;
  }
};

export { initialState, taskReducer };
