import React from "react";
import LoginPage from "./LoginPage";
import Home from "./Stats/Home";
import useCurrentUser from "./contexts/UserContext";
import BottomNavigationBar from "./BottomNavigationBar";
import TasksMain from "./Tasks/TasksMain";
import SeedMain from "./Seed/SeedMain";
import { Container } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  const { user } = useCurrentUser();
  const [section, setSection] = React.useState("home");

  const renderSection = () => {
    if (!user) return <Route path="/" element={<LoginPage />} />;
    return (
      <>
        <Route path="/" element={<Home />} />
        <Route path="/Tasks" element={<TasksMain />} />
        <Route path="/Seed" element={<SeedMain />} />
      </>
    );
  };

  return (
    <Router>
      <>
        <div style={{ marginBottom: 80 }}>
          <Container>
            <Routes>{renderSection()}</Routes>
          </Container>
        </div>
        <BottomNavigationBar section={section} setSection={setSection} />
      </>
    </Router>
  );
};

export default App;
