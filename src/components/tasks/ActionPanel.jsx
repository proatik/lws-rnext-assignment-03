// custom hooks.
import { useTaskContext } from "../../contexts/TaskContext";

// utility functions.
import { notify } from "../../utils/utilities";

const ActionPanel = () => {
  const { state, searchTerm, setSearchTerm, openFormModal, deleteAllTasks } =
    useTaskContext();

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleDeleteAllTasks = () => {
    const result = confirm("Do you really want to delete all tasks?");

    try {
      if (result) {
        deleteAllTasks();
        notify({ message: "All tasks deleted successfully.", type: "success" });
      }
    } catch (error) {
      notify({ message: "Failed to delete all tasks.", type: "error" });
    }
  };

  return (
    <div className="items-center justify-between mb-14 sm:flex">
      <h2 className="text-2xl font-semibold max-sm:mb-4">Your Tasks</h2>
      <div className="flex items-center space-x-5">
        <form onSubmit={handleSubmit}>
          <div className="flex">
            <div className="relative overflow-hidden rounded-lg text-gray-50 md:min-w-[380px] lg:min-w-[440px]">
              <input
                required
                type="search"
                value={searchTerm}
                id="search-dropdown"
                onChange={handleSearch}
                placeholder="Search Task"
                className="block w-full px-4 py-2 pr-10 bg-gray-800 focus:outline-none"
              />
              <button
                type="submit"
                className="absolute top-0 h-full text-white right-2 rounded-e-lg md:right-4"
              >
                <svg
                  fill="none"
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  className="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeWidth={2}
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span className="sr-only">Search</span>
              </button>
            </div>
          </div>
        </form>
        <button
          onClick={openFormModal}
          className="rounded-md bg-blue-500 px-3.5 py-2.5 text-sm font-semibold hover:opacity-80"
        >
          Add Task
        </button>
        <button
          onClick={handleDeleteAllTasks}
          disabled={state.tasks.length === 0}
          className="rounded-md bg-red-500 px-3.5 py-2.5 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-70 hover:opacity-80"
        >
          Delete All
        </button>
      </div>
    </div>
  );
};

export default ActionPanel;
