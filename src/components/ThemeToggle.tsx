'use client';

import { useTheme } from '@/providers/ThemeProvider';
import { CheckIcon } from './icons';
import { SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';
import { useState, useRef, useEffect } from 'react';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const themes = [
    { value: 'light' as const, label: 'Light', icon: SunIcon },
    { value: 'dark' as const, label: 'Dark', icon: MoonIcon },
    { value: 'system' as const, label: 'System', icon: ComputerDesktopIcon },
  ];

  const CurrentIcon = theme === 'light' ? SunIcon : 
                      theme === 'dark' ? MoonIcon : 
                      ComputerDesktopIcon;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg hover:bg-surface-2 transition-colors"
        aria-label="Toggle theme"
      >
        <CurrentIcon className="w-5 h-5 text-t2" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 rounded-lg shadow-lg bg-surface-1 border border-line py-1 z-50">
          {themes.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              onClick={() => {
                setTheme(value);
                setIsOpen(false);
              }}
              className={`w-full px-3 py-2 text-left flex items-center gap-2 hover:bg-surface-2 transition-colors ${
 theme === value ? 'text-accent ' : 'text-t2 '
 }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm">{label}</span>
              {theme === value && (
                <CheckIcon className="w-4 h-4 ml-auto" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}