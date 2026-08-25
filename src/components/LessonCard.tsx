'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { PromptLesson } from '@/types';
import ExerciseSection from './ExerciseSection';

interface LessonCardProps {
  lesson: PromptLesson;
}

export default function LessonCard({ lesson }: LessonCardProps) {
  const t = useTranslations('promptEngineering');
  const [activeTab, setActiveTab] = useState<'theory' | 'examples' | 'exercises'>('theory');

  const tabs = [
    { id: 'theory', label: t('theory') },
    { id: 'examples', label: t('examples') },
    ...(lesson.content.exercises && lesson.content.exercises.length > 0 
      ? [{ id: 'exercises', label: t('exercises') }] 
      : [])
  ];

  return (
    <div className="modern-card">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 bg-info-wash rounded-2xl flex items-center justify-center">
          <span className="text-info font-bold text-xl">{lesson.id}</span>
        </div>
        <div>
          <div className="text-t3 text-sm font-medium">
            {t('lesson')} {lesson.id} • {t('chapter')} {lesson.chapter}
          </div>
          <h2 className="text-3xl font-medium text-t1">
            {t(`lesson${lesson.id}.title`)}
          </h2>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-line mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as 'theory' | 'examples' | 'exercises')}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
 activeTab === tab.id
 ? 'border-info text-info '
 : 'border-transparent text-t2 hover:text-t1'
 }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="min-h-[300px]">
        {activeTab === 'theory' && (
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg text-t2 leading-relaxed">
              {lesson.content.theory}
            </p>
          </div>
        )}

        {activeTab === 'examples' && (
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-t1 mb-4">
              {t('practicalExamples')}
            </h3>
            <div className="space-y-4">
              {(Array.isArray(lesson.content.examples) ? lesson.content.examples : lesson.content.examples ? [lesson.content.examples] : [])?.map((example, index) => (
                <div
                  key={index}
                  className="bg-surface-2 rounded-lg p-4 border border-line"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-info-wash rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-info text-xs font-semibold">
                        {index + 1}
                      </span>
                    </div>
                    <p className="text-t2 text-sm font-mono leading-relaxed">
                      {example}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'exercises' && lesson.content.exercises && (
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-t1 mb-4">
              {t('practiceExercises')}
            </h3>
            {lesson.content.exercises.map((exercise, index) => (
              <ExerciseSection
                key={exercise.id}
                exercise={exercise}
                exerciseNumber={index + 1}
              />
            ))}
          </div>
        )}
      </div>

      {/* Prerequisites */}
      {lesson.prerequisites && lesson.prerequisites.length > 0 && (
        <div className="mt-8 pt-6 border-t border-line">
          <h4 className="text-sm font-medium text-t2 mb-3">
            {t('prerequisites')}
          </h4>
          <div className="flex flex-wrap gap-2">
            {lesson.prerequisites.map((prereqId) => (
              <span
                key={prereqId}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-surface-2 text-t2"
              >
                {t('lesson')} {prereqId}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}