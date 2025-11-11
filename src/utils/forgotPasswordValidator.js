const forgotPasswordValidator = (data) => {
  const errors = {};
  if (!data.email) {
    errors.email = "Email is required";
  } else if (
    !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(data.email)
  ) {
    errors.email = "Please enter a valid email address";
  }
  return errors;
};

export default forgotPasswordValidator;
