import { useEffect } from "react";
import { Link } from "react-router-dom";
import PageTransition from "../components/pageTransition/PageTransition";

const AccountDeactivated = () => {
  useEffect(() => {
    document.title = "PriorList | Account Deactivated";
  }, []);

  return (
    <PageTransition>
      <section className="bg-gray-100 min-h-screen px-4 md:px-16 py-8 md:py-16">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 font-secondary text-primary text-center">
            Your account has been successfully deactivated!
          </h1>
          <p className="text-normal md:text-lg text-secondary text-center">
            To reactivate your account, please contact support.
          </p>
          <p className="text-normal md:text-lg text-primary font-secondary mt-4">
            Thank you for using PriorList!
          </p>
          <Link
            to="/"
            aria-label="Back to the PriorList home page"
            className="bg-primary text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 mt-8 cursor-pointer"
          >
            Back to Home
          </Link>
        </div>
      </section>
    </PageTransition>
  );
};

export default AccountDeactivated;
