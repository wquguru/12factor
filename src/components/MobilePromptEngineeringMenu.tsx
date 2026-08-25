'use client';

import { useState } from 'react';
import { CheckIcon } from './icons';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { getAllCourses } from '@/data/courses';

interface MobilePromptEngineeringMenuProps {
  onLinkClick?: () => void;
}

export default function MobilePromptEngineeringMenu({ onLinkClick }: MobilePromptEngineeringMenuProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const t = useTranslations('common');
  const tPE = useTranslations('promptEngineering');
  const locale = useLocale();

  const handleLinkClick = () => {
    setIsExpanded(false);
    onLinkClick?.();
  };

  return (
    <div className="border-b border-line">
      {/* Main Toggle */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-6 py-4 text-base font-medium text-accent hover:bg-accent-wash transition-colors"
      >
        <div className="flex items-center">
          <span>{t('more')}</span>
        </div>
        <ChevronDownIcon className={`h-5 w-5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="bg-accent-wash">
          {/* Prompt Engineering Section */}
          <div className="px-6 py-2 bg-surface-2 border-b border-line">
            <h3 className="text-xs font-semibold text-t3 uppercase tracking-wider">
              {t('promptEngineering')}
            </h3>
          </div>
          
          {/* Overview */}
          <Link
            href="/prompt-engineering"
            locale={locale}
            className="flex items-center gap-3 px-8 py-3 text-sm text-t2 hover:bg-accent-wash transition-colors"
            onClick={handleLinkClick}
          >
            <span className="text-info">📖</span>
            <div>
              <div className="font-medium">{tPE('learningPath')}</div>
              <div className="text-xs text-t3">
                {tPE('learningPathDescription')}
              </div>
            </div>
          </Link>

          {/* Courses */}
          {getAllCourses().map((course, index) => {
            const getCourseTitle = (id: string) => {
              switch (id) {
                case 'fundamentals':
                  return tPE('course.fundamentals.title');
                case 'intermediate':
                  return tPE('course.intermediate.title');
                case 'advanced':
                  return tPE('course.advanced.title');
                default:
                  return 'Course';
              }
            };

            const getCourseSummary = (id: string) => {
              switch (id) {
                case 'fundamentals':
                  return tPE('course.fundamentals.summary');
                case 'intermediate':
                  return tPE('course.intermediate.summary');
                case 'advanced':
                  return tPE('course.advanced.summary');
                default:
                  return '';
              }
            };

            return (
              <Link
                key={course.content.id}
                href={{
                  pathname: '/prompt-engineering/[course]',
                  params: { course: course.content.id.toString() }
                }}
                locale={locale}
                className="flex items-center gap-3 px-8 py-3 text-sm text-t2 hover:bg-accent-wash transition-colors"
                onClick={handleLinkClick}
              >
                <div className="w-6 h-6 bg-accent-wash border border-accent rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-accent text-xs font-semibold">
                    {index + 1}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-medium">{getCourseTitle(course.content.id)}</div>
                  <div className="text-xs text-t3 line-clamp-1">
                    {getCourseSummary(course.content.id)}
                  </div>
                </div>
                <ChevronRightIcon className="h-4 w-4 text-t3" />
              </Link>
            );
          })}

          {/* 12Factor Methodology Section */}
          <div className="px-6 py-2 bg-surface-2 border-y border-line mt-2">
            <h3 className="text-xs font-semibold text-t3 uppercase tracking-wider">
              12FACTOR METHODOLOGY
            </h3>
          </div>

          {/* 12Factor Links */}
          <Link
            href="/principles"
            locale={locale}
            className="flex items-center gap-3 px-8 py-3 text-sm text-t2 hover:bg-accent-wash transition-colors"
            onClick={handleLinkClick}
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <span className="text-t3">📋</span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-medium">{t('principles')}</div>
              <div className="text-xs text-t3">
                Learn 12 core principles and best practices
              </div>
            </div>
          </Link>

          <Link
            href="/flashcards"
            locale={locale}
            className="flex items-center gap-3 px-8 py-3 text-sm text-t2 hover:bg-accent-wash transition-colors"
            onClick={handleLinkClick}
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <span className="text-t3">🎴</span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-medium">{t('flashcards')}</div>
              <div className="text-xs text-t3">
                Reinforce learning through interactive cards
              </div>
            </div>
          </Link>

          <Link
            href="/quiz"
            locale={locale}
            className="flex items-center gap-3 px-8 py-3 text-sm text-t2 hover:bg-accent-wash transition-colors"
            onClick={handleLinkClick}
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <CheckIcon className="w-4 h-4 text-accent" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-medium">{t('quiz')}</div>
              <div className="text-xs text-t3">
                Test your understanding of 12Factor principles
              </div>
            </div>
          </Link>

          {/* Resources Section */}
          <div className="px-6 py-2 bg-surface-2 border-y border-line">
            <h3 className="text-xs font-semibold text-t3 uppercase tracking-wider">
              RESOURCES
            </h3>
          </div>

          <a
            href="https://github.com/wquguru/12factor"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-8 py-3 text-sm text-t2 hover:bg-accent-wash transition-colors"
            onClick={handleLinkClick}
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd"/>
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-medium">GitHub Repository</div>
              <div className="text-xs text-t3">
                View source code and contribute to the project
              </div>
            </div>
          </a>

          {/* Coming Soon */}
          <div className="px-8 py-3 text-center border-t border-line">
            <div className="text-xs text-t3">
              高级 & 实践课程即将推出 🚧
            </div>
          </div>
        </div>
      )}
    </div>
  );
}