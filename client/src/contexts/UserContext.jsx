import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { disableNetwork } from "firebase/firestore";
import { db } from "../firebase-config";
import addUser from "../firestore/addUser";
import { doc, onSnapshot } from "firebase/firestore";

export const CurrentUserContext = React.createContext();

export const CurrentUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [once, setOnce] = useState(false);
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user && !once) {
      console.log("auth state changed", user);
      addUser(user)
        .then((userData) => {
          setUser(userData);
          setOnce(true);
          // disableNetwork(db);
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
