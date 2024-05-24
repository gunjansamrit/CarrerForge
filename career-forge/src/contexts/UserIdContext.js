import React, { createContext, useContext, useState, useEffect } from "react";

const UserIdContext = createContext();

export const useUserIdContext = () => {
  return useContext(UserIdContext);
};

export const UserIdContextProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    const storedData = localStorage.getItem("userData");
    return storedData ? JSON.parse(storedData) : null;
  });

  const [token, setToken] = useState(() => {
    const storedToken = localStorage.getItem("userToken");
    return storedToken ? storedToken : "";
  });

  const [roleId, setRoleId] = useState(() => {
    const storedToken = localStorage.getItem("userRoleId");
    return storedToken ? storedToken : "";
  });

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const getUserToken = (token) => {
    setToken(token);
  };

  const getUserId = (id) => {
    setData(id);
  };

  const getRoleId = (roleId) => {
    setRoleId(roleId);
  };

  // const getIsUserLoggedIn =(isLoggedIn) => {
  //   setIsUserLoggedIn(isLoggedIn);
  // };

  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    localStorage.setItem("userToken", token);
  }, [token]);

  return (
    <UserIdContext.Provider
      value={{
        data,
        getUserId,
        token,
        getUserToken,
        isUserLoggedIn,
        setIsUserLoggedIn,
        roleId,
        setRoleId,
      }}
    >
      {children}
    </UserIdContext.Provider>
  );
};
