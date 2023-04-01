import {
  BarChartOutlined,
  HomeOutlined,
  SelfImprovementOutlined,
  TaskOutlined,
  TimerOutlined,
} from "@mui/icons-material";
import { Stack, Typography, styled, useTheme } from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import M3Button from "../../StyledComponents/M3Button";
import ThemePicker from "../ThemePicker";
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

const Drawer = styled(MuiDrawer)(({ theme }) => ({
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  overflowX: "hidden",
  // width 80dp
  width: theme.spacing(10),
  "& .MuiDrawer-paper": {
    backgroundColor: theme.palette.surface.main,
    color: theme.palette.surface.contrastText,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
    backgroundImage: "none",

    // shadow on hover
    "&:hover": {
      boxShadow: theme.shadows[4],
    },
  },
}));

// const TextButton = styled(Button)<{
//   component: React.ElementType;
//   to: string;
// }>(({ theme }) => ({

const NavigationRail = (props: Props) => {
  const { links } = props;

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const location = useLocation();

  return (
    <Drawer variant="permanent">
      <Stack direction="column" alignItems="center">
        {props.links.map((LinkItem) => {
          return (
            <>
              <M3Button
                key={LinkItem.name}
                variant={
                  LinkItem.link === location.pathname ? "contained" : "text"
                }
                sx={{
                  m: 2,
                  mb: 0,
                }}
                component={Link}
                to={LinkItem.link}
              >
                {LinkItem.icon}
              </M3Button>
              <Typography variant="body2">{LinkItem.name}</Typography>
            </>
          );
        })}
      </Stack>
      <Stack direction="column" alignItems="center">
        <ThemePicker />
      </Stack>
    </Drawer>
  );
};

export default NavigationRail;
