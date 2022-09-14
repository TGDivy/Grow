import React from "react";
import LoginPage from "./LoginPage";
import Home from "./Home";
import useCurrentUser from "./contexts/UserContext";

const App = () => {
  const { user } = useCurrentUser();
  console.log(user);
  return <>{user ? <Home user={user} /> : <LoginPage />}</>;
};

export default App;
