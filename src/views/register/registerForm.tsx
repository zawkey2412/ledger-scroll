import React, { useState } from "react";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";
import FormField from "../../components/formField";
import { registerValidationSchema } from "../../utils/validationSchemas";
import CTAButton from "../../components/CTAButton";
import toast from "react-hot-toast";
import ConfirmationModal from "../../components/confirmationModal";

const RegisterForm: React.FC = () => {
  // Initial form values
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  // Extract register function and loading state from the auth store
  const { register, loading } = useAuthStore();
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formValues, setFormValues] = useState(initialValues);

  // Handle form submission
  const handleSubmit = async (values: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    setFormValues(values);
    setShowConfirmation(true); // Show confirmation modal
  };

  // Handle confirmation from the modal
  const handleConfirm = async () => {
    setShowConfirmation(false);
    try {
      await register(formValues.name, formValues.email, formValues.password);
      toast.success("Your name is now inscribed in the guild's tome!");
      navigate("/"); // Navigate to home page on success
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("The inscription ritual failed");
      }
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={registerValidationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="flex flex-col items-center text-sm text-black w-full max-w-md mx-auto py-4 px-1 md:py-6 md:px-2 rounded-lg">
          {/* Form fields for user input */}
          <FormField name="name" type="text" placeholder="Name" />
          <FormField name="email" type="email" placeholder="Email" />
          <FormField name="password" type="password" placeholder="Password" />
          <FormField
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
          />
          <div className="mt-6">
            {/* Submit button */}
            <CTAButton
              to="#"
              text={loading ? "Registering..." : "Register"}
              fromColor="from-green-600"
              toColor="to-green-400"
              hoverFromColor="hover:from-green-700"
              hoverToColor="hover:to-green-500"
              onClick={() => {}}
              type="submit"
              disabled={loading}
            />
          </div>
          {/* Link to login page */}
          <a
            href="/login"
            className="text-gray-800 text-center hover:text-blue-800 mt-4"
          >
            Already have an account? Sign In
          </a>
        </Form>
      </Formik>
      {/* Confirmation modal */}
      {showConfirmation && (
        <ConfirmationModal
          message="Is everything good?"
          onConfirm={handleConfirm}
          onCancel={() => setShowConfirmation(false)}
        />
      )}
    </>
  );
};

export default RegisterForm;
