import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  const logIn=(value)=>{
    setAuth(value)
  }
  const logOut=()=>{
    setAuth(null)
  }

  return (
    <AuthContext.Provider value={{ auth, setAuth, logOut, logIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth=()=>{
  return useContext(AuthContext)
}
