const updatePasswordValidator = (data) => {
  const errors = {};

  if (!data.password) {
    errors.password = "Password is required";
  } else if (data.password.length < 6) {
    errors.password = "Password must be at least 6 characters long";
  }

  if (!data.confirmPassword) {
    errors.confirmPassword = "Password confirmation is required";
  } else if (data.password !== data.confirmPassword) {
    errors.confirmPassword = "Passwords must match";
  }

  return errors;
};

export default updatePasswordValidator;
