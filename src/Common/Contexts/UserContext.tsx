import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import addUser from "../Firestore/addUser";
import useTaskStore from "../Stores/TaskStore";
import useWorkoutStore from "../Stores/WorkoutStore";
import useActivityStore from "../Stores/ActivityStore";
import useJournalStore from "../Stores/JournalStore";
import useTimerRecordsStore from "../Stores/TimerRecordsStore";
import useUserStore from "../Stores/User";
import { userType } from "../Types/Types";

export const CurrentUserContext = React.createContext(
  {} as {
    user: userType | null;
    setUser: React.Dispatch<React.SetStateAction<userType | null>>;
  }
);

export const CurrentUserProvider = ({ children }: any) => {
  const [user, setUser] = useState<userType | null>(null);
  const [once, setOnce] = useState(false);
  const auth = getAuth();
  const setUserID = useTaskStore((state) => state.setUserID);
  const setWorkoutUserID = useWorkoutStore((state) => state.setUserId);
  const setActivityUserID = useActivityStore((state) => state.setUserId);
  const setJournalUserID = useJournalStore((state) => state.setUserId);
  const setTimerRecordsUserID = useTimerRecordsStore(
    (state) => state.setUserId
  );
  const setUserStore = useUserStore((state) => state.setUser);

  onAuthStateChanged(auth, (user: any) => {
    if (user && !once) {
      // console.log("auth state changed", user);
      addUser(user).then((userData) => {
        setUser(userData as userType);
        setUserID(userData.uid);
        setWorkoutUserID(userData.uid);
        setActivityUserID(userData.uid);
        setJournalUserID(userData.uid);
        setTimerRecordsUserID(userData.uid);
        setUserStore(userData as userType);
        setOnce(true);
      });
    } else if (!user && !once) {
      setUser(null);
      setUserID("");
      setWorkoutUserID("");
      setActivityUserID("");
      setJournalUserID("");
      setTimerRecordsUserID("");
      setOnce(false);
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
