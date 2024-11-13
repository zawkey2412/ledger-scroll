import LoginForm from "./loginForm";
import AnimatedContainer from "../../components/animatedContainer";

const Login: React.FC = () => {
  return (
    <AnimatedContainer>
      {/* Page title */}
      <h1 className="text-3xl lg:text-4xl font-bold text-center my-3 text-gray-800 tracking-wide">
        SIGN IN
      </h1>
      {/* Login form */}
      <LoginForm />
    </AnimatedContainer>
  );
};

export default Login;
