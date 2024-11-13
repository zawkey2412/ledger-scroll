import RegisterForm from "./registerForm";
import AnimatedContainer from "../../components/animatedContainer";

const Register: React.FC = () => {
  return (
    <AnimatedContainer>
      {/* Page title */}
      <h1 className="text-3xl lg:text-4xl font-bold text-center my-3 text-gray-800 tracking-wide">
        SIGN UP
      </h1>
      {/* Register form component */}
      <RegisterForm />
    </AnimatedContainer>
  );
};

export default Register;
