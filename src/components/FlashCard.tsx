'use client';

import { motion } from 'framer-motion';
import { CheckIcon, CrossIcon } from './icons';
import { useTranslations, useMessages } from 'next-intl';
import { Principle } from '@/types';
import { useWebView } from '@/providers/WebViewProvider';

interface FlashCardProps {
  principle: Principle;
  onNext: () => void;
  onPrevious: () => void;
  showNavigation?: boolean;
  isFlipped: boolean;
  onFlip: () => void;
}

export default function FlashCard({ 
  principle, 
  onNext, 
  onPrevious, 
  showNavigation = true,
  isFlipped,
  onFlip
}: FlashCardProps) {
  const t = useTranslations('principles');
  const tQuiz = useTranslations('quiz');
  const tFlash = useTranslations('flashcards');
  const { isWebView } = useWebView();
  
  const messages = useMessages() as {
    quiz?: Record<string, {
      name?: string;
      concept?: string;
      practices?: string[];
      antiPatterns?: string[];
    }>;
  };

  // The four stages are distinguished by hue, not by an escalating tint —
  // see --stage-N in globals.css (equal OKLCH lightness and chroma).
  const stageColors = {
    1: 'bg-stage1-wash',
    2: 'bg-stage2-wash',
    3: 'bg-stage3-wash',
    4: 'bg-stage4-wash'
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Card */}
      <div className="relative h-96 mb-6">
        {isWebView ? (
          // WebView-friendly version with simple opacity transition
          <div className="relative h-full" onClick={onFlip}>
            <motion.div
              className="absolute inset-0 cursor-pointer"
              animate={{ 
                opacity: isFlipped ? 0 : 1,
                scale: isFlipped ? 0.95 : 1
              }}
              transition={{ duration: 0.3 }}
              style={{ pointerEvents: isFlipped ? 'none' : 'auto' }}
            >
              <div className={`h-full ${stageColors[principle.stage as keyof typeof stageColors]} rounded-xl shadow-lg p-8 flex flex-col justify-center border border-accent `}>
                <div className="text-center">
                  <div className="text-sm text-t2 opacity-70 mb-2 font-medium">
                    {tFlash('stage')} {principle.stage}
                  </div>
                  <h2 className="text-3xl font-bold mb-6 text-t1">
                    {tQuiz(`${principle.messageKey}.name`)}
                  </h2>
                  <div className="text-lg opacity-80 text-t2">
                    {tQuiz(`${principle.messageKey}.concept`)}
                  </div>
                  <div className="mt-8 text-sm opacity-60 text-t2">
                    {tFlash('flip')}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="absolute inset-0 cursor-pointer"
              animate={{ 
                opacity: isFlipped ? 1 : 0,
                scale: isFlipped ? 1 : 0.95
              }}
              transition={{ duration: 0.3 }}
              style={{ pointerEvents: isFlipped ? 'auto' : 'none' }}
            >
              <div className="h-full bg-surface-1 rounded-xl shadow-lg p-8 flex flex-col justify-center border border-accent">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-accent mb-3">
                      {t('practices')}
                    </h3>
                    <ul className="space-y-2">
                      {(messages.quiz?.[principle.messageKey]?.practices || []).map((practice: string, index: number) => (
                        <li key={index} className="flex items-start text-t2">
                          <CheckIcon className="w-4 h-4 text-accent mr-3 mt-1 flex-shrink-0" />
                          <span className="text-sm">{practice}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-t1 mb-3">
                      {t('antiPatterns')}
                    </h3>
                    <ul className="space-y-2">
                      {(messages.quiz?.[principle.messageKey]?.antiPatterns || []).map((pattern: string, index: number) => (
                        <li key={index} className="flex items-start text-t2">
                          <CrossIcon className="w-4 h-4 text-danger mr-3 mt-1 flex-shrink-0" />
                          <span className="text-sm">{pattern}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="text-center mt-6 text-sm text-t3">
                  {tFlash('flipBack')}
                </div>
              </div>
            </motion.div>
          </div>
        ) : (
          // Normal 3D flip for regular browsers
          <motion.div
            className="absolute inset-0 cursor-pointer preserve-3d"
            style={{ transformStyle: 'preserve-3d' }}
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6 }}
            onClick={onFlip}
          >
            {/* Front of card */}
            <div className="absolute inset-0 backface-hidden">
              <div className={`h-full ${stageColors[principle.stage as keyof typeof stageColors]} backdrop-blur-sm rounded-xl shadow-2xl p-8 flex flex-col justify-center border border-accent `}>
                <div className="text-center">
                  <div className="text-sm text-t2 opacity-70 mb-2 font-medium">
                    {tFlash('stage')} {principle.stage}
                  </div>
                  <h2 className="text-3xl font-bold mb-6 text-t1">
                    {tQuiz(`${principle.messageKey}.name`)}
                  </h2>
                  <div className="text-lg opacity-80 text-t2">
                    {tQuiz(`${principle.messageKey}.concept`)}
                  </div>
                  <div className="mt-8 text-sm opacity-60 text-t2">
                    {tFlash('flip')}
                  </div>
                </div>
              </div>
            </div>

            {/* Back of card */}
            <div className="absolute inset-0 backface-hidden" style={{ transform: 'rotateY(180deg)' }}>
              <div className="h-full bg-surface-1 rounded-xl shadow-2xl p-8 flex flex-col justify-center border border-accent">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-accent mb-3">
                      {t('practices')}
                    </h3>
                    <ul className="space-y-2">
                      {(messages.quiz?.[principle.messageKey]?.practices || []).map((practice: string, index: number) => (
                        <li key={index} className="flex items-start text-t2">
                          <CheckIcon className="w-4 h-4 text-accent mr-3 mt-1 flex-shrink-0" />
                          <span className="text-sm">{practice}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-t1 mb-3">
                      {t('antiPatterns')}
                    </h3>
                    <ul className="space-y-2">
                      {(messages.quiz?.[principle.messageKey]?.antiPatterns || []).map((pattern: string, index: number) => (
                        <li key={index} className="flex items-start text-t2">
                          <CrossIcon className="w-4 h-4 text-danger mr-3 mt-1 flex-shrink-0" />
                          <span className="text-sm">{pattern}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="text-center mt-6 text-sm text-t3">
                  {tFlash('flipBack')}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Navigation */}
      {showNavigation && (
        <div className="flex justify-between items-center">
          <button
            onClick={onPrevious}
            className="px-6 py-3 bg-surface-2 hover:bg-surface-3 rounded-full text-t2 transition-all duration-200 font-medium"
          >
            {tFlash('previous')}
          </button>
          
          <div className="text-sm text-t3 font-medium">
            {tFlash('principleOf', { current: principle.id, total: 12 })}
          </div>
          
          <button
            onClick={onNext}
            disabled={!isFlipped}
            className={`px-6 py-3 rounded-full transition-all duration-200 font-medium shadow-lg ${
 isFlipped
 ? 'bg-accent-solid hover:bg-accent-hover text-accent-on cursor-pointer'
 : 'bg-surface-3 text-t3 cursor-not-allowed opacity-50'
 }`}
          >
            {tFlash('next')}
          </button>
        </div>
      )}
    </div>
  );
}