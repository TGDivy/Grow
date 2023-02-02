import create from "zustand";
import { persist } from "zustand/middleware";

export interface ThemeColorsType {
  primary: string;
  secondary: string;
  error: string;
  success: string;
  background: string;
}

export interface ThemeType {
  colors: ThemeColorsType;
  theme: "blue" | "green" | "red" | "purple" | "orange";
}

export interface ThemeStoreType extends ThemeType {
  setTheme: (theme: ThemeType) => void;
  setThemeByName: (
    themeName: "blue" | "green" | "red" | "purple" | "orange"
  ) => void;
}

const useThemeStore = create<ThemeStoreType>()(
  persist(
    (set) => ({
      colors: {
        primary: "#ac917200",
        secondary: "rgb(112 42 48)",
        error: "#B00020",
        success: "#00BFA5",
        background: "#146e95",
      },
      theme: "blue",
      setTheme: (theme: ThemeType) => {
        set(theme);
      },
      setThemeByName: (
        themeName: "blue" | "green" | "red" | "purple" | "orange"
      ) => {
        switch (themeName) {
          case "blue":
            set({
              colors: {
                primary: "#ac9172",
                secondary: "rgb(112 42 48)",
                error: "#B00020",
                success: "#00BFA5",
                background: "#146e95",
              },
              theme: "blue",
            });
            break;
        }
      },
    }),
    {
      name: "theme",
      getStorage: () => localStorage,
    }
  )
);

export default useThemeStore;
