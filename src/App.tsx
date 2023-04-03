import React from "react";
import { Routes, useLocation } from "react-router-dom";
import useCurrentUser from "./Common/Contexts/UserContext";

import useActivityStore from "./Common/Stores/ActivityStore";
import useJournalStore from "./Common/Stores/JournalStore";
import useTaskStore from "./Common/Stores/TaskStore";
import useTimerRecordsStore from "./Common/Stores/TimerRecordsStore";
// import useWorkoutStore from "./Common/Stores/WorkoutStore";

import { Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import { MainNavigationLinks, routes } from "./AppInput";
import useHabitsStore from "./Common/Stores/HabitsStore";
import useThemeStore from "./Common/Stores/ThemeStore";
import useTimerStore from "./Common/Stores/TimerStore";
import getTheme from "./Common/Styling/themes";
import NavigationRail from "./Elements/SideNavigationPanel/NavigationRail";
import useUserStore from "./Common/Stores/User";

const App = () => {
  const { user } = useCurrentUser();
  const [initialPath, setInitialPath] = React.useState("/");
  const location = useLocation();

  // const fetchWorkouts = useWorkoutStore((state) => state.fetchWorkouts);
  const fetchTimerRecords = useTimerRecordsStore(
    (state) => state.addLatestTimerRecord
  );
  const fetchJournalEntries = useJournalStore((state) => state.fetchDocuments);
  const fetchActivities = useActivityStore((state) => state.fetchActivities);
  const fetchTasks = useTaskStore((state) => state.fetchNewDocs);
  const fetchTimer = useTimerStore((state) => state.syncTimer);
  const fetchHabitEntries = useHabitsStore((state) => state.syncHabitEntries);
  const projectNames = useUserStore((state) => state.stickers);

  React.useEffect(() => {
    if (location.pathname !== "/") {
      setInitialPath(location.pathname);
    }
    fetchActivities();
    // fetchWorkouts();
    fetchTimerRecords();
    fetchJournalEntries();
    fetchTasks();
    fetchHabitEntries();
  }, []);

  React.useEffect(() => {
    if (user?.uid) {
      fetchActivities();
      // fetchWorkouts();
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
      <Box
        sx={{
          display: "flex",
          paddingLeft: "80px",
        }}
      >
        <NavigationRail links={MainNavigationLinks(projectNames)} />
        <Routes>{routes(user, initialPath)}</Routes>
      </Box>
    </ThemeProvider>
  );
};

export default App;
