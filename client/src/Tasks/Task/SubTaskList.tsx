import React, { FC, useState } from "react";
import { TransitionGroup } from "react-transition-group";
import { Typography } from "@mui/material";
import { List, ListItem, ListItemText, TextField } from "@mui/material";
import { Checkbox, IconButton } from "@mui/material";
import { Delete, Add } from "@mui/icons-material";
import { Collapse } from "@mui/material";

import { subtaskType } from "../../Stores/Types";

interface SubTaskListProps {
  subTasks: Array<subtaskType>;
  setSubTasks: (subTasks: Array<subtaskType>) => void;
  editing: boolean;
}

const SubTaskList: FC<SubTaskListProps> = ({
  subTasks,
  editing,
  setSubTasks,
}) => {
  const [subTask, setSubTask] = useState<subtaskType>(["", false]);

  const handleAddSubTask = () => {
    setSubTasks([...subTasks, subTask]);
    setSubTask(["", false]);
  };

  const handleDeleteSubTask = (subTaskToDelete: subtaskType) => {
    setSubTasks(subTasks.filter((subTask) => subTask !== subTaskToDelete));
  };

  const handleToggleSubTask = (index: number) => {
    const array = [...subTasks];
    array[index][1] = !array[index][1];
    setSubTasks(array);
  };

  const handleSubTaskChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const array = [...subTasks];
    array[index][0] = event.target.value as string;
    setSubTasks(array);
  };

  return (
    <>
      <List
        dense
        sx={{
          paddingTop: 0,
          marginTop: 0,
        }}
      >
        <TransitionGroup>
          {subTasks.map((subTask, index) => (
            <Collapse key={index}>
              <ListItem
                sx={{ padding: "0px 0px 0px 15px" }}
                secondaryAction={
                  editing && (
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDeleteSubTask(subTask)}
                    >
                      <Delete />
                    </IconButton>
                  )
                }
              >
                <Checkbox
                  sx={{ padding: "0px 5px 0px 5px" }}
                  edge="start"
                  size="small"
                  checked={subTask[1]}
                  onClick={() => handleToggleSubTask(index)}
                />
                {editing ? (
                  <TextField
                    id="small"
                    size="small"
                    variant="standard"
                    value={subTasks[index][0]}
                    onChange={(event) => {
                      handleSubTaskChange(event, index);
                    }}
                  />
                ) : (
                  <ListItemText>
                    <Typography
                      variant="body2"
                      sx={{
                        textDecoration: subTask[1] ? "line-through" : "none",
                        color: subTask[1] ? "gray" : "black",
                      }}
                    >
                      {subTask[0]}
                    </Typography>
                  </ListItemText>
                )}
              </ListItem>
            </Collapse>
          ))}
        </TransitionGroup>
        {editing && (
          <ListItem
            key="Add Subtask"
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={handleAddSubTask}
              >
                <Add />
              </IconButton>
            }
          >
            <Checkbox
              edge="start"
              checked={false}
              size="small"
              sx={{ padding: "0px 5px 0px 5px" }}
            />
            <TextField
              id="small"
              size="small"
              variant="standard"
              value={subTask[0]}
              onChange={(event) => {
                setSubTask([event.target.value, false]);
              }}
            />
          </ListItem>
        )}
      </List>
    </>
  );
};

export default SubTaskList;
