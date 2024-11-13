import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  orderBy,
  getDoc,
} from "firebase/firestore";
import { db, auth } from "./firebaseConfig";
import { Note } from "../types/note";
import { FirebaseError } from "firebase/app";

const COLLECTION_NAME = "notes";

// Handle Firebase errors
const handleFirebaseError = (error: unknown) => {
  if (error instanceof FirebaseError) {
    switch (error.code) {
      case "permission-denied":
        throw new Error("You do not have permission to perform this action");
      case "unavailable":
        throw new Error(
          "Service is currently unavailable. Please try again later."
        );

      default:
        throw new Error("An unknown error occurred");
    }
  }
  throw error;
};

export const noteService = {
  // Fetch notes from Firestore
  async fetchNotes(characterId?: string, sortBy?: string): Promise<Note[]> {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) return [];

      let q;
      if (characterId) {
        q = query(
          collection(db, COLLECTION_NAME),
          where("userId", "==", userId),
          where("characterId", "==", characterId)
        );
      } else {
        q = query(
          collection(db, COLLECTION_NAME),
          where("userId", "==", userId)
        );
      }

      if (sortBy) {
        q = query(q, orderBy(sortBy));
      }

      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(
        (doc) =>
          ({
            ...doc.data(),
            id: doc.id,
          } as Note)
      );
    } catch (error) {
      handleFirebaseError(error);
      return [];
    }
  },

  // Fetch a single note by ID
  async fetchNoteById(id: string): Promise<Note> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { ...docSnap.data(), id: docSnap.id } as Note;
      } else {
        throw new Error("Note not found");
      }
    } catch (error) {
      handleFirebaseError(error);
      throw error;
    }
  },

  // Add a new note to Firestore
  async addNote(note: Omit<Note, "id">): Promise<string> {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) throw new Error("User not authenticated");

      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...note,
        userId,
        campaignName: note.campaignName,
      });
      return docRef.id;
    } catch (error) {
      handleFirebaseError(error);
      throw error;
    }
  },

  // Update an existing note in Firestore
  async updateNote(id: string, note: Partial<Note>): Promise<void> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, {
        ...note,
        campaignName: note.campaignName,
      });
    } catch (error) {
      handleFirebaseError(error);
      throw error;
    }
  },

  // Delete a note from Firestore
  async deleteNote(id: string): Promise<void> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await deleteDoc(docRef);
    } catch (error) {
      handleFirebaseError(error);
      throw error;
    }
  },
};
