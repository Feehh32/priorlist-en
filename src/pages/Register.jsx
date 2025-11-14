import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Spinner from "../components/UI/Spinner";
import FormInput from "../components/input/FormInput";
import PageTransition from "../components/pageTransition/PageTransition";
import registerValidator from "../utils/registerValidators";

const Register = () => {
  const [bodyData, setBodyData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [success, setSuccess] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();
  const { register, error, loading } = useContext(AuthContext);

  // dynamic title
  useEffect(() => {
    document.title = "PriorList | Sign Up";
  }, []);

  // handle input changes
  const handleChange = (e) => {
    setBodyData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setFormErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  // handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = registerValidator(bodyData);
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) return;

    // remove confirmPassword before sending data
    const { confirmPassword, ...userData } = bodyData;

    const result = await register(userData);
    if (result) {
      setSuccess("Account created successfully!");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  };

  return (
    <PageTransition>
      <section className="min-h-screen flex justify-center items-center flex-col bg-gray-50 p-8 md:p-16">
        {success && (
          <p
            className="text-green-700 text-sm text-center mb-4 p-2 bg-green-200 rounded-lg border border-green-300"
            role="status"
          >
            {success}
          </p>
        )}
        <div className="bg-white max-w-2xl w-full shadow-md rounded-2xl">
          <Link
            to="/"
            className="text-lg text-primary font-semibold text-center pt-4 pb-2 font-logo block"
            aria-label="PriorList - Homepage"
          >
            PriorList
          </Link>
          <h1 className="text-2xl md:text-3xl font-medium text-center text-secondary mb-8">
            Create your free account
          </h1>
          <form
            onSubmit={handleSubmit}
            className="px-8 pb-8 grid gap-4"
            noValidate
          >
            <FormInput
              label="Name"
              placeholder="Your name"
              id="name"
              value={bodyData.name}
              onChange={handleChange}
              error={formErrors["name"]}
            />
            <FormInput
              label="Email"
              placeholder="Your email"
              id="email"
              value={bodyData.email}
              onChange={handleChange}
              type="email"
              error={formErrors["email"]}
            />
            <FormInput
              label="Password"
              placeholder="Your password"
              id="password"
              value={bodyData.password}
              onChange={handleChange}
              type="password"
              error={formErrors["password"]}
            />
            <FormInput
              label="Confirm password"
              placeholder="Confirm your password"
              id="confirmPassword"
              value={bodyData.confirmPassword}
              onChange={handleChange}
              type="password"
              error={formErrors["confirmPassword"]}
            />
            <button
              type="submit"
              className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors mt-2 cursor-pointer font-secondary shadow-md flex justify-center items-center"
              disabled={loading}
            >
              {loading ? <Spinner color="border-gray-200" /> : "Sign up"}
            </button>
            {error && (
              <p className="text-red-500 text-sm text-center" role="alert">
                User already registered
              </p>
            )}
            <p className="text-sm text-center text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary font-medium hover:underline"
              >
                Log in here
              </Link>
            </p>
          </form>
        </div>
      </section>
    </PageTransition>
  );
};

export default Register;
