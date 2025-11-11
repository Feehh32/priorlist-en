import { Link } from "react-router-dom";
import HeroImage from "../assets/hero-image.webp";
import { useEffect } from "react";
import { motion } from "framer-motion";
import PageTransition from "../components/pageTransition/PageTransition";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, x: 20 },
  show: { opacity: 1, x: 0 },
};

const Home = () => {
  useEffect(() => {
    document.title = "PriorList | Advanced Task Manager";
  }, []);

  return (
    <PageTransition>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="px-4 md:px-16 py-16"
      >
        <motion.section
          variants={item}
          className="flex flex-col-reverse md:flex-row items-center justify-between max-w-6xl mx-auto gap-8"
        >
          <div className="text-center md:text-left md:flex-1">
            <h1 className="text-4xl md:text-6xl font-bold font-secondary text-primary mb-6">
              PriorList
            </h1>
            <p className="text-lg md:text-xl text-gray-600 font-secondary mb-8">
              Organize your tasks quickly, simply, and efficiently.
            </p>
            <div className="flex flex-col md:flex-row justify-center md:justify-start gap-4">
              <Link
                to="/register"
                className="bg-primary text-white px-8 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 font-semibold"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="border border-primary text-primary px-8 py-3 rounded-lg shadow-md hover:bg-primary hover:text-white transition-all duration-300 font-semibold"
              >
                I already have an account
              </Link>
            </div>
          </div>

          <div className="md:flex-1 flex justify-center">
            <picture>
              <source srcSet={HeroImage} type="image/webp" />
              <img
                src={HeroImage}
                alt="Person organizing tasks in a digital to-do list"
                width="1472"
                height="832"
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className="w-full max-w-md"
                style={{ aspectRatio: "3 / 2", height: "auto" }}
              />
            </picture>
          </div>
        </motion.section>

        <motion.section
          variants={item}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto"
        >
          <div className="p-6 rounded-xl shadow-md bg-white hover:shadow-lg transition">
            <h2 className="text-xl font-bold text-primary mb-2">✨ Simple</h2>
            <p className="text-gray-600 font-secondary">
              A clean, easy-to-use interface to organize your daily tasks.
            </p>
          </div>
          <div className="p-6 rounded-xl shadow-md bg-white hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-primary mb-2">⚡ Fast</h3>
            <p className="text-gray-600 font-secondary">
              Create, edit, and track everything in just a few clicks.
            </p>
          </div>
          <div className="p-6 rounded-xl shadow-md bg-white hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-primary mb-2">💡 Free</h3>
            <p className="text-gray-600 font-secondary">
              Use it at no cost and keep your priorities always within reach.
            </p>
          </div>
        </motion.section>

        <motion.section variants={item} className="mt-20 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            Ready to organize your life?
          </h2>
          <Link
            to="/register"
            className="bg-primary text-white px-8 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 font-semibold"
          >
            Create a free account
          </Link>
        </motion.section>
      </motion.div>
    </PageTransition>
  );
};

export default Home;
