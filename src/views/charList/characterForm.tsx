import { Character, CharacterFormProps } from "../../types/character";
import CTAButton from "../../components/CTAButton";
import { useState } from "react";
import { Formik, Form } from "formik";
import { v4 as uuidv4 } from "uuid";
import { motion } from "framer-motion";
import useCharacterStore from "../../store/useCharacterStore";
import CharacterFormFields from "./characterFormFields";
import CharacterImageField from "./characterImageField";
import characterValidationSchema from "../../utils/validationSchemas";
import toast from "react-hot-toast";
import { createPortal } from "react-dom";
import ConfirmationModal from "../../components/confirmationModal";

const CharacterForm: React.FC<CharacterFormProps> = ({
  character,
  onClose,
}) => {
  const { addCharacter, editCharacter } = useCharacterStore();
  const [imagePreview, setImagePreview] = useState<string>(
    character?.image || ""
  );
  const [showImageInput, setShowImageInput] = useState<boolean>(
    !character?.image
  );
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [formValues, setFormValues] = useState<Character | null>(null);

  // Handle image link change and update the preview
  const handleImageLinkChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (
      field: string,
      value: string,
      shouldValidate?: boolean
    ) => void
  ) => {
    const imageUrl = event.target.value;
    setImagePreview(imageUrl);
    setFieldValue("image", imageUrl, false);
    setShowImageInput(false);
  };

  // Remove image and reset the preview
  const handleRemoveImage = (
    setFieldValue: (
      field: string,
      value: string,
      shouldValidate?: boolean
    ) => void
  ) => {
    setImagePreview("");
    setFieldValue("image", "", false);
    setShowImageInput(true);
  };

  // Handle form submission and open confirmation modal
  const handleFormSubmit = (values: Character) => {
    setFormValues(values);
    setIsConfirmationOpen(true);
  };

  // Confirm form submission and add/edit character
  const handleConfirmSubmit = async () => {
    if (!formValues) return;

    const characterData = {
      ...formValues,
    };

    if (character) {
      await editCharacter(formValues.id, characterData);
      toast.success("Character updated successfully.");
    } else {
      await addCharacter(characterData);
      toast.success("Character added successfully.");
    }
    setIsConfirmationOpen(false);
    onClose();
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
          className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.8 }}
        >
          <h2 className="text-2xl font-bold mb-4">
            {character ? "Edit Character" : "Add Character"}
          </h2>
          <Formik
            initialValues={{
              id: character?.id || uuidv4(),
              name: character?.name || "",
              image: character?.image || "",
              race: character?.race || "",
              class: character?.class || "",
              subclass: character?.subclass || "",
              background: character?.background || "",
              backstory: character?.backstory || "",
              userId: character?.userId || "",
              campaigns: character?.campaigns || [],
            }}
            validationSchema={characterValidationSchema}
            onSubmit={(values, { resetForm }) => {
              handleFormSubmit(values);
              resetForm();
            }}
          >
            {({ setFieldValue }) => (
              <Form className="space-y-3">
                <CharacterImageField
                  imagePreview={imagePreview}
                  showImageInput={showImageInput}
                  handleImageLinkChange={handleImageLinkChange}
                  handleRemoveImage={handleRemoveImage}
                  setFieldValue={setFieldValue}
                />
                <CharacterFormFields />
                <div className="flex justify-end items-center gap-4 pt-6 border-t">
                  <span
                    onClick={onClose}
                    className="cursor-pointer my-auto text-gray-500 hover:text-red-500"
                  >
                    Cancel
                  </span>
                  <CTAButton
                    to="#"
                    text={character ? "Update Character" : "Add Character"}
                    fromColor="from-blue-500"
                    toColor="to-blue-700"
                    hoverFromColor="hover:from-blue-600"
                    hoverToColor="hover:to-blue-700"
                    type="submit"
                  />
                </div>
              </Form>
            )}
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

export default CharacterForm;
