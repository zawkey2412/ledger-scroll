import { Formik, Form } from "formik";
import useAuthStore from "../../store/useAuthStore";
import CTAButton from "../../components/CTAButton";
import FormField from "../../components/formField";
import toast from "react-hot-toast";
import { checkEmailExists } from "../../store/authMethods/resetPassword";
import { resetPasswordValidationSchema } from "../../utils/validationSchemas";
import AnimatedContainer from "../../components/animatedContainer";

const ResetPassword: React.FC = () => {
  const { resetPassword, loading, error } = useAuthStore();

  return (
    // Container with animation
    <AnimatedContainer showImageCarousel={false} size="small">
      {/* Title */}
      <h1 className="text-4xl font-bold text-center mb-6">Reset Password</h1>
      {/* Instruction text */}
      <p className="text-lg text-center mb-4">
        Enter your email address to receive a password reset link.
      </p>
      <Formik
        initialValues={{ email: "" }}
        validationSchema={resetPasswordValidationSchema}
        onSubmit={async (values) => {
          try {
            const emailExists = await checkEmailExists(values.email);
            if (!emailExists) {
              toast.error("This scroll is not recorded in our tomes");
              return;
            }

            await resetPassword(values.email);
            toast.success(
              "A new sigil scroll has been dispatched to your crystal. Check your email."
            );
          } catch (error) {
            if (error instanceof Error) {
              toast.error(error.message);
            } else {
              toast.error(
                "The arcane winds have disturbed our magic. Please try the ritual again when the moons align."
              );
            }
          }
        }}
      >
        {/* Form for email input */}
        <Form className="w-full">
          <FormField type="email" name="email" placeholder="Email" />
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {/* Submit button */}
          <div className="flex justify-center items-center">
            <CTAButton
              to="#"
              text={loading ? "Sending..." : "Send Reset Link"}
              fromColor="from-blue-500"
              toColor="to-blue-700"
              hoverFromColor="hover:from-blue-600"
              hoverToColor="hover:to-blue-700"
              type="submit"
              disabled={loading}
            />
          </div>
        </Form>
      </Formik>
      {/* Button to go back to login */}
      <div className="flex justify-center items-center mt-6">
        <CTAButton
          to="/login"
          text="Back to Login"
          fromColor="from-blue-500"
          toColor="to-purple-500"
          hoverFromColor="hover:from-blue-600"
          hoverToColor="hover:to-purple-600"
        />
      </div>
    </AnimatedContainer>
  );
};

export default ResetPassword;
