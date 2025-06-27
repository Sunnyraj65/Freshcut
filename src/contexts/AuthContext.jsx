import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  // load token from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("jwtToken");
    if (stored) setToken(stored);
  }, []);

  const login = (jwt) => {
    setToken(jwt);
    localStorage.setItem("jwtToken", jwt);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("jwtToken");
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
