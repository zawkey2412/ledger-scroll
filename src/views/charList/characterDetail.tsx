import React from "react";
import { motion } from "framer-motion";
import { Character } from "../../types/character";

interface CharacterDetailProps {
  character: Character;
  onClose: () => void;
}

export const CharacterDetail: React.FC<CharacterDetailProps> = ({
  character,
  onClose,
}) => {
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* Main container with background overlay and animation */}
      <motion.div
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Inner container with animation and click handler to stop propagation */}
        <div className="h-48 mb-4">
          <img
            src={character.image}
            alt={character.name}
            className="w-full h-full object-cover rounded"
          />
        </div>
        {/* Character image */}
        <h2 className="text-2xl font-bold mb-4">{character.name}</h2>
        {/* Character name */}
        <div className="space-y-2">
          <p>
            <strong>Race:</strong> {character.race}
          </p>
          <p>
            <strong>Class:</strong> {character.class}
          </p>
          <p>
            <strong>Subclass:</strong> {character.subclass}
          </p>
          <p>
            <strong>Background:</strong> {character.background}
          </p>
          <p>
            <strong>Backstory:</strong>
          </p>
          <p className="whitespace-pre-wrap">{character.backstory}</p>
          <p>
            <strong>Campaigns:</strong>
          </p>
          <ul className="list-disc list-inside">
            {character.campaigns.map((campaign, index) => (
              <li key={index}>{campaign}</li>
            ))}
          </ul>
        </div>
        {/* Character details */}
        <div className="flex justify-end items-center gap-4 pt-6 border-t">
          <span
            onClick={onClose}
            className="cursor-pointer my-auto text-gray-500 hover:text-red-500"
          >
            Close
          </span>
        </div>
        {/* Close button */}
      </motion.div>
    </motion.div>
  );
};

export default CharacterDetail;
