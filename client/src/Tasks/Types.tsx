export enum tags {
  "Engineering",
  "Research",
  "Planning",
  "Study",
  "Applications",
  "Chore",
  "Other",
}

export enum priority {
  "High",
  "Medium",
  "Low",
}

export interface task {
  taskListName: string;
  title: string;
  description: string;
  dueDate: Date;
  priority: priority;
  completed: boolean;
  subTasks: Array<[string, boolean]>;
  tags: Array<tags>;
}

export interface tasksList {
  [key: string]: task;
}
