import React from "react";
import LoginPage from "./LoginPage";
import Home from "./Home";
import useCurrentUser from "./contexts/UserContext";
import BottomNavigationBar from "./BottomNavigationBar";
import { ToDoList } from "./ToDoList/ToDoList";

const App = () => {
  const { user } = useCurrentUser();
  const [section, setSection] = React.useState("home");

  const renderSection = () => {
    switch (section) {
      case "home":
        return <Home />;
      case "todo":
        return <ToDoList />;
      default:
        return <div>404</div>;
    }
  };

  return (
    <>
      {!user ? (
        <LoginPage />
      ) : (
        <>
          <BottomNavigationBar section={section} setSection={setSection} />
          {renderSection()}
        </>
      )}
    </>
  );
};

export default App;
