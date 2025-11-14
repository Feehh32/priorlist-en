const updatePasswordValidator = (data) => {
  const errors = {};

  if (!data.password) {
    errors.password = "Password is required";
  } else if (data.password.length < 6) {
    errors.password = "Password must be at least 6 characters long";
  } else if (!/[A-Z]/.test(data.password)) {
    errors.password = "Password must contain at least one uppercase letter";
  } else if (!/[a-z]/.test(data.password)) {
    errors.password = "Password must contain at least one lowercase letter";
  } else if (!/[0-9]/.test(data.password)) {
    errors.password = "Password must contain at least one number";
  } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(data.password)) {
    errors.password = "Password must contain at least one special character";
  }

  if (!data.confirmPassword) {
    errors.confirmPassword = "Password confirmation is required";
  } else if (data.password !== data.confirmPassword) {
    errors.confirmPassword = "Passwords must match";
  }

  return errors;
};

export default updatePasswordValidator;
