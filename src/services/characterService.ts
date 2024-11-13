import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  getDoc,
} from "firebase/firestore";
import { db, auth } from "./firebaseConfig";
import { Character } from "../types/character";
import { FirebaseError } from "firebase/app";

const COLLECTION_NAME = "characters";

// Handle Firebase errors
const handleFirebaseError = (error: unknown) => {
  if (error instanceof FirebaseError) {
    if (error.code === "permission-denied") {
      throw new Error("You do not have permission to perform this action");
    }
  }
  throw error;
};

export const characterService = {
  // Fetch all characters for the current user
  async fetchCharacters(): Promise<Character[]> {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) return [];

      const q = query(
        collection(db, COLLECTION_NAME),
        where("userId", "==", userId)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(
        (doc) =>
          ({
            ...doc.data(),
            id: doc.id,
          } as Character)
      );
    } catch (error) {
      handleFirebaseError(error);
      return [];
    }
  },

  // Add a new character
  async addCharacter(character: Omit<Character, "id">): Promise<string> {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) throw new Error("User not authenticated");

      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...character,
        userId,
        campaigns: character.campaigns || [],
      });
      return docRef.id;
    } catch (error) {
      handleFirebaseError(error);
      throw error;
    }
  },

  // Update an existing character by ID
  async updateCharacter(
    id: string,
    character: Partial<Character>
  ): Promise<void> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, character);
    } catch (error) {
      handleFirebaseError(error);
      throw error;
    }
  },

  // Delete a character by ID
  async deleteCharacter(id: string): Promise<void> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await deleteDoc(docRef);
    } catch (error) {
      handleFirebaseError(error);
      throw error;
    }
  },

  // Fetch a single character by ID
  async fetchCharacterById(id: string): Promise<Character> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { ...docSnap.data(), id: docSnap.id } as Character;
      } else {
        throw new Error("Character not found");
      }
    } catch (error) {
      handleFirebaseError(error);
      throw error;
    }
  },
};
