import { auth } from "../../services/firebaseConfig";
import { signOut, AuthError } from "firebase/auth";
import { FirebaseErrors } from "../../utils/FirebaseErrors";
import { AuthState } from "../../types/auth";

type SetState = (state: Partial<AuthState>) => void;

// Log out the current user
export const logout = async (set: SetState) => {
  set({ loading: true, error: null });
  try {
    await signOut(auth);
    set({ user: null, loading: false });
  } catch (error) {
    const authError = error as AuthError;
    set({ loading: false });
    throw new Error(FirebaseErrors(authError.code));
  }
};
