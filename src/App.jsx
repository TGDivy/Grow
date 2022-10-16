import React from "react";
import LoginPage from "./LoginPage";
import Home from "./Stats/Home";
import useCurrentUser from "./Common/Contexts/UserContext";
import BottomNavigationBar from "./BottomNavigationBar";
import TasksMain from "./Tasks/TasksMain";
import SeedMain from "./Seed/SeedMain";
import SoilMain from "./Soil/SoilMain";
import { Container } from "@mui/material";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

const App = () => {
  const { user } = useCurrentUser();

  const routes = () => {
    return (
      <>
        <Route
          path="/Login"
          element={user ? <Navigate to="/" /> : <LoginPage />}
        />
        <Route path="/" element={user ? <Home /> : <Navigate to="/Login" />} />
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
      </>
    );
  };

  return (
    <Router>
      <>
        <div style={{ marginBottom: 80 }}>
          <Container>
            <Routes>{routes()}</Routes>
          </Container>
        </div>
        <BottomNavigationBar />
      </>
    </Router>
  );
};

export default App;
