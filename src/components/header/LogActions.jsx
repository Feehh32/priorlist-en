import { useState, useContext, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../../contexts/AuthContext";
import { MdOutlineLogout, MdOutlineDeleteOutline } from "react-icons/md";
import useOutsideClick from "../../hooks/useOutsideClick";
import ConfirmModal from "../modal/ConfirmModal";

const LogActions = () => {
  const { user, logout, deactivateAccount } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const usernameInitials = user?.name ? user.name[0].toUpperCase() : "?";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useOutsideClick(menuRef, () => setIsOpen(false));

  const disableAccount = async (confirmation) => {
    if (confirmation) {
      setShowConfirm((prev) => !prev);
      setIsOpen((prev) => !prev);
      const result = await deactivateAccount();

      if (result.success) {
        logout();
        navigate("/account-deactivated", {
          replace: true,
          state: { accountWasDeactivated: true },
        });
      } else {
        console.log(result.message);
      }
    } else {
      setShowConfirm((prev) => !prev);
      setIsOpen((prev) => !prev);
      return;
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        setIsOpen(false);
        menuRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  if (!user) {
    return (
      <div className="flex gap-2 md:gap-4 items-center">
        <Link
          to="/login"
          className="text-white font-secondary font-semibold px-4 py-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary rounded-md"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="text-primary font-semibold bg-white md:px-8 py-2 px-4 rounded-lg shadow-md hover:bg-[#3B82F6] hover:text-white transition-all duration-300 font-secondary text-center md:mt-0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Sign Up
        </Link>
      </div>
    );
  }

  return (
    <div className="relative flex items-center gap-4 md:gap-6" ref={menuRef}>
      <p className="hidden md:block text-white font-normal text-sm">
        Welcome, {user.name.split(" ")[0]}
      </p>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={`Open account menu for ${user.name}`}
        aria-haspopup="true"
        aria-expanded={isOpen}
        className="bg-[#3B82F6] hover:bg-white hover:text-primary transition-colors duration-200 rounded-full w-9 h-9 text-white font-secondary font-semibold flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary cursor-pointer"
      >
        {usernameInitials}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            key="menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute top-12 right-0 z-50 gap-2 bg-white shadow-lg rounded-2xl py-2 w-[200px] flex flex-col focus:outline-none p-2"
          >
            <li role="none">
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-gray-800 flex items-center gap-2 hover:bg-gray-100 rounded-md transition-colors duration-200 focus:outline-none focus:bg-gray-100 cursor-pointer"
              >
                <MdOutlineLogout size={18} aria-hidden="true" />
                Log out
              </button>
            </li>
            <li role="none">
              <button
                onClick={() => setShowConfirm((prev) => !prev)}
                className="w-full text-left px-4 py-2 text-sm text-red-600 flex items-center gap-2 hover:bg-red-50 rounded-md transition-colors duration-200 focus:outline-none focus:bg-red-50 cursor-pointer"
              >
                <MdOutlineDeleteOutline size={18} aria-hidden="true" />
                Deactivate account
              </button>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
      <ConfirmModal
        isOpen={showConfirm}
        onConfirm={disableAccount}
        title="Deactivate Account"
        message="Are you sure you want to deactivate your account? This action cannot be undone."
        confirmLabel="Yes, deactivate"
        cancelLabel="Cancel"
      />
    </div>
  );
};

export default LogActions;
