'use client';
import { useTranslations, useMessages } from 'next-intl';
import { principles, stages } from '@/data/principles';
import { Link } from '@/i18n/routing';
import { ArrowLeftIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useParams, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function PrinciplesContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const locale = params.locale as string;
  const stage = searchParams.get('stage');
  const t = useTranslations('principles');
  const tQuiz = useTranslations('quiz');
  const tFlashcards = useTranslations('flashcards');
  const messages = useMessages() as {
    quiz?: Record<string, {
      name?: string;
      concept?: string;
      practices?: string[];
      antiPatterns?: string[];
    }>;
  };
  const stageFilter = stage ? parseInt(stage) : null;
  
  const filteredPrinciples = stageFilter 
    ? principles.filter(p => p.stage === stageFilter)
    : [];
    
  const currentStage = stageFilter ? stages.find(s => s.id === stageFilter) : null;


  return (
    <div className="min-h-screen bg-bg">
      {/* Hero Section */}
      <div className="hero-gradient relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-32 sm:pb-24">
          <div className="max-w-5xl">
            {stageFilter && (
              <Link
                href="/principles"
                locale={locale}
                className="inline-flex items-center text-hero-2 hover:text-hero mb-6"
              >
                <ArrowLeftIcon className="h-4 w-4 mr-2" />
                {t('backToStages')}
              </Link>
            )}
            
            <h1 className="hero-text text-hero mb-8">
              {currentStage ? tQuiz(`${currentStage.messageKey}.name`) : t('fallbackTitle')}
            </h1>
            
            <p className="text-xl text-hero-2 mb-12 max-w-3xl leading-relaxed font-light">
              {currentStage ? 
                tQuiz(`${currentStage.messageKey}.description`) : 
                t('fallbackDescription')
              }
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link
                href="/flashcards"
                locale={locale}
                className="btn-secondary btn-on-hero"
              >
                {t('practiceWithFlashcards')}
              </Link>
              
              <Link
                href="/quiz"
                locale={locale}
                className="btn-secondary btn-on-hero"
              >
                {t('takeQuiz')}
              </Link>
            </div>
          </div>
        </div>
        
        {/* Scroll Down Arrow */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <button
            onClick={() => {
              const targetId = stageFilter ? 'stage-content' : 'learning-paths';
              document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group flex flex-col items-center text-hero-2 hover:text-hero transition-all duration-300 hover:scale-110"
            aria-label={stageFilter ? "Scroll to stage content" : "Scroll to learning paths"}
          >
            <div className="text-xs sm:text-sm font-medium mb-2 opacity-80 group-hover:opacity-100 whitespace-nowrap px-2">
              {stageFilter ? t('viewPrinciples') : t('chooseLearningPath')}
            </div>
            <div className="w-10 h-10 rounded-full border border-hero-line bg-hero-glass backdrop-blur-sm flex items-center justify-center group-hover:bg-hero-glass group-hover:border-hero-line transition-all duration-300">
              <ChevronDownIcon className="h-5 w-5 animate-bounce" />
            </div>
          </button>
        </div>
        
        {/* Stats Overlay */}
        <div className="absolute top-24 right-12 hidden lg:block">
          <div className="bg-hero-glass backdrop-blur-sm rounded-3xl p-6 border border-hero-line">
            <div className="stat-number text-hero">{stageFilter ? filteredPrinciples.length : principles.length}</div>
            <div className="text-hero-2 font-medium">
              {stageFilter ? t('stageLabel') : t('coreLabel')}
            </div>
            <div className="text-xs text-hero-2 mt-1">{t('fourStageMethodology')}</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div id="stage-content" className="py-32 bg-bg">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">

          {stageFilter ? (
            <>
              <div className="mb-16">
                <h2 className="text-6xl md:text-7xl font-light text-t1 mb-8 leading-tight">
                  {t(`stage${stageFilter}Title`)}
                </h2>
                <p className="text-lg text-t2 max-w-3xl font-light leading-relaxed">
                  {t(`stage${stageFilter}Description`)}
                </p>
              </div>

              {/* Principles Grid */}
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredPrinciples.map((principle) => (
              <div
                key={principle.id}
                className="modern-card group hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-accent-wash rounded-2xl flex items-center justify-center">
                      <span className="text-accent font-semibold">{principle.id}</span>
                    </div>
                    <div className="text-sm text-t3 font-medium">
                      {t('stage')} {principle.stage}
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-medium text-t1 mb-4 leading-tight">
                  {tQuiz(`${principle.messageKey}.name`)}
                </h3>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-t2 mb-3 text-sm uppercase tracking-wide">
                      {t('concept')}
                    </h4>
                    <p className="text-t2 text-sm leading-relaxed">
                      {tQuiz(`${principle.messageKey}.concept`)}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-t2 mb-3 text-sm uppercase tracking-wide">
                      {t('practices')}
                    </h4>
                    <ul className="space-y-2">
                      {(messages.quiz?.[principle.messageKey]?.practices || []).map((practice: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-accent-wash0 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-t2 text-sm leading-relaxed">{practice}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-t2 mb-3 text-sm uppercase tracking-wide">
                      {t('antiPatterns')}
                    </h4>
                    <ul className="space-y-2">
                      {(messages.quiz?.[principle.messageKey]?.antiPatterns || []).map((pattern: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-danger-wash0 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-t2 text-sm leading-relaxed">{pattern}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stage Navigation */}
          <div className="mt-16 flex justify-between items-center gap-4">
            {stageFilter > 1 ? (
              <Link
                href={{
                  pathname: '/principles',
                  query: { stage: stageFilter - 1 }
                }}
                locale={locale}
                className="inline-flex items-center px-3 py-2 sm:px-6 sm:py-3 text-sm sm:text-base rounded-full border bg-surface-1 border-line-control text-t2 hover:bg-surface-2 hover:border-line-control hover:text-t1 transition-colors"
              >
                <ChevronLeftIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 inline-block flex-shrink-0" />
                <span className="hidden sm:inline">{t('previousStage')}</span>
                <span className="sm:hidden">{tFlashcards('previous')}</span>
              </Link>
            ) : (
              <div />
            )}
            
            {stageFilter < 4 ? (
              <Link
                href={{
                  pathname: '/principles',
                  query: { stage: stageFilter + 1 }
                }}
                locale={locale}
                className="inline-flex items-center px-3 py-2 sm:px-6 sm:py-3 text-sm sm:text-base rounded-full border bg-surface-1 border-line-control text-t2 hover:bg-surface-2 hover:border-line-control hover:text-t1 ml-auto transition-colors"
              >
                <span className="hidden sm:inline">{t('nextStage')}</span>
                <span className="sm:hidden">{tFlashcards('next')}</span>
                <ChevronRightIcon className="h-4 w-4 sm:h-5 sm:w-5 ml-1 sm:ml-2 inline-block flex-shrink-0" />
              </Link>
            ) : (
              <div />
            )}
          </div>
            </>
          ) : (
            <>
              <div id="learning-paths" className="text-center mb-20">
                <h2 className="text-6xl md:text-7xl font-light text-t1 mb-8 leading-tight">
                  {t('chooseLearningPath')}
                </h2>
                <p className="text-lg text-t2 max-w-3xl mx-auto font-light leading-relaxed">
                  {t('chooseLearningPathDescription')}
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                {stages.map((stage) => (
                  <Link
                    key={stage.id}
                    href={{
                      pathname: '/principles',
                      query: { stage: stage.id }
                    }}
                    locale={locale}
                    className="modern-card group hover:shadow-2xl transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-accent-wash rounded-2xl flex items-center justify-center group-hover:bg-accent-solid transition-colors">
                        <span className="text-accent font-bold text-xl">{stage.id}</span>
                      </div>
                      <div>
                        <h3 className="text-2xl font-medium text-t1 mb-1">{tQuiz(`${stage.messageKey}.name`)}</h3>
                        <div className="text-sm text-accent font-medium">{stage.principles.length} {t('principlesCount')}</div>
                      </div>
                    </div>
                    <p className="text-t2 text-sm leading-relaxed">
                      {tQuiz(`${stage.messageKey}.description`)}
                    </p>
                  </Link>
                ))}
              </div>
            </>
          )}

        </div>
      </div>

    </div>
  );
}

export default function PrinciplesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PrinciplesContent />
    </Suspense>
  );
}