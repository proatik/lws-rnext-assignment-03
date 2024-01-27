import { useState } from "react";

// custom hooks.
import { useTaskContext } from "../../contexts/TaskContext";

// utility functions.
import { formatTags, validate, notify } from "../../utils/utilities";

// initial form values.
const initialFormValues = {
  title: "",
  description: "",
  tags: "",
  priority: "",
};

const TaskForm = () => {
  const {
    addTask,
    updateTask,
    taskToUpdate,
    getNextTaskId,
    closeFormModal,
    setTaskToUpdate,
  } = useTaskContext();

  const [values, setValues] = useState(taskToUpdate || initialFormValues);

  const isAdd = Object.is(taskToUpdate, null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    try {
      const errors = validate(values);

      for (const message of Object.values(errors)) {
        notify({ message, type: "warn" });
        return;
      }

      const formattedTags = formatTags(values.tags);

      if (isAdd) {
        const newTask = {
          ...values,
          id: getNextTaskId(),
          tags: formattedTags,
          isFavorite: false,
        };

        addTask(newTask);
        notify({ message: "Task added successfully.", type: "success" });
      } else {
        const updatedTask = {
          ...values,
          tags: formattedTags,
        };

        updateTask(updatedTask);
        notify({ message: "Task updated successfully.", type: "success" });
      }

      closeFormModal();
      setTaskToUpdate(null);
    } catch (error) {
      if (isAdd) notify({ message: "Failed to add task.", type: "error" });
      else notify({ message: "Failed to update task.", type: "error" });
    }
  };

  const handleCancel = () => {
    closeFormModal();
    setTaskToUpdate(null);
  };

  return (
    <div className="absolute top-0 left-0 z-20 w-full h-auto py-20 bg-black bg-opacity-70">
      <form
        onSubmit={handleSubmit}
        className="mx-auto my-10 w-full max-w-[740px] rounded-xl border border-[#FEFBFB]/[36%] bg-[#191D26] p-9 max-md:px-4 lg:my-20 lg:p-11"
      >
        <h2 className="mb-9 text-center text-2xl font-bold text-white lg:mb-11 lg:text-[28px]">
          {isAdd ? "Add New Task" : "Edit Task"}
        </h2>
        <div className="text-white space-y-9 lg:space-y-10">
          {/* title */}
          <div className="space-y-2 lg:space-y-3">
            <label htmlFor="title">Title</label>
            <input
              required
              id="title"
              type="text"
              name="title"
              value={values.title}
              onChange={handleChange}
              className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
            />
          </div>
          {/* description */}
          <div className="space-y-2 lg:space-y-3">
            <label htmlFor="description">Description</label>
            <textarea
              required
              type="text"
              id="description"
              name="description"
              onChange={handleChange}
              value={values.description}
              className="block min-h-[120px] w-full rounded-md bg-[#2D323F] px-3 py-2.5 lg:min-h-[180px]"
            />
          </div>

          <div className="grid-cols-2 gap-x-4 max-md:space-y-9 md:grid lg:gap-x-10 xl:gap-x-20">
            {/* tags */}
            <div className="space-y-2 lg:space-y-3">
              <label htmlFor="tags">Tags</label>
              <input
                required
                id="tags"
                type="text"
                name="tags"
                value={values.tags}
                onChange={handleChange}
                className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
              />
            </div>
            {/* priority */}
            <div className="space-y-2 lg:space-y-3">
              <label htmlFor="priority">Priority</label>
              <select
                required
                id="priority"
                name="priority"
                value={values.priority}
                onChange={handleChange}
                className="block w-full cursor-pointer rounded-md bg-[#2D323F] px-3 py-2.5"
              >
                <option value="">Select Priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-between gap-5 mt-16 lg:mt-20">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 text-white transition-all bg-red-600 rounded hover:opacity-80"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-white transition-all bg-blue-600 rounded hover:opacity-80"
          >
            {isAdd ? "Create new Task" : "Update Task"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
