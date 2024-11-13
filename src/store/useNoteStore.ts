import { create } from "zustand";
import { noteService } from "../services/noteService";
import { NoteStore } from "../types/note";

const useNoteStore = create<NoteStore>((set) => ({
  // Initial state
  notes: [],
  
  // Fetch notes from the service and update the state
  fetchNotes: async (characterId, sortBy) => {
    const notes = await noteService.fetchNotes(characterId, sortBy);
    set({ notes });
  },
  
  // Add a new note and update the state
  addNote: async (note) => {
    const id = await noteService.addNote(note);
    set((state) => ({
      notes: [...state.notes, { ...note, id }],
    }));
  },
  
  // Edit an existing note and update the state
  editNote: async (id, updatedNote) => {
    await noteService.updateNote(id, updatedNote);
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === id ? { ...note, ...updatedNote } : note
      ),
    }));
  },
  
  // Delete a note and update the state
  deleteNote: async (id) => {
    await noteService.deleteNote(id);
    set((state) => ({
      notes: state.notes.filter((note) => note.id !== id),
    }));
  },
}));

export default useNoteStore;
