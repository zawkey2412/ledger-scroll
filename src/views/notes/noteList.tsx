import React, { useState, useEffect } from "react";
import useNoteStore from "../../store/useNoteStore";
import { Note, NoteListProps } from "../../types/note";
import NoteForm from "./noteForm";
import ConfirmationModal from "../../components/confirmationModal";
import NoteDetail from "./noteDetail";
import NoteCard from "./noteCard";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";

const NoteList: React.FC<NoteListProps> = ({
  characterId,
  sortBy,
  showAsField,
  campaignNames,
  isEditMode,
  selectedNotes,
  setSelectedNotes,
}) => {
  // Fetch notes and delete note functions from the store
  const { notes, fetchNotes, deleteNote } = useNoteStore();
  // State variables for editing note, form open state, confirmation modal state, note to delete, and selected note
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState<string | null>(null);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  // Fetch notes when characterId or sortBy changes
  useEffect(() => {
    fetchNotes(characterId, sortBy);
  }, [characterId, sortBy, fetchNotes]);

  // Handle edit note
  const handleEdit = (note: Note) => {
    setEditingNote(note);
    setIsFormOpen(true);
  };

  // Handle delete note
  const handleDelete = (id: string) => {
    setNoteToDelete(id);
    setIsConfirmationOpen(true);
  };

  // Confirm delete note
  const handleConfirmDelete = () => {
    if (noteToDelete) {
      deleteNote(noteToDelete);
      toast.success("Note banished successfully.", {
        style: {
          background: "#433D8B",
          color: "#fff",
        },
      });
      setNoteToDelete(null);
    }
    setIsConfirmationOpen(false);
  };

  // Handle add note
  const handleAddNote = () => {
    setEditingNote(null);
    setIsFormOpen(true);
  };

  // Handle note click
  const handleNoteClick = (note: Note) => {
    if (isEditMode) {
      handleCheckboxChange(note.id);
    } else {
      setSelectedNote(note);
    }
  };

  // Handle checkbox change
  const handleCheckboxChange = (id: string) => {
    setSelectedNotes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // Categorize notes by campaign name
  const categorizedNotes = notes.reduce((acc: { [key: string]: Note[] }, note) => {
    const category = note.campaignName || "Misc";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(note);
    return acc;
  }, {});

  // Sort categories
  const sortedCategories = Object.keys(categorizedNotes).sort((a, b) => {
    if (sortBy === "campaign") {
      if (a === "Misc") return 1;
      if (b === "Misc") return -1;
      return a.localeCompare(b);
    }
    return 0;
  });

  // Sort notes by recent date
  if (sortBy === "recent") {
    notes.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  return (
    <div>
      {notes.length === 0 ? (
        <div className="flex justify-center items-center h-full">
          <button
            onClick={handleAddNote}
            className="text-green-500 p-4 rounded-full mb-4 hover:text-green-700 flex items-center"
          >
            <FaPlus size={24} />
            <span className="ml-2">Add Note</span>
          </button>
        </div>
      ) : (
        <>
          <button
            onClick={handleAddNote}
            className="text-green-500 p-4 rounded-full mb-4 hover:text-green-700 flex items-center"
          >
            <FaPlus size={24} />
            <span className="ml-2">Add Note</span>
          </button>
          {sortedCategories.map((category) => (
            <div key={category}>
              <h4 className="text-lg font-bold mb-2">{category}</h4>
              <div className="space-y-4">
                {categorizedNotes[category].map((note) => (
                  <NoteCard
                    key={note.id}
                    note={note}
                    isEditMode={isEditMode}
                    isSelected={selectedNotes.has(note.id)}
                    onCheckboxChange={() => handleCheckboxChange(note.id)}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onClick={() => handleNoteClick(note)}
                  />
                ))}
              </div>
            </div>
          ))}
        </>
      )}
      {isFormOpen && (
        <NoteForm
          note={editingNote}
          characterId={characterId || ""}
          onClose={() => setIsFormOpen(false)}
          showAsField={showAsField}
          campaignNames={campaignNames}
        />
      )}
      {isConfirmationOpen && (
        <ConfirmationModal
          message="Are you sure you want to delete this note?"
          onConfirm={handleConfirmDelete}
          onCancel={() => setIsConfirmationOpen(false)}
        />
      )}
      {selectedNote && (
        <NoteDetail note={selectedNote} onClose={() => setSelectedNote(null)} />
      )}
    </div>
  );
};

export default NoteList;
