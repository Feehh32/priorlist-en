import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
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
    document.title = "Recuperar senha | PriorList";
  }, []);

  // Function to control the inputs
  const handleChange = (e) => {
    setLoginData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
    setFormErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = forgotPasswordValidator(loginData);
    setFormErrors(errors);

    // if errors object is not empty, return e stop the function
    if (Object.keys(errors).length > 0) return;

    // Send the data to reset password
    const res = await resetPassword(loginData.email);
    if (!res.success) return;
    setSuccess({
      success: true,
      message:
        "Se o email estiver correto, você receberá um link para redefinir sua senha.",
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
            Recuperar sua senha
          </h1>
          <p className="text-secondary text-base text-center max-w-md mx-auto mb-4 md:mb-8">
            Insira seu email no campo abaixo, em seguida lhe enviaremos um link
            para redefinir sua senha.
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
              placeholder="Seu Email"
              onChange={handleChange}
              value={loginData.email}
              error={formErrors.email}
            />
            <button
              type="submit"
              className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors mt-2 cursor-pointer font-secondary shadow-md flex justify-center items-center"
              disabled={loading}
            >
              {loading ? <Spinner size="w-6 h-6" color="white" /> : "Enviar"}
            </button>
            {error && (
              <p className="text-red-500 text-sm text-center " role="alert">
                {error}
              </p>
            )}
          </form>

          <Link
            className="text-primary font-medium text-sm hover:underline text-center flex justify-center items-center gap-2 mb-4 md:mb-8 max-w-fit m-auto"
            to={"/login"}
          >
            <FaArrowLeftLong aria-hidden="true" />
            <span> Voltar ao login</span>
          </Link>
        </div>
      </section>
    </PageTransition>
  );
};

export default ForgotPassword;
