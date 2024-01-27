import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// react components.
import Header from "./components/Header";
import Hero from "./components/Hero";
import TaskBoard from "./components/tasks/TaskBoard";
import Footer from "./components/Footer";

// task context provider.
import { TaskContextProvider } from "./contexts/TaskContext";

function App() {
  return (
    <TaskContextProvider>
      <Header />
      <Hero />
      <TaskBoard />
      <Footer />
      <ToastContainer />
    </TaskContextProvider>
  );
}

export default App;
