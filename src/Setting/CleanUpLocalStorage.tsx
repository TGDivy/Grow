import React from "react";
import { Button } from "@mui/material";

const deleteAllLocalStorage = () => {
  localStorage.clear();
};

const CleanUpLocalStorage = () => {
  return (
    <div>
      <Button variant="contained" onClick={deleteAllLocalStorage}>
        Delete all local storage
      </Button>
    </div>
  );
};

export default CleanUpLocalStorage;
