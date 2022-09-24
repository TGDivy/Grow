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
  "Low",
}

export type subtaskType = [string, boolean];

export interface taskType {
  taskListName: string;
  title: string;
  description: string;
  dueDate: Date;
  priority: priorityType;
  completed: boolean;
  subTasks: Array<subtaskType>;
  tags: Array<tagsType>;
}

export interface tasksListType {
  [key: string]: taskType;
}
