type Theme = 'light' | 'dark';
type createContextProps = {
    theme: Theme;
    toggleTheme: () => void;
} | undefined;
type ThemeProviderProps = {
    children: React.ReactNode
};

export type { 
    Theme,
    createContextProps,
    ThemeProviderProps,
}