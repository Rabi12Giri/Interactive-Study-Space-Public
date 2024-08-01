/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';
import { getUserInfoFromCookie } from '../utils';

export const UserAuthContext = createContext({
  currentUser: {},
  setCurrentUser: () => null,
});

export const UserAuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(getUserInfoFromCookie());

  const value = {
    currentUser,
    setCurrentUser,
  };

  return (
    <UserAuthContext.Provider value={value}>
      {children}
    </UserAuthContext.Provider>
  );
};
