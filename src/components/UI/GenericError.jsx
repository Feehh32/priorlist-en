import { useState } from "react";
import { MdClose } from "react-icons/md";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";

const GenericError = ({ error }) => {
  const [isOpen, setIsOpen] = useState(true);

  if (!error) return null;

  const isNetworkError = error?.message?.includes("Failed to fetch");
  const errorMsg = isNetworkError
    ? "Failed to load. Please check your internet connection."
    : `An unexpected error occurred: ${error.message || error}.`;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="text-red-800 font-semibold bg-red-100 fixed top-0 left-0 right-0 py-4 px-6 flex justify-center items-center gap-4 shadow-md z-50"
          aria-live="assertive"
          role="alert"
        >
          <p>{errorMsg}</p>

          <button
            onClick={() => window.location.reload()}
            className="text-blue-700 underline hover:text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded transition-colors duration-200"
          >
            Reload Page
          </button>

          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-3 right-3 text-black hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-700 rounded transition-colors duration-200"
            aria-label="Close error message"
          >
            <MdClose size={20} aria-hidden="true" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

GenericError.propTypes = {
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
};

export default GenericError;
