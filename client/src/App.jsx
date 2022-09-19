import React from "react";
import LoginPage from "./LoginPage";
import Home from "./Home";
import useCurrentUser from "./contexts/UserContext";
import BottomNavigationBar from "./BottomNavigationBar";

const App = () => {
  const { user } = useCurrentUser();

  return (
    <>
      {!user ? (
        <LoginPage />
      ) : (
        <>
          <BottomNavigationBar />
          <Home user={user} />
        </>
      )}
    </>
  );
};

export default App;
