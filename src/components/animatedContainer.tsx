import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import ImageCarousel from "./imageCarousel";
import { AnimatedContainerProps } from "../types/animatedContainerProps";

// Define the component's props
interface Props extends AnimatedContainerProps {
  showImageCarousel?: boolean;
  customContent?: React.ReactNode;
  size?: "small" | "medium" | "large";
}

const AnimatedContainer: React.FC<Props> = ({
  children,
  showImageCarousel = true,
  customContent,
  size = "large",
}) => {
  // Define animation variants for the container
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.5, ease: "easeIn" },
    },
  };

  // Define size classes for different container sizes
  const sizeClasses = {
    small:
      "max-w-[85%] sm:max-w-[70%] md:max-w-[50%] lg:max-w-[40%] xl:max-w-[30%]",
    medium: "max-w-[75%] h-4/5",
    large: "max-w-[95%] xl:max-w-[60%] h-4/5",
  };

  return createPortal(
    // Main container with background
    <div className="fixed inset-0 flex items-center justify-center bg-primary">
      <motion.div
        className={`bg-white p-2 overflow-hidden rounded-3xl shadow-lg w-full ${sizeClasses[size]} flex flex-col md:flex-row`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {showImageCarousel && (
          // Image carousel section
          <div className="relative flex items-center justify-center w-full md:w-3/5 rounded-3xl overflow-hidden">
            <ImageCarousel />
            <div className="absolute inset-14 xl:inset-24 mt-10 flex-col items-center justify-center text-center text-white hidden md:flex">
              <div className="mb-4 font-bold text-xl md:text-4xl">
                Get Started With Us
              </div>
              <div className="text-sm md:text-base">
                Every Hero needs a place to immortalize their legendary
                adventures. Create your own
              </div>
              <img
                src="src/assets/logo.png"
                alt="Logo"
                className="w-14 h-14 mt-4"
                aria-label="Logo"
              />
            </div>
          </div>
        )}
        <div
          className={`w-full ${showImageCarousel ? "md:w-2/5 ml-2" : ""} p-8`}
        >
          {/* Custom content and children */}
          {customContent}
          {children}
        </div>
      </motion.div>
    </div>,
    document.body
  );
};

export default AnimatedContainer;
