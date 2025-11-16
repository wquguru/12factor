'use client';
import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { useParams } from 'next/navigation';
import { ArrowLeftIcon, BookOpenIcon, CodeBracketIcon, BeakerIcon } from '@heroicons/react/24/outline';
import LearningCard from '@/components/LearningCard';
import { useCourse } from './CourseProvider';
import { getCourseIds, getCourse } from '@/data/courses';

// Interface to match LearningCard expectations
interface LearningCardContent {
  id: string;
  title: string;
  theory: string;
  examples: string[];
  exercises?: Array<{
    id: string;
    instructions: string;
    template?: string;
    hints: string[];
  }>;
  practiceCount?: number;
  // Allow dynamic properties for chapter-specific content
  [key: string]: unknown;
}

export default function CourseLayout() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [currentMode, setCurrentMode] = useState<'learning' | 'practice' | 'playground'>('learning');
  const params = useParams();
  const locale = params.locale as string;
  const t = useTranslations('promptEngineering');
  const tCourses = useTranslations('courses');
  const tRoot = useTranslations();
  const { course, courseId } = useCourse();

  // Get course navigation info
  const allCourseIds = getCourseIds();
  const courseIndex = allCourseIds.findIndex(id => id === courseId);
  const prevCourseId = courseIndex > 0 ? allCourseIds[courseIndex - 1] : null;
  const nextCourseId = courseIndex < allCourseIds.length - 1 ? allCourseIds[courseIndex + 1] : null;
  const prevCourse = prevCourseId ? getCourse(prevCourseId) : null;
  const nextCourse = nextCourseId ? getCourse(nextCourseId) : null;

  // Helper function to translate keys based on their structure
  const translateKey = (key: string): string => {
    if (!key || typeof key !== 'string') return key;
    
    if (key.startsWith('courses.')) {
      try {
        return tCourses(key.replace('courses.', ''));
      } catch {
        return key;
      }
    } else if (key.startsWith('practiceExercises.') || key.startsWith('playground.')) {
      // These keys need to be accessed from the root with their full path
      try {
        // For hints that might contain placeholder patterns like {TOPIC}, provide them as literals
        const translated = tRoot.raw(key);
        // Check for double brackets first (literal text, not placeholders)
        if (typeof translated === 'string' && translated.includes('{{') && translated.includes('}}')) {
          // Double brackets are literal text, return as-is
          return translated;
        } else if (typeof translated === 'string' && translated.includes('{') && translated.includes('}')) {
          // Single brackets are placeholders
          const placeholders: Record<string, string> = {};
          const matches = translated.match(/\{([^}]+)\}/g);
          if (matches) {
            matches.forEach(match => {
              const varName = match.slice(1, -1);
              placeholders[varName] = match; // Keep the brackets
            });
          }
          return tRoot(key, placeholders);
        }
        return tRoot(key);
      } catch {
        return key;
      }
    } else if (
      key.startsWith('fundamentals.') ||
      key.startsWith('intermediate.') ||
      key.startsWith('advanced.') ||
      key.startsWith('bestPractice.')
    ) {
      try {
        return t(key);
      } catch {
        return key;
      }
    } else {
      // Try root translation for other keys
      try {
        return tRoot(key);
      } catch {
        return key;
      }
    }
  };

  // Prepare learning content
  const learningContent = course.content.sections?.map((section, index) => {
    // Find matching interactive examples for this section from practice content
    const sectionPracticeCount = course.practice?.filter(example => 
      example.title.includes(`${index + 1}章`)
    ).length || 0;
    
    // Resolve examples from translation key or array
    let resolvedExamples: string[] = [];
    if (Array.isArray(section.examples)) {
      // For intermediate course, examples are arrays of translation keys
      resolvedExamples = section.examples.map(key => translateKey(key));
    } else {
      // For fundamentals course, examples is a single translation key
      try {
        const examplesKey = section.examples as string;
        const examplesData = t.raw(examplesKey);
        if (Array.isArray(examplesData)) {
          resolvedExamples = examplesData;
        } else if (typeof examplesData === 'string') {
          resolvedExamples = [examplesData];
        } else {
          resolvedExamples = [examplesKey];
        }
      } catch {
        resolvedExamples = [section.examples as string];
      }
    }
    
    // Process exercises to resolve hints translation keys
    const processedExercises = section.exercises?.map(exercise => {
      let resolvedHints: string[] = [];
      
      if (Array.isArray(exercise.hints)) {
        const firstHint = exercise.hints[0];
        if (firstHint && firstHint.includes('.')) {
          resolvedHints = exercise.hints.map(hint => {
            try {
              return t(hint);
            } catch {
              return hint;
            }
          });
        } else {
          resolvedHints = exercise.hints;
        }
      } else if (typeof exercise.hints === 'string') {
        try {
          const hintsData = t.raw(exercise.hints);
          if (Array.isArray(hintsData)) {
            resolvedHints = hintsData;
          } else {
            resolvedHints = [t(exercise.hints)];
          }
        } catch {
          resolvedHints = [exercise.hints];
        }
      }
      
      return {
        ...exercise,
        instructions: t(exercise.instructions),
        template: exercise.template ? t(exercise.template) : '',
        hints: resolvedHints
      };
    }) || [];
    
    // Create processed section with translated content    
    const processedSection: LearningCardContent = {
      id: `section-${index}`,
      title: translateKey(section.title),
      theory: translateKey(section.theory),
      examples: resolvedExamples,
      exercises: processedExercises,
      practiceCount: sectionPracticeCount
    };

    // Process dynamic properties (chapter-specific content)
    Object.keys(section).forEach(key => {
      if (!['id', 'title', 'theory', 'examples', 'exercises'].includes(key)) {
        const value = section[key];
        
        // Handle arrays (like coreConcepts, keyTechniques, commonPitfalls)
        if (Array.isArray(value)) {
          // Translate array items if they are translation keys
          processedSection[key] = value.map(item => {
            if (typeof item === 'string' && item.includes('.')) {
              return translateKey(item);
            }
            return item;
          });
        } else if (typeof value === 'string' && value.includes('.')) {
          // Looks like a translation key
          try {
            const translatedValue = t.raw(value);
            if (typeof translatedValue === 'object' && translatedValue !== null) {
              processedSection[key] = {
                title: t(`${value}.title`),
                content: t(`${value}.content`)
              };
            } else {
              processedSection[key] = translateKey(value);
            }
          } catch {
            processedSection[key] = value;
          }
        } else {
          processedSection[key] = value;
        }
      }
    });
    
    return processedSection;
  }) || [];

  // Prepare practice content
  const practiceContent = course.practice?.map(example => {
    const resolveTranslationKey = (key: string): string => {
      return translateKey(key);
    };

    const resolveHintsArray = (hints: string | string[]): string[] => {
      if (Array.isArray(hints)) {
        return hints.map(hint => translateKey(hint));
      }
      try {
        const hintsData = t.raw(hints);
        if (Array.isArray(hintsData)) {
          return hintsData;
        }
        return [translateKey(hints)];
      } catch {
        return [hints];
      }
    };

    const resolvedVariations = example.variations?.map(variation => ({
      name: resolveTranslationKey(variation.name),
      prompt: variation.prompt,
      systemPrompt: variation.systemPrompt,
      explanation: resolveTranslationKey(variation.explanation)
    })) || [];

    return {
      id: example.id,
      title: resolveTranslationKey(example.title),
      description: resolveTranslationKey(example.description) || t('clickToStartPractice'),
      systemPrompt: example.systemPrompt,
      userPrompt: example.userPrompt,
      variants: resolvedVariations,
      expectedOutput: resolveTranslationKey(example.expectedOutput) || '',
      hints: resolveHintsArray(example.hints || [])
    };
  }) || [];

  // Prepare playground content
  const playgroundContent = course.playground?.map(scenario => {
    const resolveTranslationKey = (key: string): string => {
      return translateKey(key);
    };

    const processedExamples = scenario.examples.map(example => ({
      ...example,
      name: resolveTranslationKey(example.name),
      description: resolveTranslationKey(example.description),
      variations: example.variations.map(variation => ({
        ...variation,
        name: resolveTranslationKey(variation.name),
        explanation: resolveTranslationKey(variation.explanation)
      }))
    }));

    return {
      id: scenario.id,
      title: resolveTranslationKey(scenario.title),
      examples: processedExamples,
      hints: scenario.hints.map(hint => resolveTranslationKey(hint)),
      variations: processedExamples[0]?.variations || [] // Keep for backward compatibility
    };
  }) || [];

  const handleNext = useCallback(() => {
    const maxIndex = currentMode === 'practice' ? practiceContent.length - 1 : 
                    currentMode === 'playground' ? playgroundContent.length - 1 : 
                    learningContent.length - 1;
    if (currentCardIndex < maxIndex) {
      setCurrentCardIndex(currentCardIndex + 1);
    }
  }, [currentCardIndex, currentMode, practiceContent.length, playgroundContent.length, learningContent.length]);

  const handlePrev = useCallback(() => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  }, [currentCardIndex]);

  const handleModeChange = (newMode: 'learning' | 'playground' | 'practice') => {
    setCurrentMode(newMode);
    setCurrentCardIndex(0);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        handlePrev();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleNext, handlePrev]);

  const getCourseIcon = (icon: string) => {
    switch (icon) {
      case 'book':
        return <BookOpenIcon className="h-6 w-6" />;
      case 'code':
        return <CodeBracketIcon className="h-6 w-6" />;
      default:
        return <BeakerIcon className="h-6 w-6" />;
    }
  };

  const getCourseTitle = (courseId: string) => {
    switch (courseId) {
      case 'fundamentals':
        return t('course.fundamentals.title');
      case 'intermediate':
        return t('course.intermediate.title');
      case 'advanced':
        return t('course.advanced.title');
      case 'best-practice':
        return t('course.bestPractice.title');
      default:
        return 'Course';
    }
  };

  const getCourseSummary = (courseId: string) => {
    switch (courseId) {
      case 'fundamentals':
        return t('course.fundamentals.summary');
      case 'intermediate':
        return t('course.intermediate.summary');
      case 'advanced':
        return t('course.advanced.summary');
      case 'best-practice':
        return t('course.bestPractice.summary');
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <div className="hero-gradient relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-24">
          <div className="max-w-5xl">
            <Link
              href="/prompt-engineering"
              locale={locale}
              className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              {t('backToLessons')}
            </Link>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20">
                <div className="text-white">
                  {getCourseIcon(course.content.icon)}
                </div>
              </div>
              <div>
                <div className="text-white/70 text-sm font-medium uppercase tracking-wide">
                  {t('integratedCourse')}
                </div>
                <h1 className="text-4xl md:text-5xl font-light text-white leading-tight">
                  {getCourseTitle(courseId)}
                </h1>
              </div>
            </div>
            
            <p className="text-xl text-white/90 max-w-3xl leading-relaxed font-light">
              {getCourseSummary(courseId)}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Card-based Learning */}
          {learningContent.length > 0 && (
            <LearningCard
              learningContent={learningContent}
              practiceContent={practiceContent}
              playgroundContent={playgroundContent}
              currentIndex={currentCardIndex}
              currentMode={currentMode}
              onNext={handleNext}
              onPrev={handlePrev}
              onModeChange={handleModeChange}
              canGoNext={currentCardIndex < (currentMode === 'practice' ? practiceContent.length - 1 : 
                         currentMode === 'playground' ? playgroundContent.length - 1 : 
                         learningContent.length - 1)}
              canGoPrev={currentCardIndex > 0}
            />
          )}

          {/* Course Navigation */}
          <section className="mt-16 pt-12 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-center">
              <div className="flex items-center gap-8">
                {prevCourse && (
                  <Link
                    href={{
                      pathname: '/prompt-engineering/[course]',
                      params: { course: prevCourseId!.toString() }
                    }}
                    locale={locale}
                    className="flex items-center gap-3 px-6 py-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-[#98a971]/30 dark:hover:border-[#98a971]/30 hover:shadow-md transition-all"
                  >
                    <ArrowLeftIcon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300">{t('previousCourse')}</span>
                  </Link>
                )}
                
                <div className="flex items-center gap-2 px-4 py-2 bg-[#98a971]/10 rounded-full">
                  <div className="w-2 h-2 bg-[#98a971] rounded-full"></div>
                  <span className="text-sm text-[#98a971] font-medium">
                    {courseIndex + 1} / {allCourseIds.length}
                  </span>
                </div>
                
                {nextCourse && (
                  <Link
                    href={{
                      pathname: '/prompt-engineering/[course]',
                      params: { course: nextCourseId!.toString() }
                    }}
                    locale={locale}
                    className="flex items-center gap-3 px-6 py-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-[#98a971]/30 dark:hover:border-[#98a971]/30 hover:shadow-md transition-all"
                  >
                    <span className="text-gray-700 dark:text-gray-300">{t('nextCourse')}</span>
                    <ArrowLeftIcon className="h-4 w-4 text-gray-600 dark:text-gray-400 rotate-180" />
                  </Link>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
