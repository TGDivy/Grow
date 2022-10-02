import React from "react";
import { TransitionProps } from "@mui/material/transitions";
import { Slide } from "@mui/material";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  if (!props.in) {
    return <Slide direction="left" in ref={ref} {...props} />;
  }
  return <Slide direction="right" in ref={ref} {...props} />;
});

export default Transition;
