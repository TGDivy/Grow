export enum tags {
  "Engineering",
  "Research",
  "Planning",
  "Study",
  "Applications",
  "Chore",
  "Other",
}

export interface task {
  taskListName: string;
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  completed: boolean;
  subTasks: Array<[string, boolean]>;
  tags: Array<tags>;
}

interface taskFC extends task {}
