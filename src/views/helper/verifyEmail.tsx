import CTAButton from "../../components/CTAButton";

const VerifyEmail: React.FC = () => {
  return (
    // Container for the entire view
    <div className="min-h-screen flex flex-col items-center justify-center bg-primary text-black p-4">
      {/* Card container */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* Title */}
        <h1 className="text-4xl font-bold drop-shadow-lg text-center mb-6">
          Verify Your Email
        </h1>
        {/* Instruction text */}
        <p className="text-lg text-center mb-4">
          Please check your email and click on the verification link to verify
          your account.
        </p>
        {/* Button to go back to login */}
        <div className="flex justify-center items-center">
          <CTAButton
            to="/login"
            text="Back to Login"
            fromColor="from-blue-500"
            toColor="to-purple-500"
            hoverFromColor="hover:from-blue-600"
            hoverToColor="hover:to-purple-600"
          />
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
