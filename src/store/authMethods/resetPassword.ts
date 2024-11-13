import { auth } from "../../services/firebaseConfig";
import { sendPasswordResetEmail, AuthError, fetchSignInMethodsForEmail } from "firebase/auth";
import { FirebaseErrors } from "../../utils/FirebaseErrors";
import { AuthState } from "../../types/auth";

type SetState = (state: Partial<AuthState>) => void;

// Check if the email exists in the authentication system
export const checkEmailExists = async (email: string): Promise<boolean> => {
  try {
    const methods = await fetchSignInMethodsForEmail(auth, email);
    return methods.length > 0;
  } catch (error) {
    const authError = error as AuthError;
    throw new Error(FirebaseErrors(authError.code));
  }
};

// Reset the password for the given email
export const resetPassword = async (email: string, set: SetState) => {
  set({ loading: true, error: null });
  try {
    await sendPasswordResetEmail(auth, email);
    set({ loading: false });
  } catch (error) {
    const authError = error as AuthError;
    set({ loading: false });
    throw new Error(FirebaseErrors(authError.code));
  }
};
