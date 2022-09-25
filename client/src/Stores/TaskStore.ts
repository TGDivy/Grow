/* eslint-disable @typescript-eslint/no-unused-vars */
import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { taskType, tasksListType} from './Types'

interface taskListStoreType {
    addTask: (task: taskType, id: string) => void;
    deleteTask: (id: string) => void;
    editTask: (task: taskType, id: string) => void;
    tasks: tasksListType;
}

const useTaskStore = create<taskListStoreType>()(
    devtools(
        persist(
            (set) => ({
                tasks: {},
                
                addTask: (task: taskType, id: string) => set((state) => ({tasks: {...state.tasks, [id]: task}})),

                deleteTask: (id: string) => set((state) => {
                    const {[id]: value, ...newState} = state.tasks;
                    return {tasks: newState}
                }),
                editTask : (task: taskType, id: string) => set((state) => {
                    state.tasks[id] = task;
                    return state;
                }
                ),
            }),
            {
                name: 'task-list-storage',
            }
        ),
        {
            name: "task-list-storage",
        }
    )
)

export default useTaskStore