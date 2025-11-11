import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import forgotPasswordValidator from "../utils/forgotPasswordValidator";
import FormInput from "../components/input/FormInput";
import { FaArrowLeftLong } from "react-icons/fa6";
import PageTransition from "../components/pageTransition/PageTransition";
import { AuthContext } from "../contexts/AuthContext";
import Spinner from "../components/UI/spinner";

const ForgotPassword = () => {
  const [loginData, setLoginData] = useState({
    email: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [success, setSuccess] = useState(null);
  const { resetPassword, error, loading } = useContext(AuthContext);

  useEffect(() => {
    document.title = "Forgot Password | PriorList";
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setLoginData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setFormErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = forgotPasswordValidator(loginData);
    setFormErrors(errors);

    // stop if there are validation errors
    if (Object.keys(errors).length > 0) return;

    // Send reset password request
    const res = await resetPassword(loginData.email);
    if (!res.success) return;
    setSuccess({
      success: true,
      message:
        "If the email address is correct, you will receive a link to reset your password.",
    });
    setTimeout(() => {
      setSuccess(null);
      setLoginData({ email: "" });
      setFormErrors({});
    }, 3000);
  };

  return (
    <PageTransition>
      <section className="min-h-screen flex justify-center items-center flex-col bg-gray-50 p-8 md:p-16">
        {success && (
          <p
            className="text-green-700 text-sm text-center mb-4 p-3 bg-green-100 rounded-lg border border-green-300 shadow-sm"
            role="status"
          >
            {success.message}
          </p>
        )}
        <div className="bg-white max-w-2xl w-full shadow-md rounded-2xl">
          <h1 className="text-2xl md:text-3xl font-medium text-center text-primary my-4 md:my-8">
            Reset your password
          </h1>
          <p className="text-secondary text-base text-center max-w-md mx-auto mb-4 md:mb-8">
            Enter your email below and we will send you a link to reset your
            password.
          </p>
          <form
            className="px-8 pb-8 grid gap-4"
            noValidate
            onSubmit={handleSubmit}
          >
            <FormInput
              label="Email"
              type="email"
              id="email"
              placeholder="Your email"
              onChange={handleChange}
              value={loginData.email}
              error={formErrors.email}
            />
            <button
              type="submit"
              className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors mt-2 cursor-pointer font-secondary shadow-md flex justify-center items-center"
              disabled={loading}
            >
              {loading ? <Spinner size="w-6 h-6" color="white" /> : "Send"}
            </button>
            {error && (
              <p className="text-red-500 text-sm text-center" role="alert">
                {error}
              </p>
            )}
          </form>

          <Link
            className="text-primary font-medium text-sm hover:underline text-center flex justify-center items-center gap-2 mb-4 md:mb-8 max-w-fit m-auto"
            to={"/login"}
          >
            <FaArrowLeftLong aria-hidden="true" />
            <span>Back to login</span>
          </Link>
        </div>
      </section>
    </PageTransition>
  );
};

export default ForgotPassword;
