const taskFormValidator = (data) => {
  const errors = {};

  if (!data.title || !data.title.trim()) {
    errors.title = "Title is required";
  } else if (data.title.length > 150) {
    errors.title = "Title cannot exceed 150 characters";
  }

  return errors;
};

export default taskFormValidator;
