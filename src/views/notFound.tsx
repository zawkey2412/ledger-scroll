import { motion } from "framer-motion";
import LinkButton from "../components/linkButton";
import dragonEgg from "../assets/dragon-egg.png";

// Framer definition for the egg animation
const eggAnimation = {
  rotate: [0, 10, -10, 10, -10, 0, 0, 0],
  transition: {
    duration: 4,
    repeat: Infinity,
    repeatType: "loop" as const,
  },
};

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
      <div className="">
        <motion.img
          src={dragonEgg}
          alt="Dragon Egg"
          aria-label="Twitching Dragon Egg"
          className="w-full max-w-md mx-auto"
          animate={eggAnimation}
        />
      </div>
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-600 drop-shadow-lg">404</h1>
        <h2 className="text-2xl font-bold mt-4">
          Uh-oh! The dragon lay its egg here.
        </h2>
        <p className="text-base mt-2">
          You might want to run back to safety before it hatches.
        </p>
        <LinkButton
          to="/"
          text="Back to Safety"
          fromColor="from-red-600"
          toColor="to-red-400"
          hoverFromColor="from-red-700"
          hoverToColor="to-red-500"
        />
      </div>
    </div>
  );
};

export default NotFound;
