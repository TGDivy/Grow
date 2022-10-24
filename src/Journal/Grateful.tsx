import React from "react";
import useJournalStore from "../Common/Stores/DailyJournalStore";
import RTE from "./RTE/RTE";

const ReflectGrateful = () => {
  // A place to write down what you're grateful for.
  const grateful = useJournalStore((state) => state.grateful);
  const setGrateful = useJournalStore((state) => state.setGrateful);

  return <RTE text={grateful} setText={setGrateful} />;
};

export default ReflectGrateful;
