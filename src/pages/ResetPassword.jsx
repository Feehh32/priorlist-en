import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import resetPasswordValidator from "../utils/updatePasswordValidator";
import PageTransition from "../components/pageTransition/PageTransition";
import { MdOutlineArrowBack } from "react-icons/md";
import FormInput from "../components/input/FormInput";
import Spinner from "../components/UI/Spinner";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [success, setSuccess] = useState(null);
  const [passwordData, setPasswordData] = useState({
    password: "",
    confirmPassword: "",
  });
  const { resetPassword, error, loading } = useContext(AuthContext);

  useEffect(() => {
    document.title = "PriorList | Reset Password";
  }, []);

  const handleChange = (e) => {
    setPasswordData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setFormErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = resetPasswordValidator(passwordData);
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) return;

    const res = await resetPassword(passwordData.password);
    if (!res.success) return;

    setSuccess({
      success: true,
      message:
        "Password successfully reset! You will be redirected to the login page shortly.",
    });

    setTimeout(() => {
      setPasswordData({ password: "", confirmPassword: "" });
      setFormErrors({});
      navigate("/login");
    }, 2000);
  };

  return (
    <PageTransition>
      <section
        className="min-h-screen flex justify-center items-center flex-col bg-gray-50 p-8 md:p-16"
        aria-labelledby="update-password-title"
      >
        {success && (
          <p
            className="text-green-700 text-sm text-center mb-4 p-3 bg-green-100 rounded-lg border border-green-300 shadow-sm transition-opacity duration-300"
            role="status"
            aria-live="polite"
          >
            {success.message}
          </p>
        )}

        <div className="bg-white max-w-2xl w-full shadow-md rounded-2xl">
          <h1
            id="update-password-title"
            className="text-2xl md:text-3xl font-medium text-center text-primary my-4 md:my-8"
          >
            Set your new password
          </h1>

          <p className="text-secondary text-base text-center max-w-md mx-auto mb-4 md:mb-8">
            Your new password must be at least 6 characters long. After
            resetting, you’ll be redirected to the login page.
          </p>

          <form
            className="px-8 pb-8 grid gap-4"
            noValidate
            onSubmit={handleSubmit}
          >
            <FormInput
              type="password"
              id="password"
              label="New password"
              placeholder="Enter your new password"
              onChange={handleChange}
              value={passwordData.password}
              error={formErrors.password}
              autoComplete="new-password"
            />
            <FormInput
              label="Confirm password"
              type="password"
              placeholder="Confirm your new password"
              id="confirmPassword"
              onChange={handleChange}
              value={passwordData.confirmPassword}
              error={formErrors.confirmPassword}
              autoComplete="new-password"
            />

            <button
              type="submit"
              className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors mt-2 cursor-pointer font-secondary shadow-md flex justify-center items-center"
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? (
                <Spinner size="w-6 h-6" color="white" />
              ) : (
                "Reset password"
              )}
            </button>

            {error && (
              <p className="text-red-500 text-sm text-center" role="alert">
                {error}
              </p>
            )}
          </form>

          <Link
            className="text-primary font-medium text-sm hover:underline text-center flex justify-center items-center gap-2 mb-4 md:mb-8 max-w-fit m-auto"
            to="/login"
          >
            <MdOutlineArrowBack size={18} aria-hidden="true" />
            <span>Back to login</span>
          </Link>
        </div>
      </section>
    </PageTransition>
  );
};

export default ResetPassword;
