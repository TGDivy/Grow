import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import addUser from "../Firestore/addUser";
import useTaskStore from "../Stores/TaskStore";
import useWorkoutStore from "../Stores/WorkoutStore";
import useActivityStore from "../Stores/ActivityStore";
import useJournalStore from "../Stores/JournalStore";
import useTimerRecordsStore from "../Stores/TimerRecordsStore";

export const CurrentUserContext = React.createContext();

export const CurrentUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [once, setOnce] = useState(false);
  const auth = getAuth();
  const setUserID = useTaskStore((state) => state.setUserID);
  const setWorkoutUserID = useWorkoutStore((state) => state.setUserId);
  const setActivityUserID = useActivityStore((state) => state.setUserId);
  const setJournalUserID = useJournalStore((state) => state.setUserId);
  const setTimerRecordsUserID = useTimerRecordsStore(
    (state) => state.setUserId
  );

  onAuthStateChanged(auth, (user) => {
    if (user && !once) {
      console.log("auth state changed", user);
      addUser(user)
        .then((userData) => {
          setUser(userData);
          setUserID(userData.uid);
          setWorkoutUserID(userData.uid);
          setActivityUserID(userData.uid);
          setJournalUserID(userData.uid);
          setTimerRecordsUserID(userData.uid);
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
