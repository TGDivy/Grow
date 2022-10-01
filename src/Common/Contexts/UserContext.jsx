import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import addUser from "../Firestore/addUser";
import useTaskStore from "../Stores/TaskStore";

export const CurrentUserContext = React.createContext();

export const CurrentUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [once, setOnce] = useState(false);
  const auth = getAuth();
  const setUserID = useTaskStore((state) => state.setUserID);

  onAuthStateChanged(auth, (user) => {
    if (user && !once) {
      console.log("auth state changed", user);
      addUser(user)
        .then((userData) => {
          setUser(userData);
          setUserID(userData.uid);
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
