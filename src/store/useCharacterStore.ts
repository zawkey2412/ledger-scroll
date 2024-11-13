import { create } from "zustand";
import { characterService } from "../services/characterService";
import { Character } from "../types/character";

interface CharacterStore {
  characters: Character[];
  fetchCharacters: () => Promise<void>;
  addCharacter: (character: Character) => Promise<void>;
  editCharacter: (
    id: string,
    updatedCharacter: Partial<Character>
  ) => Promise<void>;
  deleteCharacter: (id: string) => Promise<void>;
}

const useCharacterStore = create<CharacterStore>((set) => ({
  // Initial state
  characters: [],
  
  // Fetch characters from the service and update the state
  fetchCharacters: async () => {
    const characters = await characterService.fetchCharacters();
    set({ characters });
  },
  
  // Add a new character and update the state
  addCharacter: async (character) => {
    const id = await characterService.addCharacter(character);
    set((state) => ({
      characters: [...state.characters, { ...character, id }],
    }));
  },
  
  // Edit an existing character and update the state
  editCharacter: async (id, updatedCharacter) => {
    await characterService.updateCharacter(id, updatedCharacter);
    set((state) => ({
      characters: state.characters.map((character) =>
        character.id === id ? { ...character, ...updatedCharacter } : character
      ),
    }));
  },
  
  // Delete a character and update the state
  deleteCharacter: async (id) => {
    await characterService.deleteCharacter(id);
    set((state) => ({
      characters: state.characters.filter((character) => character.id !== id),
    }));
  },
}));

export default useCharacterStore;
