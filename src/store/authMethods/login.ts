import { auth } from "../../services/firebaseConfig";
import {
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  signInWithEmailAndPassword,
  AuthError,
} from "firebase/auth";
import { FirebaseErrors } from "../../utils/FirebaseErrors";
import { AuthState } from "../../types/auth";

type SetState = (state: Partial<AuthState>) => void;

// Log in with email and password, and set persistence based on stayLoggedIn flag
export const login = async (
  email: string,
  password: string,
  stayLoggedIn: boolean,
  set: SetState
) => {
  set({ loading: true, error: null });
  try {
    await setPersistence(
      auth,
      stayLoggedIn ? browserLocalPersistence : browserSessionPersistence
    );
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    set({ user: userCredential.user, loading: false });
  } catch (error) {
    const authError = error as AuthError;
    set({ loading: false });
    throw new Error(FirebaseErrors(authError.code));
  }
};
