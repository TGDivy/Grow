import { Tabs } from "@mui/material";
import React from "react";

type Props = {
  value: unknown;
  onChange: any;
  children: React.ReactNode;
};

const StyledTab = (props: Props) => {
  // const theme = useTheme();
  // const mobile = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <Tabs
      {...props}
      indicatorColor="secondary"
      color="secondary"
      sx={{
        "& .MuiTab-textColorPrimary.Mui-selected": {
          backgroundColor: { xs: "surfaceVariant.main", sm: "surface.main" },
          color: {
            xs: "surfaceVariant.contrastText",
            sm: "surface.contrastText",
          },
        },
      }}
      TabIndicatorProps={{
        style: {
          color: "surface.contrastText",
          backgroundColor: "#00000000",
          border: "0px solid",
          borderLeftColor: "#ffffff00",
        },
      }}
      variant="fullWidth"
    >
      {" "}
      {props.children}{" "}
    </Tabs>
  );
};

export default StyledTab;
