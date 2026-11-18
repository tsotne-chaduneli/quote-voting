import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import QuoteList from "./componets/QuoteList";
import './css/styles.css';
import { ThemeProvider } from "./context/ThemeProvider";

createRoot(document.getElementById('shell')!).render(
    <StrictMode>
        <ThemeProvider>
            <QuoteList />
        </ThemeProvider>
    </StrictMode>
)