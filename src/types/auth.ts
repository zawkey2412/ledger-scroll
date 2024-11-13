import { User } from "firebase/auth";

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (
    email: string,
    password: string,
    stayLoggedIn: boolean
  ) => Promise<void>;
  loginWithGoogle: (stayLoggedIn: boolean) => Promise<void>;
  loginWithTwitter: (stayLoggedIn: boolean) => Promise<void>;
  loginWithGithub: (stayLoggedIn: boolean) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isEmailVerified: () => boolean;
  resetPassword: (email: string) => Promise<void>;
}
