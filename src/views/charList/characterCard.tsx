import React from "react";
import { useNavigate } from "react-router-dom";
import { Character } from "../../types/character";

interface CharacterCardProps {
  character: Character;
  onEdit: (character: Character) => void;
  onDelete: (id: string) => void;
  isEditMode: boolean;
  isSelected: boolean;
  onCheckboxChange: () => void;
  campaigns: string[];
}

const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  onEdit,
  onDelete,
  isEditMode,
  isSelected,
  onCheckboxChange,
  campaigns = [],
}) => {
  const navigate = useNavigate();

  const handleWriteNote = () => {
    navigate(`/notes/${character.id}`);
  };

  return (
    <div
      className={`p-4 border border-gray-300 h-[300px] rounded min-h-[220px] flex flex-col cursor-pointer hover:shadow-md transition-shadow relative ${
        isEditMode ? "select-none" : ""
      }`}
    >
      {/* Main container with conditional classes for edit mode */}
      {isEditMode && (
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onCheckboxChange}
          className="absolute top-2 right-2 cursor-pointer"
        />
      )}
      {/* Checkbox for edit mode */}
      <div className="h-28 mb-2">
        <img
          src={character.image}
          alt={character.name}
          className="w-full h-full object-cover rounded"
        />
      </div>
      {/* Character image */}
      <h3 className="text-lg font-bold truncate">{character.name}</h3>
      <p className="text-sm truncate">
        <strong>Race:</strong> {character.race}
      </p>
      <p className="text-sm truncate">
        <strong>Class:</strong> {character.class}
      </p>
      {/* Character name and details */}
      <div className="mt-2 flex flex-wrap gap-2">
        {campaigns.length > 0 && (
          <span className="bg-highlight text-gray-800 px-3 py-1 mx-auto rounded-full text-xs shadow-md">
            {campaigns[0]} {campaigns.length > 1 && `+${campaigns.length - 1}`}
          </span>
        )}
      </div>
      {/* Campaigns badge */}
      {isEditMode ? (
        <div className="mt-auto pt-3 flex justify-between border-t border-gray-200">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(character);
            }}
            className="bg-blue-500 text-white px-2 py-1 rounded text-xs"
          >
            Edit
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(character.id);
            }}
            className="bg-red-500 text-white px-2 py-1 rounded text-xs"
          >
            Delete
          </button>
        </div>
      ) : (
        <div className="mt-auto pt-3 flex justify-center border-t border-gray-200">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleWriteNote();
            }}
            className="bg-green-500 text-white px-2 py-1 rounded text-xs"
          >
            Write a Note
          </button>
        </div>
      )}
      {/* Edit mode buttons */}
      {/* Default mode button */}
    </div>
  );
};

export default CharacterCard;
