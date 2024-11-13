import { create } from "zustand";
import { auth } from "../services/firebaseConfig";
import { AuthState } from "../types/auth";
import { login } from "../store/authMethods/login";
import { register } from "../store/authMethods/register";
import { logout } from "../store/authMethods/logout";
import { resetPassword } from "../store/authMethods/resetPassword";
import { loginWithProvider } from "../store/authMethods/loginwithProvider";
import {
  GoogleAuthProvider,
  TwitterAuthProvider,
  GithubAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";

const useAuthStore = create<AuthState>((set) => ({
  // Initial state
  user: null,
  loading: true,
  error: null,
  
  // Login methods
  login: (email, password, stayLoggedIn) =>
    login(email, password, stayLoggedIn, set),
  loginWithGoogle: (stayLoggedIn) =>
    loginWithProvider(new GoogleAuthProvider(), stayLoggedIn, set),
  loginWithTwitter: (stayLoggedIn) =>
    loginWithProvider(new TwitterAuthProvider(), stayLoggedIn, set),
  loginWithGithub: (stayLoggedIn) =>
    loginWithProvider(new GithubAuthProvider(), stayLoggedIn, set),
  
  // Register method
  register: (name, email, password) => register(name, email, password, set),
  
  // Logout method
  logout: () => logout(set),
  
  // Reset password method
  resetPassword: (email) => resetPassword(email, set),
  
  // Check if email is verified
  isEmailVerified: () => auth.currentUser?.emailVerified ?? false,
}));

// Listen for authentication state changes
onAuthStateChanged(auth, (user) => {
  useAuthStore.setState({ user, loading: false });
});

export default useAuthStore;
