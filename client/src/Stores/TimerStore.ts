/* eslint-disable @typescript-eslint/no-unused-vars */
import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { tagsType, timerType} from './Types'

interface timerStoreType extends timerType {
    startTimer: () => void;
    stopTimer: () => void;
    addTask: (id: string) => void;
    deleteTask: () => void;
    addTag: (tag: tagsType) => void;
    deleteTag: (tag: tagsType) => void;
}

const useTimerStore = create<timerStoreType>()(
    devtools(
        persist(
            (set) => ({
                active: false,
                startTime: new Date(),
                endTime: new Date(),
                taskKey: "",
                tags: [],

                startTimer: () => set((state) => ({active: true, startTime: new Date()})),
                stopTimer: () => set((state) => ({active: false, endTime: new Date()})),
                addTask: (id: string) => set((state) => ({taskKey: id})),
                deleteTask: () => set((state) => ({taskKey: ""})),
                addTag: (tag: tagsType) => set((state) => ({tags: [...state.tags, tag]})),
                deleteTag: (tag: tagsType) => set((state) => (
                    {tags: state.tags.filter((item) => item !== tag)}
                )),
            }),
            {
                name: "timer-storage",
            }
        ),
        {
            name: "timer-storage",
        }
    )
)

export default useTimerStore