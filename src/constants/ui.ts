import { type Theme } from "react-select"

export const sizes = {
  xs: "0.75rem",
  sm: "0.875rem",
  md: "1rem",
  lg: "1.125rem"
}

export const reactSelectTheme = (theme: Theme): Theme => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary75: "#6366f175",
    primary50: "#6366f150",
    primary25: "#6366f125",
    primary: "#6366f1",
    neutral5: "#f1f5f9",
    neutral10: "#e2e8f0",
    neutral20: "#e2e8f0",
    neutral50: "#94a3b8"
  }
})
