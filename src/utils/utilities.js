import { toast, Bounce } from "react-toastify";

const formatTags = (tags) => {
  return tags
    .toString()
    .split(",")
    .map((tag) => tag.trim())
    .filter((tag) => tag !== "");
};

const validate = (values) => {
  let errors = {};

  if (!values.title.trim()) {
    errors.title = "Title is required. It can't be empty.";
  }

  if (!values.description.trim()) {
    errors.description = "Description is required. It can't be empty.";
  }

  if (!values.tags.toString().trim()) {
    errors.tags = "Tags is required. It can't be empty.";
  }

  if (!values.priority.trim()) {
    errors.priority = "Priority is required. It can't be empty.";
  }

  return errors;
};

const notify = ({ message, type }) => {
  toast[type](message, {
    theme: "dark",
    autoClose: 2500,
    pauseOnHover: true,
    closeOnClick: true,
    transition: Bounce,
    hideProgressBar: false,
    position: "top-right",
  });
};

const getRandomColor = () => {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  return `rgba(${red}, ${green}, ${blue}, 0.8)`;
};

export { formatTags, validate, notify, getRandomColor };
