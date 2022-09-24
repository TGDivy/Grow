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
    switch (section) {
      case "home":
        return <Route path="/" element={<Home />} />;
      case "Tasks":
        return <Route path="/" element={<TasksMain />} />;
      case "Seed":
        return <Route path="/" element={<SeedMain />} />;
      default:
        return <div>404</div>;
    }
  };

  return (
    <Router>
      {!user ? (
        <LoginPage />
      ) : (
        <>
          <div style={{ marginBottom: 80 }}>
            <Routes>
              <Container>{renderSection()}</Container>
            </Routes>
          </div>
          <BottomNavigationBar section={section} setSection={setSection} />
        </>
      )}
    </Router>
  );
};

export default App;
