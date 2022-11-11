import React from "react";
import BottomNavigationBar from "./BottomNavigationBar";
import useCurrentUser from "./Common/Contexts/UserContext";
import HomeMain from "./Home/Home";
import LoginPage from "./Login/LoginPage";
import SeedMain from "./Seed/SeedMain";
import SoilMain from "./Soil/SoilMain";
import StatsMain from "./Stats/StatsMain";
import TasksMain from "./Tasks/TasksMain";
import SettingMain from "./Setting/SettingMain";

import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import JournalMain from "./Journal/JournalMain";
import AnonToLogin from "./Login/AnonToLogin";
import AnonymousUser from "./Login/AnonymousUser";

import useActivityStore from "./Common/Stores/ActivityStore";
import useJournalStore from "./Common/Stores/JournalStore";
import useTaskStore from "./Common/Stores/TaskStore";
import useTimerRecordsStore from "./Common/Stores/TimerRecordsStore";
import useWorkoutStore from "./Common/Stores/WorkoutStore";

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
    if (user) {
      fetchActivities();
      fetchWorkouts();
      fetchTimerRecords();
      fetchJournalEntries();
    }
  }, [user]);

  const routes = () => {
    return (
      <>
        <Route
          path="/Login"
          element={
            user ? (
              user.email ? (
                <Navigate to={initialPath} />
              ) : (
                <AnonToLogin />
              )
            ) : (
              <LoginPage />
            )
          }
        />
        <Route
          path="/"
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
          path="/Soil"
          element={user ? <SoilMain /> : <Navigate to="/Login" />}
        />
        <Route
          path="/Stats"
          element={user ? <StatsMain /> : <Navigate to="/Login" />}
        />
        <Route
          path="/Reflect"
          element={user ? <JournalMain /> : <Navigate to="/Login" />}
        />
      </>
    );
  };

  return (
    <>
      <div style={{ marginBottom: 80 }}>
        <Routes>{routes()}</Routes>
      </div>
      <BottomNavigationBar />
      <AnonymousUser />
    </>
  );
};

export default App;
