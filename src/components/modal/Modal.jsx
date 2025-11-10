import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import useOutsideClick from "../../hooks/useOutsideClick";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modal = {
  hidden: { opacity: 0, scale: 0.95, y: -20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 400, damping: 18, duration: 0.25 },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: -20,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
};

const Modal = ({ isOpen, onClose, children, titleId }) => {
  const modalRef = useRef(null);

  useOutsideClick(modalRef, onClose);

  // Create a focus trap and handle escape key
  useEffect(() => {
    if (!isOpen) return;

    modalRef.current?.focus();
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            variants={modal}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
            className="bg-white rounded-2xl shadow-lg mx-2 p-6 w-full max-w-lg relative"
            ref={modalRef}
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              ✕
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  titleId: PropTypes.string.isRequired,
};

export default Modal;
