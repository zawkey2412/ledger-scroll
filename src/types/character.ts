export interface Character {
  id: string;
  name: string;
  image: string;
  class: string;
  race: string;
  subclass: string;
  background: string;
  backstory: string;
  userId: string;
  campaigns: string[];
}

export interface CharacterStore {
  characters: Character[];
  error: string | null;
  fetchCharacters: () => Promise<void>;
  addCharacter: (character: Character) => Promise<void>;
  editCharacter: (
    id: string,
    updatedCharacter: Partial<Character>
  ) => Promise<void>;
  deleteCharacter: (id: string) => Promise<void>;
}

export interface CharacterFormProps {
  character?: Character | null;
  onClose: () => void;
}


export interface CharacterImageFieldProps {
  imagePreview: string;
  showImageInput: boolean;
  handleImageLinkChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (
      field: string,
      value: string,
      shouldValidate?: boolean
    ) => void
  ) => void;
  handleRemoveImage: (
    setFieldValue: (
      field: string,
      value: string,
      shouldValidate?: boolean
    ) => void
  ) => void;
  setFieldValue: (
    field: string,
    value: string,
    shouldValidate?: boolean
  ) => void;
}