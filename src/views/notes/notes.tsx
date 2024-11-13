import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useNoteStore from "../../store/useNoteStore";
import NoteList from "./noteList";
import { Character } from "../../types/character";
import { characterService } from "../../services/characterService";
import { FaWrench, FaCheck, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import CTAButton from "../../components/CTAButton";

const Notes: React.FC = () => {
  // Get characterId from URL parameters
  const { characterId } = useParams<{ characterId: string }>();
  // Fetch notes and delete note functions from the store
  const { fetchNotes, deleteNote, notes } = useNoteStore();
  // State variables for characters, selected character, sorting, campaigns, edit mode, and selected notes
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedCharacterId, setSelectedCharacterId] = useState<
    string | undefined
  >(characterId);
  const [sortBy, setSortBy] = useState<string>("");
  const [campaigns, setCampaigns] = useState<string[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedNotes, setSelectedNotes] = useState<Set<string>>(new Set());

  // Fetch characters on component mount
  useEffect(() => {
    const fetchCharacters = async () => {
      const characters = await characterService.fetchCharacters();
      setCharacters(characters);
    };

    fetchCharacters();
  }, []);

  // Fetch notes and campaigns when selectedCharacterId or sortBy changes
  useEffect(() => {
    if (selectedCharacterId) {
      fetchNotes(selectedCharacterId, sortBy);
      const selectedCharacter = characters.find(
        (character) => character.id === selectedCharacterId
      );
      if (selectedCharacter) {
        setCampaigns(selectedCharacter.campaigns || []);
      }
    } else {
      fetchNotes(undefined, sortBy);
      setCampaigns([]);
    }
  }, [selectedCharacterId, sortBy, fetchNotes, characters]);

  // Handle sorting change
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
    fetchNotes(selectedCharacterId, e.target.value);
  };

  // Toggle edit mode and reset selected notes
  const handleToggleEditMode = () => {
    setIsEditMode(!isEditMode);
    setSelectedNotes(new Set());
    toast(
      isEditMode
        ? "Exiting edit mode. Your adventure continues!"
        : "Entering edit mode. Prepare your notes!",
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

  // Delete selected notes
  const handleDeleteSelected = () => {
    if (selectedNotes.size === 0) {
      toast.error("No notes selected for deletion.", {
        style: {
          background: "#433D8B",
          color: "#fff",
        },
      });
      return;
    }

    selectedNotes.forEach((id) => deleteNote(id));
    setSelectedNotes(new Set());
    toast.success("Selected notes deleted successfully.", {
      style: {
        background: "#433D8B",
        color: "#fff",
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h3 className="text-4xl font-bold text-center mb-8">Notes</h3>
      <div className="max-w-md mx-auto mb-4">
        {!characterId && (
          <>
            <div className="mb-4">
              <label
                htmlFor="character-select"
                className="block text-sm font-medium text-gray-700"
              >
                Select Character
              </label>
              <select
                id="character-select"
                value={selectedCharacterId || ""}
                onChange={(e) =>
                  setSelectedCharacterId(e.target.value || undefined)
                }
                className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm"
              >
                <option value="">All Characters</option>
                {characters.map((character) => (
                  <option key={character.id} value={character.id}>
                    {character.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="sort-select"
                className="block text-sm font-medium text-gray-700"
              >
                Sort By
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={handleSortChange}
                className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm"
              >
                <option value="">None</option>
                <option value="campaign">Campaign</option>
                <option value="recent">Recent</option>
              </select>
            </div>
          </>
        )}
      </div>
      <NoteList
        characterId={selectedCharacterId}
        sortBy={sortBy}
        showAsField={!characterId}
        campaignNames={campaigns}
        isEditMode={isEditMode}
        selectedNotes={selectedNotes}
        setSelectedNotes={setSelectedNotes}
      />
      {notes.length > 0 && (
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

export default Notes;
