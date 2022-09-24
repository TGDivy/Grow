import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { taskType, tagsType, subtaskType, priorityType, tasksListType} from './Types'


interface taskStoreType extends taskType {
    setTaskListName: (task: taskType) => void;
    setTitle: (title: string) => void;
    setDescription: (description: string) => void;
    setPriority: (priority: number) => void;
    setCompleted: (completed: boolean) => void;
    addTag: (tags: tagsType) => void;
    deleteTag: (tags: tagsType) => void;
    addSubTask: (subTask: subtaskType) => void;
    deleteSubTask: (subTask: subtaskType) => void;
}

const useTaskState = create<taskStoreType>()(
  devtools(
    persist(
      (set) => ({
        taskListName: '',
        title: '',
        description: '',
        dueDate: new Date(),
        priority: priorityType.Medium,
        completed: false,
        subTasks: [],
        tags: [],
        setTaskListName: (task: taskType) => set({ taskListName: task.taskListName }),
        setTitle: (title: string) => set({ title: title }),
        setDescription: (description: string) => set({ description: description }),
        setPriority: (priority: number) => set({ priority: priority }),
        setCompleted: (completed: boolean) => set({ completed: completed }),
        
        addTag: (tag: tagsType) => set((state) => ({tags: [...state.tags, tag]})),
        deleteTag: (tag: tagsType) => set((state) => ({tags: state.tags.filter((t) => t !== tag)})),

        addSubTask: (subTask: subtaskType) => set((state) => ({subTasks: [...state.subTasks, subTask]})),
        deleteSubTask: (subTask: subtaskType) => set((state) => ({subTasks: state.subTasks.filter((t) => t !== subTask)})),

      }),
      {
        name: 'task-storage',
      }
    )
  )
)

interface taskListStoreType {
    addTask: (task: taskType) => void;
    deleteTask: (task: taskType) => void;
    tasks: tasksListType;
}

const useTaskListState = create<taskListStoreType>()(
    devtools(
        persist(
            (set) => ({
                tasks: {},
                
                addTask: (task: taskType) => set((state) => ({tasks: {...state.tasks, [task.title]: task}})),

                deleteTask: (task: taskType) => set((state) => {
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    const {[task.title]: value, ...newState} = state.tasks;
                    return {tasks: newState}
                }
                ),
            }),
            {
                name: 'task-list-storage',
            }
        )
    )
)

export { useTaskState, useTaskListState }