import { Box, Collapse, Stack, Typography, styled } from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import M3Button from "../../StyledComponents/M3Button";
import ThemePicker from "../ThemePicker";
import { ArrowDropDown } from "@mui/icons-material";
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
  "& .MuiDrawer-paper": {
    backgroundColor: theme.palette.surface.main,
    color: theme.palette.surface.contrastText,
    backgroundImage: "none",
    display: "flex",
    flexDirection: "row",
    width: theme.spacing(10),
  },
}));

// const TextButton = styled(Button)<{
//   component: React.ElementType;
//   to: string;
// }>(({ theme }) => ({

const NavigationRail = (props: Props) => {
  const { links } = props;

  const [subNavigationLinks, setSubNavigationLinks] = React.useState<
    SubNavigationLink[]
  >([]);
  const [expandSubSubNavigation, setExpandSubSubNavigation] = React.useState<
    number | null
  >(null);

  const handleClose = () => {
    setSubNavigationLinks([]);
  };

  const location = useLocation();
  const open = subNavigationLinks.length > 0;

  return (
    <>
      <Drawer
        variant="permanent"
        PaperProps={{
          sx: {
            // borderRight: open ? 0 : 0.01,
            zIndex: 100,
          },
        }}
      >
        <Stack
          direction="column"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
          mt={2}
          mb={2}
        >
          <Stack direction="column" alignItems="center" spacing={2}>
            {links.map((LinkItem) => {
              return (
                <Stack
                  key={LinkItem.name}
                  direction="column"
                  alignItems="center"
                  spacing={0.5}
                >
                  <M3Button
                    key={LinkItem.name}
                    variant={
                      LinkItem.link === location.pathname ? "contained" : "text"
                    }
                    component={Link}
                    to={LinkItem.link}
                    onMouseOver={() =>
                      setSubNavigationLinks(
                        LinkItem.subNavigationLinks
                          ? LinkItem.subNavigationLinks
                          : []
                      )
                    }
                  >
                    {LinkItem.icon}
                  </M3Button>
                  <Typography variant="caption">{LinkItem.name}</Typography>
                </Stack>
              );
            })}
          </Stack>
          <Stack direction="column" alignItems="center">
            <ThemePicker />
          </Stack>
        </Stack>
      </Drawer>
      <Drawer
        open={subNavigationLinks.length > 0}
        hideBackdrop
        PaperProps={{
          sx: {
            marginLeft: "80px",
          },
        }}
        sx={{
          width: "240px",
          zIndex: 99,
          "& .MuiDrawer-paper": {
            width: "240px",
            boxShadow: "none",
            // right border radius 20px
            borderRadius: "0px 20px 20px 0px",
            zIndex: 99,
          },
        }}
        onMouseLeave={handleClose}
        // onTouchEnd={handleClose}
      >
        <Stack
          direction="column"
          alignItems="center"
          width="100%"
          m={2}
          spacing={2}
        >
          {subNavigationLinks.map((LinkItem, index) => {
            return (
              <Box key={LinkItem.name} width="100%">
                <M3Button
                  key={LinkItem.name}
                  variant={
                    LinkItem.link === location.pathname &&
                    !LinkItem.subSubNavigationLinks
                      ? "contained"
                      : index === expandSubSubNavigation &&
                        open === true &&
                        LinkItem.subSubNavigationLinks
                      ? "outlined"
                      : "text"
                  }
                  component={LinkItem.subSubNavigationLinks ? "button" : Link}
                  to={LinkItem.link}
                  onClick={() =>
                    setExpandSubSubNavigation(
                      expandSubSubNavigation === index ? null : index
                    )
                  }
                  fullWidth
                  sx={{
                    justifyContent: "space-between",
                    pl: 2,
                    pr: 2,
                  }}
                  endIcon={
                    LinkItem.subSubNavigationLinks ? <ArrowDropDown /> : ""
                  }
                >
                  {LinkItem.name}
                </M3Button>

                <Collapse
                  in={
                    LinkItem.subSubNavigationLinks &&
                    expandSubSubNavigation === index
                  }
                >
                  <Stack
                    direction="column"
                    alignItems="center"
                    // width="100%"
                    ml={2}
                    mr={2}
                    mt={1}
                    // m={2}
                    // spacing={2}
                  >
                    {LinkItem.subSubNavigationLinks?.map((LinkItem) => {
                      return (
                        <M3Button
                          key={LinkItem.name}
                          variant={
                            LinkItem.link === location.pathname
                              ? "contained"
                              : "text"
                          }
                          component={Link}
                          to={LinkItem.link}
                          fullWidth
                          sx={{
                            justifyContent: "space-between",
                            pl: 2,
                            pr: 2,
                          }}
                        >
                          {LinkItem.name}
                        </M3Button>
                      );
                    })}
                  </Stack>
                </Collapse>
              </Box>
            );
          })}
        </Stack>
      </Drawer>
    </>
  );
};

export default NavigationRail;
