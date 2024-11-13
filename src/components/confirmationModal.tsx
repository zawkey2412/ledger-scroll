import React from "react";
import { motion } from "framer-motion";
import CTAButton from "./CTAButton";

interface ConfirmationModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  message,
  onConfirm,
  onCancel,
}) => {
  return (
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
        <h2 className="text-xl font-bold mb-4">Confirmation</h2>
        <p className="mb-4">{message}</p>
        <div className="flex justify-end gap-4">
          <span
            onClick={onCancel}
            className="cursor-pointer text-gray-500 mt-3 hover:text-red-500"
          >
            Cancel
          </span>
          <CTAButton
            to="#"
            text="Confirm"
            fromColor="from-blue-500"
            toColor="to-blue-700"
            hoverFromColor="hover:from-blue-600"
            hoverToColor="hover:to-blue-700"
            onClick={onConfirm}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ConfirmationModal;
