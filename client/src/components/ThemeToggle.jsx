import React, { useContext } from 'react';
import ThemeContext from '../context/ThemeContext';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle = () => {
    const { isDark, toggleTheme } = useContext(ThemeContext);

    return (
        <button
            onClick={toggleTheme}
            className="theme-fab"
            aria-label="Toggle dark mode"
        >
            {isDark ? <Sun size={22} /> : <Moon size={22} />}
        </button>
    );
};

export default ThemeToggle;
