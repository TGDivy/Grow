/* eslint-disable @typescript-eslint/no-unused-vars */
import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface DailyStoreType {
    quote: string;
    author: string;
    date: Date;
    setQuote: () => void;
}



// Fetch Quote of the day
// From https://zenquotes.io/api/today
const fetchQuote = async () => {
    // const response:any = await fetch("https://zenquotes.io/api/today");

    // if (!response.ok) {
    //     throw new Error("Network response was not ok");
    // }

    return ["When I let go of what I am, I become what I might be.", "Lao Tzu"];




    // const data:any = response.json();
    // return [data[0].q, data[0].a];
  };

const useDailyStore = create<DailyStoreType>()(
    devtools(
        persist(
            (set) => ({
                quote: "",
                author: "",
                date: new Date("2021-01-01"),
                setQuote: async () => { 
                    try {
                        const [quote, author] = await fetchQuote();
                        return set((state) => ({quote, author, date: new Date()}))
                    }
                    catch (e) {
                        console.log(e);
                        return set((state) => ({quote:"Failed Fetch", author:"-", date: new Date()}))
                    }
                }
            }),
            {
                name: 'daily-storage',
                
                deserialize: (state) => {
                    const newState = JSON.parse(state);
                    newState.state.date = new Date(newState.state.date);
                    return newState;
                },
            }
        ),

        {
            name: "daily-storage",
        }
    )
)

export default useDailyStore