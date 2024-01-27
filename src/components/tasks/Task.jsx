// icons/images.
import StarFill from "../icons/StarFill";
import StarStroke from "../icons/StartStroke";

// custom hooks.
import { useTaskContext } from "../../contexts/TaskContext";

// utility functions.
import { notify } from "../../utils/utilities";

const Task = ({ task }) => {
  const {
    deleteTask,
    getTagColor,
    openFormModal,
    toggleFavorite,
    setTaskToUpdate,
  } = useTaskContext();

  const handleToggleFavorite = () => {
    toggleFavorite(task.id);
  };

  const handleEditTask = () => {
    setTaskToUpdate(task);
    openFormModal();
  };

  const handleDeleteTask = () => {
    const result = confirm("Do you really want to delete this task?");

    try {
      if (result) {
        deleteTask(task.id);
        notify({ message: "Task deleted successfully.", type: "success" });
      }
    } catch (error) {
      notify({ message: "Failed to delete task.", type: "error" });
    }
  };

  return (
    <tr className="border-b border-[#2E3443] [&>td]:align-baseline [&>td]:px-4 [&>td]:py-2">
      <td>
        <span className="cursor-pointer" onClick={handleToggleFavorite}>
          {task.isFavorite ? <StarFill /> : <StarStroke />}
        </span>
      </td>
      <td>{task.title}</td>
      <td>
        <div>{task.description}</div>
      </td>
      <td>
        <ul className="flex justify-center gap-1.5 flex-wrap">
          {task.tags.map((tag, index) => (
            <li key={index}>
              <span
                style={{ backgroundColor: getTagColor(tag) }}
                className="inline-block h-5 whitespace-nowrap rounded-[45px] px-2.5 text-sm capitalize text-[#F4F5F6]"
              >
                {tag}
              </span>
            </li>
          ))}
        </ul>
      </td>
      <td className="text-center">{task.priority}</td>
      <td>
        <div className="flex items-center justify-center space-x-3">
          <button onClick={handleDeleteTask} className="text-red-500">
            Delete
          </button>
          <button onClick={handleEditTask} className="text-blue-500">
            Edit
          </button>
        </div>
      </td>
    </tr>
  );
};

export default Task;
