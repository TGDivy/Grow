import React from "react";
import LoginPage from "./Login/LoginPage";
import useCurrentUser from "./Common/Contexts/UserContext";
import BottomNavigationBar from "./BottomNavigationBar";
import TasksMain from "./Tasks/TasksMain";
import SeedMain from "./Seed/SeedMain";
import StatsMain from "./Stats/StatsMain";
import SoilMain from "./Soil/SoilMain";
import HomeMain from "./Home/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AnonymousUser from "./Login/AnonymousUser";
import AnonToLogin from "./Login/AnonToLogin";

const App = () => {
  const { user } = useCurrentUser();

  const routes = () => {
    return (
      <>
        <Route
          path="/Login"
          element={
            user ? (
              user.email ? (
                <Navigate to="/" />
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
      </>
    );
  };

  return (
    <Router>
      <>
        <div style={{ marginBottom: 80 }}>
          <Routes>{routes()}</Routes>
        </div>
        <BottomNavigationBar />
        <AnonymousUser />
      </>
    </Router>
  );
};

export default App;
