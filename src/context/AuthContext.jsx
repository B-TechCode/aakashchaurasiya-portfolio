import { createContext, useContext, useEffect, useState } from "react";
import { getToken, saveToken, removeToken } from "../services/tokenService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(getToken());
  const [authenticated, setAuthenticated] = useState(!!getToken());

  useEffect(() => {
    const storedToken = getToken();

    if (storedToken) {
      setToken(storedToken);
      setAuthenticated(true);
    }
  }, []);

  const login = (jwtToken) => {
    saveToken(jwtToken);
    setToken(jwtToken);
    setAuthenticated(true);
  };

  const logout = () => {
    removeToken();
    setToken(null);
    setAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        authenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);