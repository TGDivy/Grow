import { Divider, Box, Typography } from "@mui/material";
import React from "react";

type Props = {
  title: string;
};

const PageTitle = (props: Props) => {
  return (
    <Divider
      textAlign="left"
      sx={{
        "&.MuiDivider-root": {
          pb: 1,
          "&::before": {
            borderTopWidth: 3,
            borderTopStyle: "solid",
          },
          "&::after": {
            borderTopWidth: 3,
            borderTopStyle: "solid",
          },
        },
      }}
    >
      <Box
        // pt={2}
        // pb={2}
        alignItems={"center"}
        display={"flex"}
        justifyContent={"center"}
      >
        <Typography variant="h4" align="center">
          {props.title}
        </Typography>
      </Box>
    </Divider>
  );
};

export default PageTitle;
