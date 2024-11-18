import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { FaPlus, FaWrench, FaTrash, FaCheck } from "react-icons/fa";
import useCharacterStore from "../../store/useCharacterStore";
import { Character } from "../../types/character";
import useAuthStore from "../../store/useAuthStore";
import CharacterForm from "./characterForm";
import CharacterCard from "./characterCard";
import CharacterDetail from "./characterDetail";
import CTAButton from "../../components/CTAButton";
import toast from "react-hot-toast";
import ConfirmationModal from "../../components/confirmationModal";

const CharacterList: React.FC = () => {
  // Fetch user and character data from stores
  const { user } = useAuthStore();
  const { characters, fetchCharacters, deleteCharacter } = useCharacterStore();

  // State management for various UI elements and actions
  const [editingCharacter, setEditingCharacter] = useState<Character | null>(
    null
  );
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedCharacters, setSelectedCharacters] = useState<Set<string>>(
    new Set()
  );
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [characterToDelete, setCharacterToDelete] = useState<string | null>(
    null
  );

  // Fetch characters when component mounts or user changes
  useEffect(() => {
    if (user) {
      fetchCharacters();
    }
  }, [fetchCharacters, user]);

  // Handlers for editing, deleting, and adding characters
  const handleEdit = (character: Character) => {
    setEditingCharacter(character);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    setCharacterToDelete(id);
    setIsConfirmationOpen(true);
  };

  const handleConfirmDelete = () => {
    if (characterToDelete) {
      deleteCharacter(characterToDelete);
      toast.success("Character deleted successfully.", {
        style: {
          background: "#433D8B",
          color: "#fff",
        },
      });
      setCharacterToDelete(null);
    }
    setIsConfirmationOpen(false);
  };

  const handleAddCharacter = () => {
    if (characters.length >= 7) {
      toast.error("You can only have up to 7 characters.", {
        style: {
          background: "#433D8B",
          color: "#fff",
        },
      });
      return;
    }
    setEditingCharacter(null);
    setIsFormOpen(true);
  };

  const handleCardClick = (character: Character) => {
    if (isEditMode) {
      handleCheckboxChange(character.id);
    } else {
      setSelectedCharacter(character);
    }
  };

  const handleToggleEditMode = () => {
    setIsEditMode(!isEditMode);
    setSelectedCharacters(new Set());
    toast(
      isEditMode
        ? "Exiting edit mode. Your adventure continues!"
        : "Entering edit mode. Prepare your characters!",
      {
        icon: "🛡️",
        style: {
          borderRadius: "10px",
          background: "#433D8B",
          color: "#fff",
        },
      }
    );
  };

  const handleCheckboxChange = (id: string) => {
    setSelectedCharacters((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleDeleteSelected = () => {
    if (selectedCharacters.size === 0) {
      toast.error("No characters selected for deletion.", {
        style: {
          background: "#433D8B",
          color: "#fff",
        },
      });
      return;
    }

    selectedCharacters.forEach((id) => deleteCharacter(id));
    setSelectedCharacters(new Set());
    toast.success("Selected characters deleted successfully.", {
      style: {
        background: "#433D8B",
        color: "#fff",
      },
    });
  };

  // Render login prompt if user is not logged in
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-primary text-white">
        <h1 className="text-4xl font-bold mb-6">
          Please log in to view characters
        </h1>
      </div>
    );
  }

  // Prepare character items for display
  const items = [
    <div
      key="create"
      className={`p-4 border border-gray-300 h-[300px] rounded min-h-[220px] flex flex-col cursor-pointer hover:shadow-md transition-shadow items-center justify-center ${
        characters.length === 0 ? "col-span-full" : ""
      }`}
      onClick={handleAddCharacter}
    >
      <FaPlus className="text-green-500 text-3xl" />
      <span className="mt-2 text-lg font-bold">Add Character</span>
    </div>,
    ...characters.slice(0, 7).map((character) => (
      <div key={character.id} onClick={() => handleCardClick(character)}>
        <CharacterCard
          character={character}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isEditMode={isEditMode}
          isSelected={selectedCharacters.has(character.id)}
          onCheckboxChange={() => handleCheckboxChange(character.id)}
          campaigns={character.campaigns || []}
        />
      </div>
    )),
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center mb-8">Character List</h1>
      <div className="flex justify-center items-center w-full">
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {items}
        </div>
      </div>
      <AnimatePresence>
        {isFormOpen && (
          <CharacterForm
            character={editingCharacter}
            onClose={() => setIsFormOpen(false)}
          />
        )}
        {selectedCharacter && (
          <CharacterDetail
            character={selectedCharacter}
            onClose={() => setSelectedCharacter(null)}
          />
        )}
      </AnimatePresence>
      {isConfirmationOpen && (
        <ConfirmationModal
          message="Are you sure you want to delete this character?"
          onConfirm={handleConfirmDelete}
          onCancel={() => setIsConfirmationOpen(false)}
        />
      )}
      {characters.length > 0 && (
        <>
          <div className="flex justify-center mt-8 sm:hidden">
            <button
              className="fixed bottom-4 right-4 bg-primary text-white p-4 rounded-full shadow-lg"
              onClick={handleToggleEditMode}
            >
              {isEditMode ? (
                <FaCheck className="text-xl" />
              ) : (
                <FaWrench className="text-xl" />
              )}
            </button>
            {isEditMode && (
              <button
                className="fixed bottom-4 right-20 bg-red-500 text-white p-4 rounded-full shadow-lg"
                onClick={handleDeleteSelected}
              >
                <FaTrash className="text-xl" />
              </button>
            )}
          </div>
          <div className="hidden sm:flex justify-center mt-8">
            {isEditMode ? (
              <CTAButton
                to="#"
                text="Delete Selected"
                fromColor="bg-primary"
                toColor="bg-secondary"
                hoverFromColor="hover:bg-accent"
                hoverToColor="hover:bg-red-500"
                onClick={handleDeleteSelected}
              />
            ) : (
              <CTAButton
                to="#"
                text="Edit Mode"
                fromColor="bg-primary"
                toColor="bg-secondary"
                hoverFromColor="hover:bg-accent"
                hoverToColor="hover:bg-highlight"
                onClick={handleToggleEditMode}
              />
            )}
          </div>
          {isEditMode && (
            <div className="hidden sm:flex justify-center mt-4">
              <CTAButton
                to="#"
                text="Finish Editing"
                fromColor="bg-primary"
                toColor="bg-secondary"
                hoverFromColor="hover:bg-accent"
                hoverToColor="hover:bg-highlight"
                onClick={handleToggleEditMode}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CharacterList;
