import create from "zustand";
import { persist } from "zustand/middleware";
import {
  blueThemeDark,
  blueThemeLight,
  redThemeDark,
  redThemeLight,
  greenThemeLight,
  greenThemeDark,
  simpleDarkTheme,
} from "../Styling/themeSpecs";

export interface ThemeColorsType {
  primary: string;
  onPrimary: string;
  primaryContainer: string;
  onPrimaryContainer: string;

  secondary: string;
  onSecondary: string;
  secondaryContainer: string;
  onSecondaryContainer: string;

  tertiary: string;
  onTertiary: string;
  tertiaryContainer: string;
  onTertiaryContainer: string;

  error: string;
  onError: string;
  errorContainer: string;
  onErrorContainer: string;

  background: string;
  onBackground: string;

  outline: string;

  surface: string;
  onSurface: string;
  surfaceVariant: string;
  onSurfaceVariant: string;
}

export interface ThemeType {
  colors: ThemeColorsType;
  theme: "blue" | "green" | "red" | "purple" | "orange" | "simple";
  mode: "light" | "dark";
}

export interface ThemeStoreType extends ThemeType {
  setTheme: (theme: ThemeType) => void;
  setThemeByName: (
    themeName: "blue" | "green" | "red" | "purple" | "orange" | "simple"
  ) => void;
  setMode: (mode: "light" | "dark") => void;
}

const useThemeStore = create<ThemeStoreType>()(
  persist(
    (set, get) => ({
      theme: "blue",
      mode: window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light",
      colors: window.matchMedia("(prefers-color-scheme: dark)").matches
        ? blueThemeDark
        : blueThemeLight,
      setTheme: (theme: ThemeType) => {
        set(theme);
      },
      setThemeByName: (
        themeName: "blue" | "green" | "red" | "purple" | "orange" | "simple"
      ) => {
        const { mode } = get();
        switch (mode) {
          case "dark":
            switch (themeName) {
              case "blue":
                set({
                  colors: blueThemeDark,
                  theme: "blue",
                });
                break;
              case "red":
                set({
                  colors: redThemeDark,
                  theme: "red",
                });
                break;
              case "green":
                set({
                  colors: greenThemeDark,
                  theme: "green",
                });
                break;
              case "simple":
                set({
                  colors: simpleDarkTheme,
                  theme: "simple",
                });
            }
            break;
          case "light":
            switch (themeName) {
              case "blue":
                set({
                  colors: blueThemeLight,
                  theme: "blue",
                });
                break;
              case "green":
                set({
                  colors: greenThemeLight,
                  theme: "green",
                });
                break;
              case "red":
                set({
                  colors: redThemeLight,
                  theme: "red",
                });
                break;
              case "simple":
                set({
                  colors: simpleDarkTheme,
                  theme: "simple",
                });
            }
        }
      },
      setMode: (mode: "light" | "dark") => {
        const { theme } = get();
        switch (mode) {
          case "dark":
            switch (theme) {
              case "blue":
                set({
                  colors: blueThemeDark,
                  mode: "dark",
                });
                break;
              case "red":
                set({
                  colors: redThemeDark,
                  mode: "dark",
                });
                break;
              case "green":
                set({
                  colors: greenThemeDark,
                  mode: "dark",
                });
                break;
            }
            break;
          case "light":
            switch (theme) {
              case "blue":
                set({
                  colors: blueThemeLight,
                  mode: "light",
                });
                break;
              case "green":
                set({
                  colors: greenThemeLight,
                  mode: "light",
                });
                break;
              case "red":
                set({
                  colors: redThemeLight,
                  mode: "light",
                });
                break;
            }
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
