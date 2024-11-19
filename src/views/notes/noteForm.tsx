import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { v4 as uuidv4 } from "uuid";
import { motion } from "framer-motion";
import useNoteStore from "../../store/useNoteStore";
import { Note } from "../../types/note";
import CTAButton from "../../components/CTAButton";
import ConfirmationModal from "../../components/confirmationModal";
import { createPortal } from "react-dom";
import toast from "react-hot-toast";
import { characterService } from "../../services/characterService";
import { Character } from "../../types/character";
import { NoteFormProps } from "../../types/note";
import NoteFormFields from "./noteFormFields";
import { noteValidationSchema } from "../../utils/validationSchemas";

const NoteForm: React.FC<NoteFormProps> = ({
  note,
  characterId,
  onClose,
  showAsField,
  campaignNames,
}) => {
  // State management for the form
  const { addNote, editNote } = useNoteStore();
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [formValues, setFormValues] = useState<Note | null>(null);
  const [characterName, setCharacterName] = useState<string>("");
  const [characters, setCharacters] = useState<Character[]>([]);
  const [filteredCampaignNames, setFilteredCampaignNames] = useState<string[]>(
    campaignNames
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch character name and list of characters on component mount
  useEffect(() => {
    const fetchCharacterName = async () => {
      if (characterId) {
        const character = await characterService.fetchCharacterById(
          characterId
        );
        setCharacterName(character.name);
      }
    };

    const fetchCharacters = async () => {
      const characters = await characterService.fetchCharacters();
      setCharacters(characters);
    };

    fetchCharacterName();
    fetchCharacters();
  }, [characterId]);

  // Handle form submission
  const handleFormSubmit = (values: Omit<Note, "characterId">) => {
    setFormValues({ ...values, characterId: characterId || "" });
    setIsConfirmationOpen(true);
  };

  // Confirm form submission
  const handleConfirmSubmit = async () => {
    if (!formValues) return;
    setIsSubmitting(true);

    const noteWithCharacterId = {
      ...formValues,
      characterId: characterId || "",
    };

    if (note) {
      await editNote(noteWithCharacterId.id, noteWithCharacterId);
      toast.success("Note updated successfully.", {
        style: {
          background: "#433D8B",
          color: "#fff",
        },
      });
    } else {
      await addNote(noteWithCharacterId);
      toast.success("Note added successfully.", {
        style: {
          background: "#433D8B",
          color: "#fff",
        },
      });
    }
    setIsSubmitting(false);
    setIsConfirmationOpen(false);
    onClose();
  };

  // Handle character name change and filter campaign names accordingly
  const handleCharacterNameChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedCharacterName = e.target.value;
    setCharacterName(selectedCharacterName);
    const selectedCharacter = characters.find(
      (character) => character.name === selectedCharacterName
    );
    if (selectedCharacter) {
      setFilteredCampaignNames(selectedCharacter.campaigns || []);
    } else {
      setFilteredCampaignNames([]);
    }
  };

  return createPortal(
    <>
      <motion.div
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md max-h-[85vh] md:max-h-[95vh] flex flex-col overflow-hidden"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.8 }}
        >
          <h2 className="text-2xl font-bold mb-4">
            {note ? "Edit Note" : "Add Note"}
          </h2>
          <Formik
            initialValues={{
              id: note?.id || uuidv4(),
              title: note?.title || "",
              date: note?.date || "",
              content: note?.content || "",
              characterName: characterName || "",
              campaignName: note?.campaignName || "",
            }}
            validationSchema={noteValidationSchema}
            enableReinitialize
            onSubmit={(values, { resetForm }) => {
              handleFormSubmit(values);
              resetForm();
            }}
          >
            <Form className="space-y-3 px-2 flex-grow overflow-y-auto">
              <NoteFormFields
                showAsField={showAsField}
                characters={characters}
                filteredCampaignNames={filteredCampaignNames}
                handleCharacterNameChange={handleCharacterNameChange}
              />
              <div className="flex justify-end items-center gap-4 pt-6 pb-2 border-t">
                <span
                  onClick={onClose}
                  className="cursor-pointer my-auto text-gray-500 hover:text-red-500"
                >
                  Cancel
                </span>
                <CTAButton
                  to="#"
                  text={
                    isSubmitting
                      ? note
                        ? "Updating..."
                        : "Creating..."
                      : note
                      ? "Update Note"
                      : "Add Note"
                  }
                  fromColor="bg-primary"
                  toColor="bg-secondary"
                  hoverFromColor="hover:bg-accent"
                  hoverToColor="hover:bg-highlight"
                  type="submit"
                  disabled={isSubmitting}
                />
              </div>
            </Form>
          </Formik>
        </motion.div>
      </motion.div>
      {isConfirmationOpen && (
        <ConfirmationModal
          message="Are you sure you want to submit this form?"
          onConfirm={handleConfirmSubmit}
          onCancel={() => setIsConfirmationOpen(false)}
        />
      )}
    </>,
    document.body
  );
};

export default NoteForm;
