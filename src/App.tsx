import React from "react";
import { Routes, useLocation } from "react-router-dom";
import useCurrentUser from "./Common/Contexts/UserContext";
import BottomNavigationBar from "./Navigation/BottomNavigationBar";

import useActivityStore from "./Common/Stores/ActivityStore";
import useJournalStore from "./Common/Stores/JournalStore";
import useTaskStore from "./Common/Stores/TaskStore";
import useTimerRecordsStore from "./Common/Stores/TimerRecordsStore";
import useWorkoutStore from "./Common/Stores/WorkoutStore";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import { MainNavigationLinks, routes } from "./AppInput";
import useHabitsStore from "./Common/Stores/HabitsStore";
import useThemeStore from "./Common/Stores/ThemeStore";
import useTimerStore from "./Common/Stores/TimerStore";
import getTheme from "./Common/Styling/themes";
import NavigationRail from "./Elements/SideNavigationPanel/NavigationRail";
import LayoutExampleResponsive from "./Elements/SideNavigationPanel/LayoutExampleResponsive";
import MiniDrawerExample from "./Elements/SideNavigationPanel/MiniDrawerExample";
import { Box } from "@mui/material";

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
  const fetchHabitEntries = useHabitsStore((state) => state.syncHabitEntries);

  React.useEffect(() => {
    if (location.pathname !== "/") {
      setInitialPath(location.pathname);
    }
    fetchActivities();
    fetchWorkouts();
    fetchTimerRecords();
    fetchJournalEntries();
    fetchTasks();
    fetchHabitEntries();
  }, []);

  React.useEffect(() => {
    if (user?.uid) {
      fetchActivities();
      fetchWorkouts();
      fetchTimerRecords();
      fetchJournalEntries();
      fetchTimer(user?.uid);
      fetchTasks();
      fetchHabitEntries();
    } else {
      console.log("no user id no fetch");
    }
  }, [user]);

  const colors = useThemeStore((state) => state.colors);
  const mode = useThemeStore((state) => state.mode);

  if (!colors) {
    return <div>Loading...</div>;
  }

  return (
    <ThemeProvider theme={getTheme(colors, mode)}>
      <CssBaseline />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        theme="dark"
      />
      {/* <div style={{ marginBottom: 80 }}>
        
      </div> */}
      {/* <LayoutExampleResponsive /> */}
      {/* <MiniDrawerExample /> */}
      <Box
        sx={{
          display: "flex",
        }}
      >
        <NavigationRail links={MainNavigationLinks} />
        <Routes>{routes(user, initialPath)}</Routes>
      </Box>
    </ThemeProvider>
  );
};

export default App;
