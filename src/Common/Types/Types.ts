import { TupleType } from "typescript";

export enum tagsType {
  "Engineering",
  "Research",
  "Planning",
  "Study",
  "Applications",
  "Chore",
  "Other",
}

export enum priorityType {
  "High",
  "Medium",
}

// export enum workoutMeasurements {
//   "Duration",
//   "Distance",
//   "Reps",
//   "Sets and Reps",
//   "Duration and Distance",
// }

export const workoutMeasurements = {
  Duration: "Duration",
  Distance: "Distance",
  Reps: "Reps",
  "Sets and Reps": "Sets and Reps",
  "Duration and Distance": "Duration and Distance",
};

// export type subtaskType = [string, boolean];

export interface subtaskType {
  title: string;
  completed: boolean;
}

export interface taskType {
  taskListName: string;
  title: string;
  description: string;
  dateUpdated: Date;
  priority: boolean;
  completed: boolean;
  subTasks: Array<subtaskType>;
  tags: Array<tagsType>;
  timeSpent: number;
}

export interface taskChangeType {
  taskListName?: string;
  title?: string;
  description?: string;
  dueDate?: Date;
  priority?: boolean;
  completed?: boolean;
  subTasks?: Array<subtaskType>;
  tags?: Array<tagsType>;
}

export interface tasksListType {
  [key: string]: taskType;
}

export interface timerType {
  active: boolean;
  startTime: Date;
  duration: number;
  taskKey: string;
  tags: Array<tagsType>;
}

export interface setRepType {
  reps: number;
  weight: number;
}

export interface activityType {
  name: string;
  date: Date;
  distance?: number;
  duration?: number;
  sets?: Array<setRepType>;
}

export interface workoutType {
  name: string;
  date: Date;
  activities: Array<activityType>;
  description: string;
}

export interface activityTypeDoc {
  activityTypes: string[];
}
