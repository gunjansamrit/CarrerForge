// LoginRoleContext.js
import React, { createContext, useContext, useState } from "react";
// import QuantityButton from './Quantity';
const LoginRoleContext = createContext();

export const useLoginRoleContext = () => {
  return useContext(LoginRoleContext);
};
export const LoginRoleContextProvider = ({ children }) => {
  const [who, setWho] = useState(() => {
    const storedData = localStorage.getItem("role");
    return storedData ? storedData : "";
  });

  const getRole = (role) => {
    setWho(role);
  };

  return (
    <LoginRoleContext.Provider value={{ who, getRole }}>
      {children}
    </LoginRoleContext.Provider>
  );
};
