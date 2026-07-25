import { createContext, useContext, useEffect, useState } from "react";
import {
  getCurrentUser,
  loginWithEmail,
  logout,
} from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = getCurrentUser();

    if (currentUser) {
      setUser(currentUser);
    }

    setLoading(false);
  }, []);

  async function login(email) {
    const result = await loginWithEmail(email);

    if (result.success) {
      setUser(result.user);
    }

    return result;
  }

  function signOut() {
    logout();
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signOut,
        isLoggedIn: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}