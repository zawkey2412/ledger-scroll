import { useState } from "react";
import { motion } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import useAuthStore from "../../store/useAuthStore";
import Logo from "../../assets/logo.png";
import NavItem from "./navItem";
import MobileNavItem from "./mobileNavItem";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuthStore();

  // Toggle the mobile sidebar
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = () => {
    setIsOpen(false);
  };

  const itemVariants = {
    closed: { opacity: 0, y: -20 },
    open: { opacity: 1, y: 0 },
  };

  return (
    <header className="bg-secondary py-4 px-8 z-50 text-white flex justify-between items-center shadow-lg">
      {/* Logo and site name */}
      <a href="/" aria-label="Home" className="flex items-center">
        <img src={Logo} alt="Ledger Scroll Logo" className="h-14" />
        <span className="hidden md:block text-base font-medium">Ledger Scroll</span>
      </a>
      {/* Mobile menu button */}
      <button
        className="md:hidden focus:outline-none"
        onClick={toggleSidebar}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? (
          <FaTimes className="h-6 w-6 hover:text-red-600 transition duration-300" />
        ) : (
          <FaBars className="h-6 w-6 hover:text-highlight transition duration-300" />
        )}
      </button>
      {/* Desktop navigation */}
      <nav className="hidden md:flex space-x-6">
        <NavItem to="/">Home</NavItem>
        <NavItem to="/character-list">Character List</NavItem>
        <NavItem to="/notes">Notes</NavItem>
        {user ? (
          <button
            onClick={logout}
            className="hover:text-blue-500 flex items-center space-x-2 transition duration-300"
          >
            <span>Log Out</span>
          </button>
        ) : (
          <>
            <NavItem to="/login">Login</NavItem>
            <NavItem to="/register">Register</NavItem>
          </>
        )}
      </nav>
      {/* Mobile navigation */}
      {isOpen && (
        <motion.div
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed top-0 left-0 w-full z-40 h-full bg-highlight text-black font-medium p-6 md:hidden flex flex-col items-center justify-center shadow-lg"
        >
          <button
            onClick={toggleSidebar}
            className="mb-4 pb-4 focus:outline-none"
            aria-label="Close menu"
          >
            <FaTimes className="h-6 w-6 hover:text-red-600 transition duration-300" />
          </button>
          <nav className="flex flex-col space-y-6 items-center text-lg">
            <motion.div
              variants={itemVariants}
              initial="closed"
              animate="open"
              exit="closed"
              transition={{ delay: 0.1 }}
            >
              <MobileNavItem to="/" onClick={handleItemClick}>
                Home
              </MobileNavItem>
            </motion.div>
            <motion.div
              variants={itemVariants}
              initial="closed"
              animate="open"
              exit="closed"
              transition={{ delay: 0.2 }}
            >
              <MobileNavItem to="/character-list" onClick={handleItemClick}>
                Character List
              </MobileNavItem>
            </motion.div>
            <motion.div
              variants={itemVariants}
              initial="closed"
              animate="open"
              exit="closed"
              transition={{ delay: 0.3 }}
            >
              <MobileNavItem to="/notes" onClick={handleItemClick}>
                Notes
              </MobileNavItem>
            </motion.div>
            {user ? (
              <motion.div
                variants={itemVariants}
                initial="closed"
                animate="open"
                exit="closed"
                transition={{ delay: 0.4 }}
              >
                <button
                  onClick={() => {
                    logout();
                    handleItemClick();
                  }}
                  className="hover:text-accent flex items-center space-x-2 transition duration-300"
                >
                  <span>Log Out</span>
                </button>
              </motion.div>
            ) : (
              <>
                <motion.div
                  variants={itemVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  transition={{ delay: 0.5 }}
                >
                  <MobileNavItem to="/login" onClick={handleItemClick}>
                    Login
                  </MobileNavItem>
                </motion.div>
                <motion.div
                  variants={itemVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  transition={{ delay: 0.6 }}
                >
                  <MobileNavItem to="/register" onClick={handleItemClick}>
                    Register
                  </MobileNavItem>
                </motion.div>
              </>
            )}
          </nav>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;
