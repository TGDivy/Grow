import React from "react";
import { Drawer, Icon } from "@mui/material";
import {
  BarChart,
  BarChartOutlined,
  HomeOutlined,
  SelfImprovementOutlined,
  TaskOutlined,
  TimerOutlined,
} from "@mui/icons-material";
/**
 * We are building a side navigation panel that will be used in the whole app.
 * This panel will be used to navigate between different pages.
 * There should be 3 levels of navigation:
 * 1. Main navigation, These are the first links that will be shown to the user.
 * 2. Sub navigation, These are the links that will be shown when the user clicks on a main navigation link.
 * 3. Sub sub navigation, These are the links that will be expanded when the user clicks on a sub navigation link.
 * The user should be able to navigate between the 3 levels of navigation.
 *
 * When on dektop, the panel will be shown on the left side of the screen by default, with the icons on the left side representing the main navigation links.
 * When on mobile, the panel will be hidden by default, and will be shown when the user clicks on the hamburger menu.
 * When the main navigation link is clicked, on the desktop, the sub navigation by expanding the panel to the right side of the screen, and also navigating to the link.
 * When on mobile the sub navigation will replace the main navigation. The user will be able to navigate back to the main navigation by clicking on the back button.
 *
 * Main Navigation Links Contain name, icon, link, and optional sub navigation links.
 * Sub Navigation Links Contain name, link, and optional sub sub navigation links.
 * Sub Sub Navigation Links Contain name, link.
 */

export interface MainNavigationLink {
  name: string;
  icon: string | React.ReactElement;
  link: string;
  subNavigationLinks?: SubNavigationLink[];
}

interface SubNavigationLink {
  name: string;
  link: string;
  subSubNavigationLinks?: SubSubNavigationLink[];
}

interface SubSubNavigationLink {
  name: string;
  link: string;
}

type Props = {
  links: MainNavigationLink[];
};

const exampleMainNavigationLinks: MainNavigationLink[] = [
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

// const props:Props = {
//   mainNavigationLinks: exampleMainNavigationLinks,
// };

const SideNavigationPanelMain = (props: Props) => {
  const { links } = props;

  return <Drawer variant="permanent">{links.map((link) => link.name)}</Drawer>;
};

export default SideNavigationPanelMain;
