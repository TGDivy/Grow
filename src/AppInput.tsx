import React from "react";
import {
  HomeOutlined,
  TaskOutlined,
  TimerOutlined,
  BarChartOutlined,
  SelfImprovementOutlined,
} from "@mui/icons-material";
import { MainNavigationLink } from "./Elements/SideNavigationPanel/SideNavigationPanelMain";
import { Navigate, Route } from "react-router-dom";
import HabitsMain from "./Habits/HabitsMain";
import JournalMain from "./Journal/JournalMain";
import NewJournalMain from "./Journal/NewJournalMain";
import ReflectAIAssistedChat from "./Journal/ReflectAIAssisted/ReflectAIAssistedChat";
import AnonToLogin from "./Login/AnonToLogin";
import LoginPage from "./Login/LoginPage";
import SeedMain from "./Seed/SeedMain";
import SettingMain from "./Setting/SettingMain";
import StatsMain from "./Stats2/StatsMain";
import ProjectPage from "./Tasks/ProjectPage";
import TasksMain from "./Tasks/TasksMain";
import { userType } from "./Common/Types/Types";
import HomeMain from "./Home/HomeOld";

export const MainNavigationLinks: MainNavigationLink[] = [
  {
    name: "Home",
    icon: <HomeOutlined />,
    link: "/",
  },
  {
    name: "Projects",
    icon: <TaskOutlined />,
    link: "/projects",
  },
  {
    name: "Timer",
    icon: <TimerOutlined />,
    link: "/timer",
  },
  {
    name: "Statistics",
    icon: <BarChartOutlined />,
    link: "/statistics",
  },
  {
    name: "Reflect",
    icon: <SelfImprovementOutlined />,
    link: "/reflect",
  },
];

export const routes = (user: userType | null, initialPath: string) => {
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
        path="/Journal/Today"
        element={user ? <JournalMain /> : <Navigate to="/Login" />}
      />
      <Route
        path="/Reflect"
        element={user ? <NewJournalMain /> : <Navigate to="/Login" />}
      />
      <Route
        path="/Habits"
        element={user ? <HabitsMain /> : <Navigate to="/Login" />}
      />
      <Route
        path="/Journal/Assisted"
        element={user ? <ReflectAIAssistedChat /> : <Navigate to="/Login" />}
      />
      <Route path="projects/:projectId" element={<ProjectPage />} />
    </>
  );
};
