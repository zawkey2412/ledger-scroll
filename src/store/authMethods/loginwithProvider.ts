import { auth } from "../../services/firebaseConfig";
import {
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  signInWithPopup,
  AuthError,
  AuthProvider,
} from "firebase/auth";
import { FirebaseErrors } from "../../utils/FirebaseErrors";
import { AuthState } from "../../types/auth";

type SetState = (state: Partial<AuthState>) => void;

// Log in with an external provider and set persistence based on stayLoggedIn flag
export const loginWithProvider = async (
  provider: AuthProvider,
  stayLoggedIn: boolean,
  set: SetState
) => {
  set({ loading: true, error: null });
  try {
    await setPersistence(
      auth,
      stayLoggedIn ? browserLocalPersistence : browserSessionPersistence
    );
    const result = await signInWithPopup(auth, provider);
    set({ user: result.user, loading: false });
  } catch (error) {
    const authError = error as AuthError;
    set({ loading: false });
    throw new Error(FirebaseErrors(authError.code));
  }
};
