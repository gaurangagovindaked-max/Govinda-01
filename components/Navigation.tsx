import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Theme } from '../types';

interface NavigationProps {
  theme: Theme;
  toggleTheme: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ theme, toggleTheme }) => {
  const isDark = theme === 'dark';

  return (
    <div className="w-full flex justify-end p-4">
      <button
        onClick={toggleTheme}
        className="p-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
        aria-label="Toggle theme"
      >
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </div>
  );
};
