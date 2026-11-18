import { useTheme } from "../../utilities/useTheme";

export function ToggleButton() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button 
        onClick={toggleTheme}
        className="my-3 border rounded-sm self-center px-5 py-1 cursor-pointer"
        >
            Switch to {theme === 'light' ? 'dark' : 'light'} mode
        </button>
    )
}