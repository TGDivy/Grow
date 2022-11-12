export interface stickerTagHabitType {
  name: string;
  minutes: number;
  daysOfWeek: string;
}

export interface userType {
  created: Date;
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;

  tags: string[];
  stickers: string[];

  stickerTagHabits: Array<stickerTagHabitType>;
}

export type tagsType = Array<string>;

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
  tags: Array<string>;
  sticker: string;
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
  tags?: Array<string>;
  sticker?: string;
}

export interface tasksListType {
  [key: string]: taskType;
}

export interface timerType {
  active: boolean;
  startTime: Date;
  duration: number;
  taskKey: string;
  tags: Array<string>;
  sticker: string;
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

interface BoolHabitTemplate {
  [key: string]: boolean;
}

export interface JournalType {
  date: Date;
  title: string;

  entry: string;
  nextDayNotes: string;

  tasksForTomorrow: Array<string>; // task keys

  mood: string[];

  workDone: number;
  exercised: boolean;
  meals: string[];
  noMB: boolean;

  tagHabits: BoolHabitTemplate;
}

export interface JournalDicType {
  [key: string]: JournalType;
}
