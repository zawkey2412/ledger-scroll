import { auth } from "../../services/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  AuthError,
} from "firebase/auth";
import { AuthState } from "../../types/auth";
import { FirebaseErrors } from "../../utils/FirebaseErrors";

type SetState = (state: Partial<AuthState>) => void;

// Register a new user with email and password, update profile, and send verification email
export const register = async (
  name: string,
  email: string,
  password: string,
  set: SetState
) => {
  set({ loading: true, error: null });
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(userCredential.user, { displayName: name });
    await sendEmailVerification(userCredential.user);
    set({ user: userCredential.user, loading: false });
  } catch (error) {
    const authError = error as AuthError;
    set({ loading: false });
    throw new Error(FirebaseErrors(authError.code));
  }
};
