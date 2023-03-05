import React from "react";
import BottomNavigationBar from "./BottomNavigationBar";
import useCurrentUser from "./Common/Contexts/UserContext";
import HomeMain from "./Home/HomeOld";
import LoginPage from "./Login/LoginPage";
import SeedMain from "./Seed/SeedMain";
import StatsMain from "./Stats2/StatsMain";
import TasksMain from "./Tasks/TasksMain";
import SettingMain from "./Setting/SettingMain";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import JournalMain from "./Journal/JournalMain";
import AnonToLogin from "./Login/AnonToLogin";

import useActivityStore from "./Common/Stores/ActivityStore";
import useJournalStore from "./Common/Stores/JournalStore";
import useTaskStore from "./Common/Stores/TaskStore";
import useTimerRecordsStore from "./Common/Stores/TimerRecordsStore";
import useWorkoutStore from "./Common/Stores/WorkoutStore";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import getTheme from "./Common/Styling/themes";
import useThemeStore from "./Common/Stores/ThemeStore";
import useTimerStore from "./Common/Stores/TimerStore";
import { getFirebaseToken } from "./Common/Firestore/firebase-config";
import useUserStore from "./Common/Stores/User";

const App = () => {
  const { user } = useCurrentUser();
  const [initialPath, setInitialPath] = React.useState("/");
  const location = useLocation();

  const fetchWorkouts = useWorkoutStore((state) => state.fetchWorkouts);
  const fetchTimerRecords = useTimerRecordsStore(
    (state) => state.addLatestTimerRecord
  );
  const fetchJournalEntries = useJournalStore((state) => state.fetchDocuments);
  const fetchActivities = useActivityStore((state) => state.fetchActivities);
  const fetchTasks = useTaskStore((state) => state.fetchNewDocs);
  const fetchTimer = useTimerStore((state) => state.syncTimer);

  const addDevice = useUserStore((state) => state.addDevice);

  const getPushToken = (pushToken: string) => {
    const device = {
      pushToken: pushToken,
      device: navigator.userAgent,
    };
    addDevice(device);
  };

  React.useEffect(() => {
    if (location.pathname !== "/") {
      setInitialPath(location.pathname);
    }
    fetchActivities();
    fetchWorkouts();
    fetchTimerRecords();
    fetchJournalEntries();
    fetchTasks();
  }, []);

  React.useEffect(() => {
    if (user?.uid) {
      fetchActivities();
      fetchWorkouts();
      fetchTimerRecords();
      fetchJournalEntries();
      fetchTimer(user?.uid);
      getFirebaseToken(getPushToken);
    }
  }, [user]);

  const routes = () => {
    return (
      <>
        <Route
          path="/Login"
          element={user ? <Navigate to={initialPath} /> : <LoginPage />}
        />
        <Route path="/Anon" element={<AnonToLogin />} />
        <Route
          path="/"
          element={user ? <HomeMain /> : <Navigate to="/Login" />}
        />
        <Route
          path="*"
          element={user ? <HomeMain /> : <Navigate to="/Login" />}
        />
        <Route
          path="/Settings"
          element={user ? <SettingMain /> : <Navigate to="/Login" />}
        />
        <Route
          path="/Tasks"
          element={user ? <TasksMain /> : <Navigate to="/Login" />}
        />
        <Route
          path="/Seed"
          element={user ? <SeedMain /> : <Navigate to="/Login" />}
        />
        <Route
          path="/Statistics"
          element={user ? <StatsMain /> : <Navigate to="/Login" />}
        />
        <Route
          path="/Reflect"
          element={user ? <JournalMain /> : <Navigate to="/Login" />}
        />
      </>
    );
  };

  const colors = useThemeStore((state) => state.colors);
  const mode = useThemeStore((state) => state.mode);

  if (!colors) {
    return <div>Loading...</div>;
  }

  return (
    <ThemeProvider theme={getTheme(colors, mode)}>
      <CssBaseline />
      <div style={{ marginBottom: 80 }}>
        <Routes>{routes()}</Routes>
      </div>
      <BottomNavigationBar />
    </ThemeProvider>
  );
};

export default App;