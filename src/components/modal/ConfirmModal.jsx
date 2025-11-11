import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";

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
    transition: { duration: 0.2, ease: "easeInOut" },
  },
};

const ConfirmModal = ({
  isOpen,
  onConfirm,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
}) => {
  const titleId = "confirm-modal-title";
  const modalRef = useRef(null);

  // Handle escape key and trap focus
  useEffect(() => {
    if (!isOpen) return;

    modalRef.current?.focus();
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onConfirm(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onConfirm]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-2 md:px-0"
          role="presentation"
        >
          <motion.div
            variants={modal}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="alertdialog"
            aria-labelledby={titleId}
            aria-modal="true"
            tabIndex={-1}
            ref={modalRef}
            className="bg-white max-w-md border-t-16 rounded-lg shadow-lg border-primary p-5"
          >
            <h2
              id={titleId}
              className="text-xl text-secondary font-medium text-center"
            >
              {title}
            </h2>

            {message && (
              <p className="text-gray-600 text-sm mt-2 text-center">
                {message}
              </p>
            )}

            <div className="flex justify-center items-center gap-4 mt-5">
              <button
                onClick={() => onConfirm(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {cancelLabel}
              </button>

              <button
                onClick={() => onConfirm(true)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 cursor-pointer transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                {confirmLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmModal;
