import { createContext } from "react";
import { createContextProps } from "../types/theme";

export const ThemeContext = createContext<createContextProps>(undefined);
