import { useEffect, useState } from "react";
import { Theme, ThemeProviderProps } from "../types/theme";
import { ThemeContext } from "./ThemeContext";

export function ThemeProvider({children}: ThemeProviderProps) {
    const [theme, setTheme] = useState<Theme>('light');

    useEffect(() => {
      const root = document.documentElement;
      root.classList.toggle('dark');
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => (prev === 'light') ? 'dark' : 'light');
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}