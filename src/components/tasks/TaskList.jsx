// react components.
import Task from "./Task";

// custom hooks.
import { useTaskContext } from "../../contexts/TaskContext";

const TaskList = () => {
  const { state, searchTerm } = useTaskContext();

  const searchTasks = (task) => {
    const taskTitle = task.title.toLocaleLowerCase();
    const keywords = searchTerm.trim().toLocaleLowerCase();

    return taskTitle.includes(keywords);
  };

  const tasks = state.tasks.filter(searchTasks);

  return (
    <div className="overflow-auto">
      {tasks.length === 0 && (
        <div className="text-2xl text-center">Task List is empty!</div>
      )}

      {tasks.length > 0 && (
        <table className="overflow-auto table-fixed xl:w-full">
          <thead>
            <tr>
              <th className="p-4 pb-8 text-sm font-semibold capitalize w-[48px]" />
              <th className="p-4 pb-8 text-sm font-semibold capitalize w-[300px]">
                Title
              </th>
              <th className="w-full p-4 pb-8 text-sm font-semibold capitalize">
                Description
              </th>
              <th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[350px]">
                Tags
              </th>
              <th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[100px]">
                Priority
              </th>
              <th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[100px]">
                Options
              </th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <Task task={task} key={task.id} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TaskList;
