// react components.
import TaskForm from "./TaskForm";
import ActionPanel from "./ActionPanel";
import TaskList from "./TaskList";

// custom hooks.
import { useTaskContext } from "../../contexts/TaskContext";

const TaskBoard = () => {
  const { showModal } = useTaskContext();

  return (
    <section className="mb-20" id="tasks">
      {showModal && <TaskForm />}

      <div className="container">
        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <ActionPanel />
          <TaskList />
        </div>
      </div>
    </section>
  );
};

export default TaskBoard;
