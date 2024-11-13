import React from "react";
import { Note } from "../../types/note";

interface NoteCardProps {
  note: Note;
  isEditMode: boolean;
  isSelected: boolean;
  onCheckboxChange: () => void;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
  onClick: () => void;
}

// NoteCard component definition
const NoteCard: React.FC<NoteCardProps> = ({
  note,
  isEditMode,
  isSelected,
  onCheckboxChange,
  onEdit,
  onDelete,
  onClick,
}) => {
  return (
    <div
      className="p-4 border border-gray-300 rounded cursor-pointer relative"
      onClick={onClick}
    >
      {isEditMode && (
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onCheckboxChange}
          className="absolute top-2 right-2 cursor-pointer"
        />
      )}
      <h4 className="text-lg font-bold">{note.title}</h4>
      <p className="text-sm text-gray-500">{note.date}</p>
      <p className="text-sm text-gray-500">Written by: {note.characterName}</p>
      <p className="mt-2">{note.content}</p>
      {isEditMode && (
        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(note);
            }}
            className="bg-blue-500 text-white px-2 py-1 rounded text-xs"
          >
            Edit
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(note.id);
            }}
            className="bg-red-500 text-white px-2 py-1 rounded text-xs"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default NoteCard;