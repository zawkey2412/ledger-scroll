import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "https://slyflourish.com/images/saltmarsh_heroes.jpg",
  "https://feyancestry.wordpress.com/wp-content/uploads/2021/10/03-vellynne.png",
  "https://startplaying.games/_next/image?url=https%3A%2F%2Fspg-images.s3.us-west-1.amazonaws.com%2F71f2a6b5-652a-4291-9331-582b04c350e5&w=3840&q=75",
  "https://cdna.artstation.com/p/assets/images/images/002/201/416/large/jedd-chevrier-gates-of-barovia-chevrier-branded.jpg",
];

const ImageCarousel: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full">
      <AnimatePresence>
        {images.map(
          (src, index) =>
            index === currentImageIndex && (
              <motion.img
                key={index}
                src={src}
                alt={`Slide ${index + 1}`}
                className="absolute w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              />
            )
        )}
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-75"></div>
    </div>
  );
};

export default ImageCarousel;
