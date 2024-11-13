import React from "react";
import { motion } from "framer-motion";
import { Note } from "../../types/note";

interface NoteDetailProps {
  note: Note;
  onClose: () => void;
}

// NoteDetail component to display the details of a note
const NoteDetail: React.FC<NoteDetailProps> = ({ note, onClose }) => {
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4">{note.title}</h2>
        <p className="text-sm text-gray-500">{note.date}</p>
        <p className="text-sm text-gray-500">
          Written by: {note.characterName}
        </p>
        <p className="mt-2">{note.content}</p>
        <div className="flex justify-end items-center gap-4 pt-6 border-t">
          <span
            onClick={onClose}
            className="cursor-pointer my-auto text-gray-500 hover:text-red-500"
          >
            Close
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default NoteDetail;
