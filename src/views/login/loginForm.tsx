import { useState, useCallback } from "react";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";
import FormField from "../../components/formField";
import { loginValidationSchema } from "../../utils/validationSchemas";
import CTAButton from "../../components/CTAButton";
import toast from "react-hot-toast";
import { FaGoogle, FaTwitter, FaGithub } from "react-icons/fa";

const LoginForm: React.FC = () => {
  // Extract authentication methods and loading state from the auth store
  const {
    login,
    loginWithGoogle,
    loginWithTwitter,
    loginWithGithub,
    loading,
  } = useAuthStore();
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };
  const [stayLoggedIn, setStayLoggedIn] = useState(false);

  // Handle form submission for email/password login
  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      await login(values.email, values.password, stayLoggedIn);
      toast.success("The guild welcomes your return!");
      navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Your scroll or sigil was rejected by the guild");
      }
    }
  };

  // Handle third-party login (Google, Twitter, GitHub)
  const handleThirdPartyLogin = useCallback(
    async (loginMethod: () => Promise<void>, provider: string) => {
      try {
        await loginMethod();
        toast.success(`${provider}'s magic grants you passage`);
        navigate("/");
      } catch {
        toast.error(`${provider}'s portal remains sealed`);
      }
    },
    [navigate]
  );

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={loginValidationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="flex flex-col items-center text-sm text-black w-full max-w-md mx-auto py-4 px-1 md:py-6 md:px-2 rounded-lg">
          {/* Email and password fields */}
          <FormField name="email" type="email" placeholder="Email" />
          <FormField name="password" type="password" placeholder="Password" />

          {/* Forgot password link */}
          <div className="flex justify-end w-full mb-4">
            <a
              href="/reset-password"
              className="text-blue-600 hover:text-blue-800"
            >
              Forgot Password?
            </a>
          </div>

          {/* Stay logged in checkbox */}
          <div className="flex items-center mb-4 w-full">
            <label
              htmlFor="stayLoggedIn"
              className="flex items-center text-gray-700 cursor-pointer"
              style={{ userSelect: "none" }}
            >
              <input
                type="checkbox"
                id="stayLoggedIn"
                name="stayLoggedIn"
                checked={stayLoggedIn}
                onChange={() => setStayLoggedIn(!stayLoggedIn)}
                className="mr-2"
              />
              Stay Logged In
            </label>
          </div>

          {/* Login button */}
          <div className="mt-6">
            <CTAButton
              to="#"
              text={loading ? "Logging in..." : "Login"}
              fromColor="from-blue-600"
              toColor="to-blue-400"
              hoverFromColor="hover:from-blue-700"
              hoverToColor="hover:to-blue-500"
              onClick={() => {}}
              type="submit"
              disabled={loading}
            />
          </div>

          {/* Third-party login buttons */}
          <div className="my-6 text-gray-600">or login with...</div>
          <div className="flex justify-center space-x-4">
            <button
              className="p-3 rounded-full bg-red-600 hover:bg-red-700 text-white"
              onClick={() =>
                handleThirdPartyLogin(
                  () => loginWithGoogle(stayLoggedIn),
                  "Google"
                )
              }
              disabled={loading}
            >
              <FaGoogle size={12} />
            </button>
            <button
              className="p-3 rounded-full bg-blue-400 hover:bg-blue-500 text-white"
              onClick={() =>
                handleThirdPartyLogin(
                  () => loginWithTwitter(stayLoggedIn),
                  "Twitter"
                )
              }
              disabled={loading}
            >
              <FaTwitter size={12} />
            </button>
            <button
              className="p-3 rounded-full bg-gray-800 hover:bg-gray-900 text-white"
              onClick={() =>
                handleThirdPartyLogin(
                  () => loginWithGithub(stayLoggedIn),
                  "GitHub"
                )
              }
              disabled={loading}
            >
              <FaGithub size={12} />
            </button>
          </div>

          {/* Link to registration page */}
          <a
            href="/register"
            className="text-gray-800 text-center hover:text-green-700 mt-4"
          >
            Already have an account? Sign up
          </a>
        </Form>
      </Formik>
    </>
  );
};

export default LoginForm;
