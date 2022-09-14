import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import addUser from "../firestore/addUser";

export const CurrentUserContext = React.createContext();

export const CurrentUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [once, setOnce] = useState(false);
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    console.log("auth state changed", user);
    if (user && !once) {
      addUser(user)
        .then((userData) => {
          setUser(userData);
          console.log("user data", userData);
          setOnce(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });

  return (
    <CurrentUserContext.Provider value={{ user, setUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

CurrentUserProvider.propTypes = {
  children: PropTypes.node,
};

const useCurrentUser = () => useContext(CurrentUserContext);

export default useCurrentUser;
