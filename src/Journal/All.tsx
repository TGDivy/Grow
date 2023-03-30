/* eslint-disable react/prop-types */
import React, { FC } from "react";

import Goals from "./Goals";
import {
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
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
import DialogTitle from "@mui/material/DialogTitle";
import moment from "moment";
import useDailyJournalStore from "../Common/Stores/DailyJournalStore";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import StyledAccordion from "../Common/ReusableComponents/StyledAccordion";

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

  const OnePage: FC<onePage> = ({ document }) => {
    return (
      <Stack
        spacing={2}
        direction="column"
        sx={{
          width: "100%",
        }}
      >
        {/* <Reflect readonly document={document} /> */}
        {/* <Habits readonly document={document} /> */}
        <Goals readonly document={document} />
        {/* <Mood /> */}
      </Stack>
    );
  };

  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(0);
  const [grouped, setGrouped] = React.useState(
    {} as {
      [key: string]: JournalType[];
    }
  );
  const [keysList, setKeysList] = React.useState([] as string[]);
  const [totalEntriesCumulative, setTotalEntriesCumulative] = React.useState(
    [] as number[]
  );

  React.useEffect(() => {
    const grouped = sortedDocuments.reduce((r, a) => {
      r[moment(a.date).format("MMMM YYYY")] = [
        ...(r[moment(a.date).format("MMMM YYYY")] || []),
        a,
      ];
      return r;
    }, {} as { [key: string]: JournalType[] });

    const keysList = Object.keys(grouped);
    // get the total number of entries for each month
    const totalEntries = keysList.map((key) => grouped[key].length);
    // add total entries of each month from the left month to the right month
    const totalEntriesCumulative = totalEntries.reduce(
      (a, b, i) => [...a, (a[i - 1] || 0) + b],
      [] as number[]
    );

    setGrouped(grouped);
    setKeysList(keysList);
    setTotalEntriesCumulative(totalEntriesCumulative);
  }, []);

  const handleClickOpen = (n: number) => () => {
    setSelectedValue(n);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const ListOfEntries = () => {
    const items = keysList.map((key, index2) => {
      const month = grouped[key].map((document, index_month) => (
        <Grid item xs={12} sm={6} md={4} key={document.date.toString()}>
          <ListItem
            sx={{
              backgroundColor: "surface.main",
            }}
            onClick={handleClickOpen(
              index_month +
                (index2 > 0 ? totalEntriesCumulative[index2 - 1] : 0)
            )}
          >
            <ListItemButton sx={{ width: "100%" }}>
              <ListItemIcon>{`${index_month} >`}</ListItemIcon>
              <ListItemText
                primary={moment(
                  new Date(document.date.getTime() - 5 * 60 * 60 * 1000)
                )
                  .format("dddd, MMM Do 'YY")
                  .toString()}
              />
            </ListItemButton>
          </ListItem>
        </Grid>
      ));

      return (
        <React.Fragment key={key}>
          <Typography variant="h4" sx={{ p: 2 }}>
            {key}
          </Typography>
          <Grid container spacing={2}>
            {month}
          </Grid>
        </React.Fragment>
      );
    });

    return (
      <>
        <StyledAccordion title="All Entries" defaultExpanded>
          {items}
        </StyledAccordion>
      </>
    );
  };

  const Dialogs = () => {
    const date = moment(
      new Date(
        sortedDocuments[selectedValue].date.getTime() - 5 * 60 * 60 * 1000
      )
    )
      .format("dddd, MMM Do 'YY")
      .toString();

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
            <OnePage document={sortedDocuments[selectedValue]} />
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
