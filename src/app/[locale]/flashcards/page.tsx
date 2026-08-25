'use client';

import { useState, useEffect, useSyncExternalStore } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { principles } from '@/data/principles';
import FlashCard from '@/components/FlashCard';
import * as store from '@/lib/flashcardStore';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

export default function FlashcardsPage() {
  const t = useTranslations('flashcards');
  const locale = useLocale();
  // Progress and position live in localStorage; React subscribes to that store
  // instead of copying it into state inside a mount effect.
  const currentIndex = useSyncExternalStore(store.subscribe, store.getIndex, store.serverIndex);
  const progress = useSyncExternalStore(store.subscribe, store.getProgress, store.serverProgress);
  const setProgress = store.setProgress;
  const setCurrentIndex = store.setIndex;
  const [isFlipped, setIsFlipped] = useState(false);

  const currentPrinciple = principles[currentIndex];

  // Mark the card being viewed as "learning". Writes go straight to the store,
  // so this effect updates an external system rather than calling setState.
  useEffect(() => {
    if (progress.length === 0) return;
    const current = progress.find(p => p.principleId === currentPrinciple.id);
    if (current?.status !== 'learning') {
      store.setProgress(progress.map(p =>
        p.principleId === currentPrinciple.id
          ? { ...p, status: 'learning' as const, lastReviewed: new Date() }
          : p
      ));
    }
  }, [currentIndex, currentPrinciple, progress]);

  const handleNext = () => {
    setIsFlipped(false); // always show the front of the next card
    setCurrentIndex((currentIndex + 1) % principles.length);
  };

  const handlePrevious = () => {
    setIsFlipped(false);
    setCurrentIndex((currentIndex - 1 + principles.length) % principles.length);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleMarkMastered = () => {
    if (!isFlipped) return; // Can only mark as mastered after seeing the back
    
    const updatedProgress = progress.map(p => 
      p.principleId === currentPrinciple.id
        ? { ...p, status: 'mastered' as const, lastReviewed: new Date() }
        : p
    );
    setProgress(updatedProgress);
    
    // Auto advance to next card after marking as mastered
    setTimeout(() => {
      handleNext();
    }, 500);
  };

  const handleMarkNeedsReview = () => {
    if (!isFlipped) return; // Can only mark as needs review after seeing the back
    
    const updatedProgress = progress.map(p => 
      p.principleId === currentPrinciple.id
        ? { ...p, status: 'needs_review' as const, lastReviewed: new Date() }
        : p
    );
    setProgress(updatedProgress);
    
    // Auto advance to next card after marking as needs review  
    setTimeout(() => {
      handleNext();
    }, 500);
  };

  const currentProgress = progress.find(p => p.principleId === currentPrinciple.id);

  return (
    <div className="min-h-screen bg-bg">
      {/* Hero Section */}
      <div className="hero-gradient relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-32 sm:pb-24">
          <div className="max-w-5xl">
            <h1 className="hero-text text-hero mb-8">
              {t('title')}
            </h1>
            
            <p className="text-xl text-hero-2 mb-12 max-w-3xl leading-relaxed font-light">
              {t('subtitle')}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link
                href="/principles"
                locale={locale}
                className="btn-secondary btn-on-hero"
              >
                {t('studyPrinciples')}
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
              document.getElementById('practice-content')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group flex flex-col items-center text-hero-2 hover:text-hero transition-all duration-300 hover:scale-110"
            aria-label="Scroll to practice content"
          >
            <div className="text-xs sm:text-sm font-medium mb-2 opacity-80 group-hover:opacity-100 whitespace-nowrap px-2">
              {t('startPracticing')}
            </div>
            <div className="w-10 h-10 rounded-full border border-hero-line bg-hero-glass backdrop-blur-sm flex items-center justify-center group-hover:bg-hero-glass group-hover:border-hero-line transition-all duration-300">
              <ChevronDownIcon className="h-5 w-5 animate-bounce" />
            </div>
          </button>
        </div>
        
        {/* Stats Overlay */}
        <div className="absolute top-24 right-12 hidden lg:block">
          <div className="bg-hero-glass backdrop-blur-sm rounded-3xl p-6 border border-hero-line">
            <div className="stat-number text-hero">{Math.round(((currentIndex + 1) / principles.length) * 100)}</div>
            <div className="text-hero-2 font-medium">{t('progress')}</div>
            <div className="text-xs text-hero-2 mt-1">{currentIndex + 1} {t('of')} {principles.length}</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div id="practice-content" className="py-32 bg-bg">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">

          {/* Progress Section */}
          <div className="mb-16">
            <h2 className="text-6xl md:text-7xl font-light text-t1 mb-8 leading-tight">
              {t('practiceSession')}
            </h2>
            <p className="text-lg text-t2 max-w-3xl font-light leading-relaxed mb-8">
              {t('practiceDescription')}
            </p>
            
            {/* Enhanced Progress bar */}
            <div className="mb-8">
              <div className="flex justify-between text-sm text-t2 mb-4">
                <span className="font-medium">{t('learningProgress')}</span>
                <span className="font-medium">{currentIndex + 1} / {principles.length}</span>
              </div>
              <div className="w-full bg-surface-3 rounded-full h-3">
                <div 
                  className="bg-accent-solid h-3 rounded-full transition-all duration-300 shadow-lg"
                  style={{ width: `${((currentIndex + 1) / principles.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

        {/* FlashCard */}
        <FlashCard 
          principle={currentPrinciple}
          onNext={handleNext}
          onPrevious={handlePrevious}
          isFlipped={isFlipped}
          onFlip={handleFlip}
        />

          {/* Action buttons */}
          <div className="flex justify-center space-x-6 mt-12">
            <button
              onClick={handleMarkNeedsReview}
              disabled={!isFlipped}
              className={`px-8 py-4 rounded-full font-medium transition-all duration-200 ${
 !isFlipped
 ? 'bg-surface-3 text-t3 cursor-not-allowed opacity-50'
 : currentProgress?.status === 'needs_review'
 ? 'bg-t2 text-bg shadow-lg transform scale-105'
 : 'bg-surface-2 hover:bg-surface-3 text-t1 hover:shadow-md cursor-pointer'
 }`}
            >
              {t('needsReview')}
            </button>
            <button
              onClick={handleMarkMastered}
              disabled={!isFlipped}
              className={`px-8 py-4 rounded-full font-medium transition-all duration-200 ${
 !isFlipped
 ? 'bg-surface-3 text-t3 cursor-not-allowed opacity-50'
 : currentProgress?.status === 'mastered'
 ? 'bg-accent-solid text-accent-on shadow-lg transform scale-105'
 : 'bg-accent-wash hover:bg-accent-washHover text-accent hover:shadow-md cursor-pointer'
 }`}
            >
              {t('mastered')}
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}