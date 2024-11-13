import { Character } from "./character";

export interface Note {
  id: string;
  characterId: string;
  title: string;
  date: string;
  content: string;
  campaignName?: string;
  characterName: string;
}

export interface NoteStore {
  notes: Note[];
  fetchNotes: (characterId?: string, sortBy?: string) => Promise<void>;
  addNote: (note: Note) => Promise<void>;
  editNote: (id: string, updatedNote: Partial<Note>) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
}

export interface NoteFormProps {
  note?: Note | null;
  characterId?: string;
  onClose: () => void;
  showAsField?: boolean;
  campaignNames: string[];
}

export interface NoteFormFieldsProps {
  showAsField?: boolean;
  characters: Character[];
  filteredCampaignNames: string[];
  handleCharacterNameChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export interface NoteListProps {
  characterId?: string;
  sortBy?: string;
  showAsField?: boolean;
  campaignNames: string[];
  isEditMode: boolean;
  selectedNotes: Set<string>;
  setSelectedNotes: React.Dispatch<React.SetStateAction<Set<string>>>;
}

export interface NoteCardProps {
  note: Note;
  isEditMode: boolean;
  isSelected: boolean;
  onCheckboxChange: () => void;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
  onClick: () => void;
}