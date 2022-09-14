import React from "react";
import PropTypes from "prop-types";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const CurrentUserContext = React.createContext();

export const CurrentUserProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      console.log("user is signed in", uid);
      setUser(user);
    } else {
      // User is signed out
      // ...
    }
  });

  return (
    <CurrentUserContext.Provider value={{ user }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

CurrentUserProvider.propTypes = {
  children: PropTypes.node,
};

export const useCurrentUser = () => React.useContext(CurrentUserContext);
