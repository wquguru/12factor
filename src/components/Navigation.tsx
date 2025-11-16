'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { useState, useEffect, useRef } from 'react';
import { ChevronDownIcon, GlobeAltIcon, SparklesIcon } from '@heroicons/react/24/outline';
import SocialShare from './SocialShare';
import ThemeToggle from './ThemeToggle';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function Navigation() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations('common');
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

  // Close language menu when language is changed
  // next-intl will automatically handle cookie management
  const handleLanguageChange = () => {
    setIsLangMenuOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setIsLangMenuOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
        setIsLangMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    
    // Prevent body scroll when mobile menu is open
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navigationItems = [
    { name: t('principles'), href: '/principles' as const },
    { name: t('flashcards'), href: '/flashcards' as const },
    { name: t('quiz'), href: '/quiz' as const },
    { name: t('promptEngineering'), href: '/prompt-engineering' as const }
  ];

  // Function to safely map dynamic routes back to their base routes
  const getNavigableHref = (currentPath: string): "/" | "/principles" | "/flashcards" | "/quiz" | "/prompt-engineering" => {
    if (currentPath.startsWith('/prompt-engineering/')) {
      return '/prompt-engineering';
    }
    if (currentPath === '/principles' || currentPath === '/flashcards' || currentPath === '/quiz' || currentPath === '/prompt-engineering') {
      return currentPath as "/" | "/principles" | "/flashcards" | "/quiz" | "/prompt-engineering";
    }
    return '/';
  };

  return (
    <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 text-xl font-medium text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
              <div className="w-8 h-8 bg-gray-900 dark:bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-white dark:border-gray-900 rounded"></div>
              </div>
              12Factor
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors relative inline-flex items-center gap-1"
              >
                {item.name}
                {item.href === '/prompt-engineering' && (
                  <SparklesIcon
                    className="h-3 w-3 absolute -top-1 -right-3"
                    style={{ color: 'var(--primary-green)' }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {/* GitHub Button - Mobile/Tablet only */}
            <a
              href="https://github.com/wquguru/12factor"
              target="_blank"
              rel="noopener noreferrer"
              className="lg:hidden flex items-center text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors group"
              aria-label="Star on GitHub"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd"/>
              </svg>
              <span className="hidden sm:inline">{t('github')}</span>
            </a>
            
            <div className="relative" ref={langMenuRef}>
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              >
                <GlobeAltIcon className="h-4 w-4 mr-2" />
                {locale === 'zh' ? t('languageLabels.chinese') : t('languageLabels.english')}
                <ChevronDownIcon className="h-4 w-4 ml-1" />
              </button>
              {isLangMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 z-50">
                  <Link
                    href={getNavigableHref(pathname)}
                    locale="en"
                    className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-t-2xl transition-colors"
                    onClick={handleLanguageChange}
                  >
                    {t('languageLabels.english')}
                  </Link>
                  <Link
                    href={getNavigableHref(pathname)}
                    locale="zh"
                    className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-b-2xl transition-colors"
                    onClick={handleLanguageChange}
                  >
                    {t('languageLabels.chinese')}
                  </Link>
                </div>
              )}
            </div>
            
            <div className="hidden sm:block">
              <ThemeToggle />
            </div>
            
            <SocialShare />
          </div>
        </div>
        
        {/* Mobile menu overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute inset-x-0 top-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-xl z-40 max-h-[calc(100vh-5rem)] overflow-y-auto overscroll-contain">
            <div className="max-w-6xl mx-auto">
              {/* Regular navigation items */}
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-6 py-4 text-base font-medium text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-colors relative"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="inline-flex items-center gap-1">
                    {item.name}
                    {item.href === '/prompt-engineering' && (
                      <SparklesIcon
                        className="h-3 w-3"
                        style={{ color: 'var(--primary-green)' }}
                      />
                    )}
                  </span>
                </Link>
              ))}
              
              {/* Language and theme controls */}
              <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <GlobeAltIcon className="h-4 w-4 mr-2 text-gray-600 dark:text-gray-400" />
                      <div className="flex space-x-2">
                        <Link
                          href={getNavigableHref(pathname)}
                          locale="en"
                          className={`px-3 py-1 text-sm font-medium rounded-lg transition-colors ${
                            locale === 'en' 
                              ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900' 
                              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                          }`}
                          onClick={() => {
                            handleLanguageChange();
                            setIsMobileMenuOpen(false);
                          }}
                        >
                          EN
                        </Link>
                        <Link
                          href={getNavigableHref(pathname)}
                          locale="zh"
                          className={`px-3 py-1 text-sm font-medium rounded-lg transition-colors ${
                            locale === 'zh' 
                              ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900' 
                              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                          }`}
                          onClick={() => {
                            handleLanguageChange();
                            setIsMobileMenuOpen(false);
                          }}
                        >
                          中文
                        </Link>
                      </div>
                    </div>
                    
                    <ThemeToggle />
                  </div>
                  
                  <SocialShare />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
