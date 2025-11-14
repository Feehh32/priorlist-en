import PropTypes from "prop-types";
import FormInput from "../input/FormInput";
import { useEffect, useState, useRef } from "react";
import taskFormValidator from "../../utils/taskFormValidator";
import Spinner from "../UI/Spinner";

const TaskForm = ({ onSubmit, modalMode, taskToEdit, loading }) => {
  const [formErrors, setFormErrors] = useState({});
  const titleInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    deadline: null,
    priority: 3,
    completed: false,
    archived: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });

  useEffect(() => {
    if (taskToEdit) {
      setFormData((prev) => ({
        ...prev,
        ...taskToEdit,
      }));
    }
  }, [taskToEdit]);

  useEffect(() => {
    if (titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "radio" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate title and other fields using a utility function
    const errors = taskFormValidator(formData);
    setFormErrors(errors);

    // If there are validation errors, stop form submission
    if (Object.keys(errors).length > 0) return;

    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <FormInput
        label="Task Title"
        placeholder="Enter your task"
        id="title"
        value={formData.title}
        onChange={handleChange}
        error={formErrors.title}
        ref={titleInputRef}
      />

      <label
        className="text-text-main font-semibold font-secondary block"
        htmlFor="description"
      >
        Description
        <textarea
          className="block border border-input-border rounded-lg w-full px-4 py-3 font-normal focus:border-primary outline-none focus:border-2 focus:ring-2 focus:ring-primary/40 font-primary shadow-sm bg-bg-main"
          placeholder="Describe the task..."
          rows={3}
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </label>

      <FormInput
        label="Deadline"
        placeholder="Set a due date"
        id="deadline"
        value={formData.deadline ?? ""}
        type="date"
        onChange={handleChange}
      />

      <fieldset className="flex gap-4 md:flex-row flex-col">
        <legend className="text-text-main font-semibold font-secondary block">
          Priority
        </legend>

        <label htmlFor="low" className="flex gap-2 items-center">
          <input
            type="radio"
            name="priority"
            id="low"
            value={3}
            checked={formData.priority === 3}
            onChange={handleChange}
            className="appearance-none w-4 h-4 rounded-full border-2 border-green-500 checked:bg-green-500"
          />
          Low
        </label>

        <label htmlFor="medium" className="flex gap-2 items-center">
          <input
            type="radio"
            name="priority"
            id="medium"
            value={2}
            checked={formData.priority === 2}
            onChange={handleChange}
            className="appearance-none w-4 h-4 rounded-full border-2 border-yellow-500 checked:bg-yellow-500"
          />
          Medium
        </label>

        <label htmlFor="high" className="flex gap-2 items-center">
          <input
            type="radio"
            name="priority"
            id="high"
            value={1}
            checked={formData.priority === 1}
            onChange={handleChange}
            className="appearance-none w-4 h-4 rounded-full border-2 border-red-500 checked:bg-red-500"
          />
          High
        </label>
      </fieldset>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors mt-2 cursor-pointer font-secondary shadow-md flex items-center justify-center"
      >
        {loading ? (
          <>
            <Spinner color="white" />
            <span className="sr-only">Sending...</span>
          </>
        ) : modalMode === "create" ? (
          "Create Task"
        ) : (
          "Save Changes"
        )}
      </button>
    </form>
  );
};

export default TaskForm;

TaskForm.propTypes = {
  onSubmit: PropTypes.func,
  modalMode: PropTypes.string,
  taskToEdit: PropTypes.object,
  loading: PropTypes.bool,
};
