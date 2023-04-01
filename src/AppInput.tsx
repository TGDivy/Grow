import React from "react";
import {
  HomeOutlined,
  TaskOutlined,
  TimerOutlined,
  BarChartOutlined,
  SelfImprovementOutlined,
} from "@mui/icons-material";
import { MainNavigationLink } from "./Elements/SideNavigationPanel/NavigationRail";
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
import useUserStore from "./Common/Stores/User";

export const MainNavigationLinks = (projectNames: string[]) => [
  {
    name: "Home",
    icon: <HomeOutlined />,
    link: "/",
  },
  {
    name: "Projects",
    icon: <TaskOutlined />,
    link: "/projects",
    subNavigationLinks: [
      {
        name: "Projects Overview",
        link: "/projects",
      },
      {
        name: "Active Projects",
        link: "/projects",
        subSubNavigationLinks: projectNames.map((projectName) => {
          return {
            name: projectName,
            link: `/projects/${projectName}`,
          };
        }),
      },
    ],
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
    subNavigationLinks: [
      {
        name: "Reflect Overview",
        link: "/reflect",
      },
      {
        name: "Today's Journal Entry",
        link: "/journal/today",
      },
      {
        name: "Assisted Journal Entry",
        link: "/journal/assisted",
      },
      {
        name: "Habits",
        link: "/habits",
      },
    ],
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
        path="/settings"
        element={user ? <SettingMain /> : <Navigate to="/Login" />}
      />
      <Route
        path="/projects"
        element={user ? <TasksMain /> : <Navigate to="/Login" />}
      />
      <Route
        path="/timer"
        element={user ? <SeedMain /> : <Navigate to="/Login" />}
      />
      <Route
        path="/statistics"
        element={user ? <StatsMain /> : <Navigate to="/Login" />}
      />
      <Route
        path="/journal/today"
        element={user ? <JournalMain /> : <Navigate to="/Login" />}
      />
      <Route
        path="/reflect"
        element={user ? <NewJournalMain /> : <Navigate to="/Login" />}
      />
      <Route
        path="/habits"
        element={user ? <HabitsMain /> : <Navigate to="/Login" />}
      />
      <Route
        path="/journal/assisted"
        element={user ? <ReflectAIAssistedChat /> : <Navigate to="/Login" />}
      />
      <Route path="projects/:projectId" element={<ProjectPage />} />
    </>
  );
};
