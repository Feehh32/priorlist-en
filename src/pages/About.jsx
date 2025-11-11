import { Link } from "react-router-dom";
import { useEffect } from "react";
import PageTransition from "../components/pageTransition/PageTransition";

const About = () => {
  // dinamic title
  useEffect(() => {
    document.title = "PriorList | About";
  }, []);

  return (
    <PageTransition>
      <section className="relative min-h-screen md:flex justify-center px-4 md:px-0">
        <div className="w-full h-full ">
          <h1 className="text-3xl md:text-6xl font-secondary text-align-center font-semibold text-primary mb-6 mt-8 text-center ">
            About PriorList
          </h1>
          <svg
            className="absolute hidden md:block inset-0 w-full h-full rotate-180"
            viewBox="0 0 800 600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M0 300C200 400 400 200 800 300V600H0V300Z"
              fill="rgba(59,130,246,0.08)"
            />
            <path
              d="M0 400C250 300 550 500 800 400V600H0V400Z"
              fill="rgba(59,130,246,0.06)"
            />
          </svg>
        </div>

        <section className=" max-w-3xl bg-white/80 shadow-md rounded-2xl py-6 px-4 md:p-8 md:absolute md:top-1/4">
          <h2 className="text-2xl md:text-3xl font-medium text-primary mb-6">
            Productivity made simple
          </h2>

          <div className="mb-8 text-secondary">
            <p className="mb-4">
              PriorList is a simple and efficient tool designed to help you
              manage your daily tasks. Organize your priorities, track your
              progress, and stay focused on what truly matters.
            </p>

            <p>
              Our goal is to help you increase productivity and reduce stress by
              providing a clean, intuitive environment that lets you focus on
              what really counts.
            </p>
          </div>
          <div className="flex justify-center">
            <Link
              to="/"
              className="inline-block bg-primary text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-md"
            >
              Back to Home
            </Link>
          </div>
        </section>
      </section>
    </PageTransition>
  );
};

export default About;
