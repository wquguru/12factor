'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ExerciseData } from '@/types';
import { CheckCircleIcon, XCircleIcon, LightBulbIcon } from '@heroicons/react/24/outline';

interface ExerciseSectionProps {
  exercise: ExerciseData;
  exerciseNumber: number;
}

export default function ExerciseSection({ exercise, exerciseNumber }: ExerciseSectionProps) {
  const t = useTranslations('promptEngineering');
  const [userInput, setUserInput] = useState(exercise.template || '');
  const [showHints, setShowHints] = useState(false);
  const [validationResult, setValidationResult] = useState<'success' | 'error' | null>(null);
  const [validationMessage, setValidationMessage] = useState('');

  const validateInput = () => {
    if (!exercise.expectedPattern) {
      setValidationResult('success');
      setValidationMessage(t('exerciseCompleted'));
      return;
    }

    try {
      const regex = new RegExp(exercise.expectedPattern, 'i');
      const isValid = regex.test(userInput);
      
      if (isValid) {
        setValidationResult('success');
        setValidationMessage(t('exerciseCorrect'));
      } else {
        setValidationResult('error');
        setValidationMessage(t('exerciseIncorrect'));
      }
    } catch {
      setValidationResult('error');
      setValidationMessage(t('validationError'));
    }
  };

  const resetExercise = () => {
    setUserInput(exercise.template || '');
    setValidationResult(null);
    setValidationMessage('');
    setShowHints(false);
  };

  return (
    <div className="border border-line rounded-lg p-6 bg-surface-2">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-info-wash rounded-full flex items-center justify-center">
            <span className="text-info text-sm font-semibold">
              {exerciseNumber}
            </span>
          </div>
          <h4 className="text-lg font-medium text-t1">
            {t('exercise')} {exerciseNumber}
          </h4>
        </div>
        <button
          onClick={() => setShowHints(!showHints)}
          className="inline-flex items-center gap-2 text-sm text-info hover:underline transition-colors"
        >
          <LightBulbIcon className="h-4 w-4" />
          {showHints ? t('hideHints') : t('showHints')}
        </button>
      </div>

      {/* Instructions */}
      <div className="mb-6">
        <h5 className="text-sm font-medium text-t2 mb-2 uppercase tracking-wide">
          {t('instructions')}
        </h5>
        <p className="text-t2 leading-relaxed">
          {exercise.instructions}
        </p>
      </div>

      {/* Hints */}
      {showHints && exercise.hints && (Array.isArray(exercise.hints) ? exercise.hints.length > 0 : exercise.hints.length > 0) && (
        <div className="mb-6 p-4 bg-warn-wash border border-warn rounded-lg">
          <h5 className="text-sm font-medium text-warn mb-3 flex items-center gap-2">
            <LightBulbIcon className="h-4 w-4" />
            {t('hints')}
          </h5>
          <ul className="space-y-2">
            {(Array.isArray(exercise.hints) ? exercise.hints : [exercise.hints]).map((hint, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-warn rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-warn text-sm">{hint}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Input Area */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-t2 mb-3">
          {t('yourPrompt')}
        </label>
        <textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder={t('enterPromptHere')}
          className="w-full h-32 px-4 py-3 border border-line-control rounded-lg bg-surface-1 text-t1 focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
        />
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3 mb-4">
        <button
          onClick={validateInput}
          disabled={!userInput.trim()}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {t('checkAnswer')}
        </button>
        <button
          onClick={resetExercise}
          className="btn-secondary"
        >
          {t('reset')}
        </button>
      </div>

      {/* Validation Result */}
      {validationResult && (
        <div className={`p-4 rounded-lg flex items-start gap-3 ${
 validationResult === 'success' 
 ? 'bg-accent-wash border border-accent '
 : 'bg-danger-wash border border-danger '
 }`}>
          {validationResult === 'success' ? (
            <CheckCircleIcon className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
          ) : (
            <XCircleIcon className="h-5 w-5 text-danger flex-shrink-0 mt-0.5" />
          )}
          <div>
            <p className={`text-sm font-medium ${
 validationResult === 'success'
 ? 'text-accent '
 : 'text-danger '
 }`}>
              {validationMessage}
            </p>
            {validationResult === 'error' && (
              <p className="text-xs text-danger mt-1">
                {t('tryAgainWithHints')}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}