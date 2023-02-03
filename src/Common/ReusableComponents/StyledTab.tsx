import { Tabs } from "@mui/material";
import React from "react";

type Props = {
  value: unknown;
  onChange: any;
  children: React.ReactNode;
};

const StyledTab = (props: Props) => {
  return (
    <Tabs
      {...props}
      indicatorColor="secondary"
      color="secondary"
      sx={{
        "& .MuiTab-textColorPrimary.Mui-selected": {
          color: "surface.contrastText",
          backgroundColor: "surface.main",
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
