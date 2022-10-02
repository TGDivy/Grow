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
