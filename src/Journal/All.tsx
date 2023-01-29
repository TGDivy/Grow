/* eslint-disable react/prop-types */
import React, { FC } from "react";

import Goals from "./Goals";
import Habits from "./Habits";
import Reflect from "./Reflect";
import {
  Divider,
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { JournalType } from "../Common/Types/Types";
import useJournalStore from "../Common/Stores/JournalStore";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import moment from "moment";
import useDailyJournalStore from "../Common/Stores/DailyJournalStore";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

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
    const grouped = sortedDocuments.reduce((r, a) => {
      r[moment(a.date).format("MMMM YYYY")] = [
        ...(r[moment(a.date).format("MMMM YYYY")] || []),
        a,
      ];
      return r;
    }, {} as { [key: string]: JournalType[] });

    const items = Object.keys(grouped).map((key) => {
      const month = grouped[key].map((document, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <ListItem
            sx={{
              backgroundColor: "#ffffff22",
            }}
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
      ));

      return (
        <>
          <Typography
            sx={{
              color: "white",
              fontSize: "1.5rem",
              fontWeight: "bold",
              marginTop: "1rem",
            }}
          >
            {key}
          </Typography>
          <Divider />
          <Grid container spacing={2}>
            {month}
          </Grid>
        </>
      );
    });

    return (
      <>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            justifyContent: "space-between",
            height: "100%",
            backgroundColor: "#00000088",
            color: "white",
          }}
        >
          {items}
        </Paper>
      </>
    );
  };

  const Dialogs = () => {
    const date = moment(
      new Date(
        sortedDocuments[selectedValue].date.getTime() - 4 * 60 * 60 * 1000
      )
    ).format("dddd, MMM Do 'YY");

    // add buttons left and right to change the selected value

    const handleLeft = () => {
      if (selectedValue > 0) {
        setSelectedValue(selectedValue - 1);
      }
    };

    const handleRight = () => {
      if (selectedValue < sortedDocuments.length - 1) {
        setSelectedValue(selectedValue + 1);
      }
    };

    return (
      <>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: {
              position: "fixed",
              backgroundColor: "#ffffff22",
              color: "white",
            },
          }}
          sx={{
            backdropFilter: "blur(10px)",
          }}
          fullScreen={useMediaQuery(
            (theme: Theme) =>
              theme.breakpoints.down("md") || theme.breakpoints.down("sm")
          )}
        >
          <DialogTitle id="alert-dialog-title">{date}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <OnePage document={sortedDocuments[selectedValue]} />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleLeft} disabled={selectedValue == 0}>
              <ArrowBack />
            </Button>
            <Button onClick={handleClose}>Close</Button>
            <Button
              onClick={handleRight}
              disabled={selectedValue == sortedDocuments.length - 1}
            >
              <ArrowForward />
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  };

  return (
    <Stack spacing={2} alignItems="center">
      {allEntries ? (
        <>
          <ListOfEntries />

          <Dialogs />
        </>
      ) : (
        <OnePage document={currentDoc} />
      )}
    </Stack>
  );
};

export default All;
