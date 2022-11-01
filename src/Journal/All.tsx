/* eslint-disable react/prop-types */
import React, { FC } from "react";

import Goals from "./Goals";
import Habits from "./Habits";
import Reflect from "./Reflect";
import Mood from "./Mood";
import {
  Box,
  Checkbox,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { JournalType } from "../Common/Types/Types";
import useJournalStore from "../Common/Stores/JournalStore";
import { maxWidth } from "@mui/system";

import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import moment from "moment";
import useDailyJournalStore from "../Common/Stores/DailyJournalStore";

interface Props {
  allEntries?: boolean;
}

interface onePage {
  document: JournalType;
}

const All: FC<Props> = ({ allEntries }) => {
  const currentDoc = useDailyJournalStore((state) => state.getJournal());
  const documents = useJournalStore((state) => state.documents);
  const sortedDocuments = Object.values(documents).sort(
    (a, b) => b.date.getTime() - a.date.getTime()
  );
  if (sortedDocuments == null || sortedDocuments.length == 0) {
    return <></>;
  }

  const latest = sortedDocuments[0];

  console.log(latest.date);

  const OnePage: FC<onePage> = ({ document }) => {
    return (
      <Stack
        spacing={2}
        direction="column"
        sx={{
          width: "100%",
        }}
      >
        <Reflect readonly document={document} />
        <Habits readonly document={document} />
        <Goals readonly document={document} />
        {/* <Mood /> */}
      </Stack>
    );
  };

  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(0);

  const handleClickOpen = (n: number) => () => {
    setSelectedValue(n);
    setOpen(true);
    console.log(n);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const ListOfEntries = () => {
    return (
      <Paper
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          justifyContent: "space-between",
          height: "100%",
          backgroundColor: "#00000088",
          color: "white",
        }}
      >
        {/* <List
          sx={{
            width: "max-content",
          }}
        > */}
        <Grid container spacing={2}>
          {sortedDocuments.map((document, index) => (
            <Grid item xs={6} md={4} key={index}>
              <ListItem
                sx={{
                  backgroundColor: "#ffffff22",
                }}
                key={index}
              >
                <ListItemButton
                  sx={{ width: "100%" }}
                  onClick={handleClickOpen(index)}
                >
                  <ListItemIcon>{`${index} >`}</ListItemIcon>
                  <ListItemText
                    primary={moment(
                      new Date(document.date.getTime() - 4 * 60 * 60 * 1000)
                    ).format("dddd, MMM Do 'YY")}
                  />
                </ListItemButton>
              </ListItem>
            </Grid>
          ))}
        </Grid>
        {/* </List> */}
      </Paper>
    );
  };

  return (
    <Stack spacing={2} alignItems="center">
      {allEntries ? (
        <>
          <ListOfEntries />

          <OnePage document={sortedDocuments[selectedValue]} />
        </>
      ) : (
        <OnePage document={currentDoc} />
      )}
    </Stack>
  );
};

export default All;
