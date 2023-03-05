import React from "react";
import BottomNavigationBar from "./BottomNavigationBar";
import useCurrentUser from "./Common/Contexts/UserContext";
import HomeMain from "./Home/Home";
import LoginPage from "./Login/LoginPage";
import SeedMain from "./Seed/SeedMain";
import StatsMain from "./Stats2/StatsMain";
import TasksMain from "./Tasks/TasksMain";
import SettingMain from "./Setting/SettingMain";
import { TourProvider } from "@reactour/tour";
import { closeBtn } from "./steps";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import JournalMain from "./Journal/JournalMain";
import AnonToLogin from "./Login/AnonToLogin";
import AnonymousUser from "./Login/AnonymousUser";

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

function requestPermission() {
  console.log("Requesting permission...");
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification permission granted.");
    } else {
      console.log("Unable to get permission to notify.");
    }
  });
}

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

  React.useEffect(() => {
    if (location.pathname !== "/") {
      setInitialPath(location.pathname);
    }
    fetchActivities();
    fetchWorkouts();
    fetchTimerRecords();
    fetchJournalEntries();
    fetchTasks();
    if (!("Notification" in window)) {
      console.log("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
      console.log("Notification permission granted");
    } else if (Notification.permission !== "denied") {
      requestPermission();
    }
  }, []);

  React.useEffect(() => {
    if (user?.uid) {
      fetchActivities();
      fetchWorkouts();
      fetchTimerRecords();
      fetchJournalEntries();
      fetchTimer(user?.uid);
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
      <TourProvider
        styles={{
          popover: (base) => ({
            ...base,
            "--reactour-accent": "#ef5a3d",
            backgroundColor: colors.background,
            color: colors.text,
            borderRadius: 20,
          }),
          // maskArea: (base) => ({ ...base, rx: 2 }),
          // maskWrapper: (base) => ({ ...base, color: "#ef5a3d" }),
          badge: (base) => ({ ...base, left: "auto", right: "-0.8125em" }),
          // controls: (base) => ({ ...base, marginTop: 100 }),
          // close: (base) => ({ ...base, right: "auto", left: 8, top: 8 }),
        }}
        onClickMask={({ setCurrentStep, currentStep, steps, setIsOpen }) => {
          if (steps) {
            if (currentStep === steps.length - 1) {
              setIsOpen(false);
            } else {
              setCurrentStep((s) => (s === steps.length - 1 ? 0 : s + 1));
            }
          }
        }}
        scrollSmooth
        disableDotsNavigation
        components={{ Close: closeBtn }}
      >
        <div style={{ marginBottom: 80 }}>
          <Routes>{routes()}</Routes>
        </div>
      </TourProvider>
      <BottomNavigationBar />
    </ThemeProvider>
  );
};

export default App;
