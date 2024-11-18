import React, { useEffect, useState } from "react";
import useCharacterStore from "../store/useCharacterStore";
import useNoteStore from "../store/useNoteStore";
import useAuthStore from "../store/useAuthStore";
import RollOfFate from "../components/RollOfFate";
import { motion } from "framer-motion";
import { FaDice, FaTimes } from "react-icons/fa";
import CTAButton from "../components/CTAButton";

const Home: React.FC = () => {
  // State and store hooks
  const { characters, fetchCharacters } = useCharacterStore();
  const { notes, fetchNotes } = useNoteStore();
  const { user } = useAuthStore(); // Fetch user from the auth store
  const [characterCount, setCharacterCount] = useState(0);
  const [noteCount, setNoteCount] = useState(0);
  const [isRollOfFateOpen, setIsRollOfFateOpen] = useState(false);

  // Fetch characters and notes on component mount or user changes
  useEffect(() => {
    if (user) {
      fetchCharacters();
      fetchNotes();
    }
  }, [fetchCharacters, fetchNotes, user]);

  // Update character count when characters change
  useEffect(() => {
    setCharacterCount(characters.length);
  }, [characters]);

  // Update note count when notes change
  useEffect(() => {
    setNoteCount(notes.length);
  }, [notes]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-900 p-4 relative">
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <p className="text-lg text-gray-700 mb-4 text-center">
          Keep track of your adventures, characters, and campaigns with ease.
        </p>
        <div className="text-center mb-8">
          {characterCount > 0 ? (
            <>
              <p className="text-lg text-gray-700 mb-4">
                You have{" "}
                <span className="font-bold">{characterCount} characters</span>{" "}
                and <span className="font-bold">{noteCount} notes</span> in
                total. Ready for your next adventure? Dive into your notes to
                relive past adventures or create new ones!
              </p>
              <CTAButton
                to="/notes"
                text="View Notes"
                fromColor="bg-primary"
                toColor="bg-secondary"
                hoverFromColor="hover:bg-accent"
                hoverToColor="hover:bg-highlight"
              />
            </>
          ) : (
            <>
              <p className="text-lg text-gray-700 mb-4">
                No characters yet. Create your first character to start your
                adventure! Embark on a journey filled with excitement and
                endless possibilities.
              </p>
              <CTAButton
                to="/character-list"
                text="Create Character"
                fromColor="bg-primary"
                toColor="bg-secondary"
                hoverFromColor="hover:bg-accent"
                hoverToColor="hover:bg-highlight"
              />
            </>
          )}
        </div>
      </main>
      {/* Roll of Fate sidebar */}
      <motion.div
        className="fixed top-1/2 right-0 transform -translate-y-1/2 bg-gray-200 p-4 text-gray-900 text-center h-full overflow-y-auto shadow-lg"
        initial={{ x: "100%" }}
        animate={{ x: isRollOfFateOpen ? "0%" : "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Roll of Fate</h2>
          <button
            className="text-red-500"
            onClick={() => setIsRollOfFateOpen(false)}
          >
            <FaTimes className="text-xl" />
          </button>
        </div>
        <RollOfFate />
      </motion.div>
      {/* Button to open Roll of Fate */}
      {!isRollOfFateOpen && (
        <button
          className="fixed top-1/2 right-0 transform -translate-y-1/2 bg-primary text-white p-4 rounded-l-full shadow-lg"
          onClick={() => setIsRollOfFateOpen(true)}
        >
          <FaDice className="text-2xl" />
        </button>
      )}
    </div>
  );
};

export default Home;
