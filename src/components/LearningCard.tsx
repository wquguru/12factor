'use client';

import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon, BookOpenIcon, BeakerIcon, CodeBracketIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';
import InteractivePromptEditor from './InteractivePromptEditor';

interface LearningContent {
  id: string;
  title: string;
  theory: string;
  coreConcepts?: string[];
  messageRules?: { title: string; content: string };
  systemPrompts?: { title: string; content: string };
  messageFormatting?: { title: string; content: string };
  multiTurnConversations?: { title: string; content: string };
  whySystemPrompts?: { title: string; content: string };
  // Chapter 2 specific core concepts
  directCommunication?: { title: string; content: string };
  specificityMatters?: { title: string; content: string };
  goldenRule?: { title: string; content: string };
  forcedChoices?: { title: string; content: string };
  // Chapter 3 specific core concepts
  roleContext?: { title: string; content: string };
  roleEffects?: { title: string; content: string };
  rolePromptLocation?: { title: string; content: string };
  detailMatters?: { title: string; content: string };
  examples: string[];
  keyTechniques?: string[];
  commonPitfalls?: string[];
  exercises?: Array<{
    id: string;
    instructions: string;
    template?: string;
    hints: string[];
  }>;
  practiceCount?: number;
}

interface PracticeContent {
  id: string;
  title: string;
  description: string;
  systemPrompt?: string;
  userPrompt?: string;
  variants: Array<{
    name: string;
    prompt: string;
    systemPrompt?: string;
    explanation: string;
  }>;
  expectedOutput: string;
  hints?: string[];
  ui?: {
    archetype?: 'basic' | 'role' | 'template' | 'structured' | 'few-shot' | 'chaining';
    allowSystemPrompt?: boolean;
    allowTemplate?: boolean;
    allowPrefill?: boolean;
    allowChaining?: boolean;
    expectedFormat?: 'xml' | 'json' | null;
    showExamplesPane?: boolean;
  };
}

interface PlaygroundContent {
  id: string;
  title: string;
  examples: Array<{
    name: string;
    prompt: string;
    systemPrompt?: string;
    description: string;
    variations?: Array<{
      name: string;
      prompt: string;
      systemPrompt?: string;
      explanation: string;
    }>;
    ui?: {
      archetype?: 'basic' | 'role' | 'template' | 'structured' | 'few-shot' | 'chaining';
      allowSystemPrompt?: boolean;
      allowTemplate?: boolean;
      allowPrefill?: boolean;
      allowChaining?: boolean;
      expectedFormat?: 'xml' | 'json' | null;
      showExamplesPane?: boolean;
    };
  }>;
  hints?: string[];
  variations?: Array<{
    name: string;
    prompt: string;
    systemPrompt?: string;
    explanation: string;
  }>;
  ui?: {
    archetype?: 'basic' | 'role' | 'template' | 'structured' | 'few-shot' | 'chaining';
    allowSystemPrompt?: boolean;
    allowTemplate?: boolean;
    allowPrefill?: boolean;
    allowChaining?: boolean;
    expectedFormat?: 'xml' | 'json' | null;
    showExamplesPane?: boolean;
  };
}

interface LearningCardProps {
  learningContent: LearningContent[];
  practiceContent: PracticeContent[];
  playgroundContent?: PlaygroundContent[];
  currentIndex: number;
  currentMode?: 'learning' | 'playground' | 'practice';
  onNext: () => void;
  onPrev: () => void;
  onModeChange?: (mode: 'learning' | 'playground' | 'practice') => void;
  canGoNext: boolean;
  canGoPrev: boolean;
}


export default function LearningCard({
  learningContent,
  practiceContent,
  playgroundContent = [],
  currentIndex,
  currentMode = 'learning',
  onNext,
  onPrev,
  onModeChange,
  canGoNext,
  canGoPrev
}: LearningCardProps) {
  const t = useTranslations('promptEngineering');
  const tRoot = useTranslations();
  const mode = currentMode;

  const currentLearningItem = learningContent[currentIndex];
  const currentPracticeItem = practiceContent[currentIndex];
  const currentPlaygroundItem = playgroundContent[currentIndex];
  
  // Use appropriate content length for navigation
  const totalItems = mode === 'practice' ? practiceContent.length : 
                    mode === 'playground' ? playgroundContent.length : 
                    learningContent.length;


  return (
    <div className="max-w-4xl mx-auto">
      {/* Mode Toggle */}
      <div className="flex justify-center mb-8">
        <div className="bg-surface-2 rounded-xl p-2 flex gap-2">
          <button
            onClick={() => onModeChange?.('learning')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
 mode === 'learning'
 ? 'bg-surface-1 shadow-sm text-accent'
 : 'text-t2 hover:text-t1'
 }`}
          >
            <BookOpenIcon className="h-4 w-4" />
            {t('learningMode')}
          </button>
          {playgroundContent.length > 0 && (
            <button
              onClick={() => onModeChange?.('playground')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
 mode === 'playground'
 ? 'bg-surface-1 shadow-sm text-accent'
 : 'text-t2 hover:text-t1'
 }`}
            >
              <CodeBracketIcon className="h-4 w-4" />
              {t('playgroundMode')}
            </button>
          )}
          <button
            onClick={() => onModeChange?.('practice')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
 mode === 'practice'
 ? 'bg-surface-1 shadow-sm text-accent'
 : 'text-t2 hover:text-t1'
 }`}
          >
            <BeakerIcon className="h-4 w-4" />
            {t('practiceMode')}
          </button>
        </div>
      </div>

      {/* Card Container */}
      <div 
        id="learning-card"
        className="bg-surface-1 rounded-3xl shadow-lg border border-line overflow-hidden"
      >
        {mode === 'learning' && currentLearningItem && (
          <div className="p-8">
            {/* Learning Content Header */}
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-accent-wash rounded-xl flex items-center justify-center">
                <BookOpenIcon className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h2 className="text-2xl font-medium text-t1 mb-2">
                  {currentLearningItem.title}
                </h2>
                <p className="text-sm text-accent font-medium">{t('learningContent')}</p>
              </div>
            </div>

            {/* Theory Section */}
            <div className="mb-8">
              {/* Primary Theory Content */}
              <div className="bg-accent-wash border border-accent rounded-xl p-6 mb-8">
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <p className="text-t2 leading-relaxed text-lg m-0">
                    {currentLearningItem.theory}
                  </p>
                </div>
              </div>

              {/* Core Concepts Section */}
              {currentLearningItem.coreConcepts && currentLearningItem.coreConcepts.length > 0 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-t1 mb-4 flex items-center gap-2">
                    <div className="w-1 h-5 bg-accent-solid rounded-full"></div>
                    {t('coreConceptsTitle')}
                  </h3>
                  
                  <div className="grid gap-4">
                    {currentLearningItem.coreConcepts.map((concept, index) => {
                      // Parse the concept to extract title and content
                      const parts = concept.split(' - ');
                      const titleMatch = parts[0]?.match(/\*\*(.+?)\*\*/);
                      const title = titleMatch ? titleMatch[1] : parts[0];
                      const content = parts.slice(1).join(' - ') || concept;
                      
                      return (
                        <div key={index} className="group border border-line rounded-lg p-4 hover:border-accent transition-colors">
                          <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-accent-solid rounded-full mt-2 flex-shrink-0"></div>
                            <div>
                              <h4 className="font-semibold text-accent mb-1">{title}</h4>
                              <p className="text-t2 leading-relaxed">{content}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Legacy Core Concepts Grid - for backward compatibility */}
              {!currentLearningItem.coreConcepts && (currentLearningItem.messageRules || currentLearningItem.systemPrompts || currentLearningItem.messageFormatting) && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-t1 mb-4 flex items-center gap-2">
                    <div className="w-1 h-5 bg-accent-solid rounded-full"></div>
                    {t('coreConceptsTitle')}
                  </h3>
                  
                  <div className="grid gap-4">
                    {currentLearningItem.messageRules && (
                      <div className="group border border-line rounded-lg p-4 hover:border-accent transition-colors">
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-accent-solid rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <h4 className="font-semibold text-accent mb-1">{currentLearningItem.messageRules.title}</h4>
                            <p className="text-t2 leading-relaxed">{currentLearningItem.messageRules.content}</p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {currentLearningItem.systemPrompts && (
                      <div className="group border border-line rounded-lg p-4 hover:border-accent transition-colors">
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-accent-solid rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <h4 className="font-semibold text-accent mb-1">{currentLearningItem.systemPrompts.title}</h4>
                            <p className="text-t2 leading-relaxed">{currentLearningItem.systemPrompts.content}</p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {currentLearningItem.messageFormatting && (
                      <div className="group border border-line rounded-lg p-4 hover:border-accent transition-colors">
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-accent-solid rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <h4 className="font-semibold text-accent mb-1">{currentLearningItem.messageFormatting.title}</h4>
                            <p className="text-t2 leading-relaxed">{currentLearningItem.messageFormatting.content}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  
                  {currentLearningItem.directCommunication && (
                    <div className="group border border-line rounded-lg p-4 hover:border-accent transition-colors">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-accent-solid rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <h4 className="font-semibold text-accent mb-1">{currentLearningItem.directCommunication.title}</h4>
                          <p className="text-t2 leading-relaxed">{currentLearningItem.directCommunication.content}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {currentLearningItem.specificityMatters && (
                    <div className="group border border-line rounded-lg p-4 hover:border-accent transition-colors">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-accent-solid rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <h4 className="font-semibold text-accent mb-1">{currentLearningItem.specificityMatters.title}</h4>
                          <p className="text-t2 leading-relaxed">{currentLearningItem.specificityMatters.content}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {currentLearningItem.goldenRule && (
                    <div className="group border border-line rounded-lg p-4 hover:border-accent transition-colors">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-accent-solid rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <h4 className="font-semibold text-accent mb-1">{currentLearningItem.goldenRule.title}</h4>
                          <p className="text-t2 leading-relaxed">{currentLearningItem.goldenRule.content}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {currentLearningItem.forcedChoices && (
                    <div className="group border border-line rounded-lg p-4 hover:border-accent transition-colors">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-accent-solid rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <h4 className="font-semibold text-accent mb-1">{currentLearningItem.forcedChoices.title}</h4>
                          <p className="text-t2 leading-relaxed">{currentLearningItem.forcedChoices.content}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {currentLearningItem.roleContext && (
                    <div className="group border border-line rounded-lg p-4 hover:border-accent transition-colors">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-accent-solid rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <h4 className="font-semibold text-accent mb-1">{currentLearningItem.roleContext.title}</h4>
                          <p className="text-t2 leading-relaxed">{currentLearningItem.roleContext.content}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {currentLearningItem.roleEffects && (
                    <div className="group border border-line rounded-lg p-4 hover:border-accent transition-colors">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-accent-solid rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <h4 className="font-semibold text-accent mb-1">{currentLearningItem.roleEffects.title}</h4>
                          <p className="text-t2 leading-relaxed">{currentLearningItem.roleEffects.content}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {currentLearningItem.rolePromptLocation && (
                    <div className="group border border-line rounded-lg p-4 hover:border-accent transition-colors">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-accent-solid rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <h4 className="font-semibold text-accent mb-1">{currentLearningItem.rolePromptLocation.title}</h4>
                          <p className="text-t2 leading-relaxed">{currentLearningItem.rolePromptLocation.content}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {currentLearningItem.detailMatters && (
                    <div className="group border border-line rounded-lg p-4 hover:border-accent transition-colors">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-accent-solid rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <h4 className="font-semibold text-accent mb-1">{currentLearningItem.detailMatters.title}</h4>
                          <p className="text-t2 leading-relaxed">{currentLearningItem.detailMatters.content}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              )}

              {/* Additional Concepts */}
              {(currentLearningItem.multiTurnConversations || currentLearningItem.whySystemPrompts) && (
                <div className="mt-8 space-y-4">
                  <h3 className="text-lg font-semibold text-t1 mb-4 flex items-center gap-2">
                    <div className="w-1 h-5 bg-accent-wash rounded-full"></div>
                    扩展说明
                  </h3>
                  
                  <div className="space-y-3">
                    {currentLearningItem.multiTurnConversations && (
                      <details className="group">
                        <summary className="flex items-center gap-3 cursor-pointer text-t2 hover:text-accent transition-colors p-3 border border-line rounded-lg">
                          <div className="w-1.5 h-1.5 bg-surface-3 rounded-full group-open:bg-accent-solid transition-colors"></div>
                          <span className="font-medium">{currentLearningItem.multiTurnConversations.title}</span>
                          <ChevronRightIcon className="w-4 h-4 ml-auto group-open:rotate-90 transition-transform" />
                        </summary>
                        <div className="mt-3 pl-6 pr-3 pb-3">
                          <p className="text-t2 leading-relaxed text-sm">
                            {currentLearningItem.multiTurnConversations.content}
                          </p>
                        </div>
                      </details>
                    )}
                    
                    {currentLearningItem.whySystemPrompts && (
                      <details className="group">
                        <summary className="flex items-center gap-3 cursor-pointer text-t2 hover:text-accent transition-colors p-3 border border-line rounded-lg">
                          <div className="w-1.5 h-1.5 bg-surface-3 rounded-full group-open:bg-accent-solid transition-colors"></div>
                          <span className="font-medium">{currentLearningItem.whySystemPrompts.title}</span>
                          <ChevronRightIcon className="w-4 h-4 ml-auto group-open:rotate-90 transition-transform" />
                        </summary>
                        <div className="mt-3 pl-6 pr-3 pb-3">
                          <p className="text-t2 leading-relaxed text-sm">
                            {currentLearningItem.whySystemPrompts.content}
                          </p>
                        </div>
                      </details>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Key Techniques and Common Pitfalls as Collapsible Sections under Core Concepts */}
            {(currentLearningItem.keyTechniques || currentLearningItem.commonPitfalls) && (
              <div className="mt-6 space-y-3">
                {/* Key Techniques Collapsible */}
                {currentLearningItem.keyTechniques && Array.isArray(currentLearningItem.keyTechniques) && (
                  <details className="group">
                    <summary className="flex items-center gap-3 cursor-pointer text-t2 hover:text-accent transition-colors p-4 border border-line rounded-lg">
                      <div className="w-1.5 h-1.5 bg-surface-3 rounded-full group-open:bg-accent-solid transition-colors"></div>
                      <span className="font-medium text-base">{t('keyTechniquesTitle')}</span>
                      <ChevronRightIcon className="w-4 h-4 ml-auto group-open:rotate-90 transition-transform" />
                    </summary>
                    <div className="mt-3 px-6 pb-4">
                      <div className="grid gap-2">
                        {currentLearningItem.keyTechniques.map((technique, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 bg-accent-wash0 rounded-full mt-2 flex-shrink-0"></div>
                            <p className="text-t2 text-sm">{technique.startsWith('courses.') ? tRoot(technique) : technique}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </details>
                )}

                {/* Common Pitfalls Collapsible */}
                {currentLearningItem.commonPitfalls && Array.isArray(currentLearningItem.commonPitfalls) && (
                  <details className="group">
                    <summary className="flex items-center gap-3 cursor-pointer text-t2 hover:text-accent transition-colors p-4 border border-line rounded-lg">
                      <div className="w-1.5 h-1.5 bg-surface-3 rounded-full group-open:bg-accent-solid transition-colors"></div>
                      <span className="font-medium text-base">{t('commonPitfallsTitle')}</span>
                      <ChevronRightIcon className="w-4 h-4 ml-auto group-open:rotate-90 transition-transform" />
                    </summary>
                    <div className="mt-3 px-6 pb-4">
                      <div className="grid gap-2">
                        {currentLearningItem.commonPitfalls.map((pitfall, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 bg-warn-wash0 rounded-full mt-2 flex-shrink-0"></div>
                            <p className="text-t2 text-sm">{pitfall.startsWith('courses.') ? tRoot(pitfall) : pitfall}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </details>
                )}
              </div>
            )}

            {/* Examples Section - Styled like Core Concepts */}
            <div className="mt-8 mb-6">
              <h3 className="text-lg font-semibold text-t1 mb-4 flex items-center gap-2">
                <div className="w-1 h-5 bg-accent-solid rounded-full"></div>
                {t('promptExamples')}
              </h3>
              <div className="grid gap-4">
                {(Array.isArray(currentLearningItem.examples) ? currentLearningItem.examples : []).map((example, exIndex) => (
                  <div key={exIndex} className="group border border-line rounded-lg p-4 hover:border-accent transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-accent-solid rounded-full mt-2 flex-shrink-0"></div>
                      <code className="text-sm text-t2 leading-relaxed block">
                        {example}
                      </code>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Exercises Section */}
            {!!(currentLearningItem.practiceCount && currentLearningItem.practiceCount > 0) && (
              <div className="border-t border-line pt-6">
                <h3 className="text-lg font-medium text-t1 mb-4">
                  {t('practicalExercises')} ({currentLearningItem.practiceCount} {t('exercises')})
                </h3>
                <div className="space-y-4">
                  {currentLearningItem.exercises?.map((exercise) => (
                    <div key={exercise.id} className="bg-accent-wash rounded-xl p-6 border border-accent">
                      <div className="flex items-center gap-2 mb-4">
                        <h5 className="font-medium text-accent text-lg">
                          {t(exercise.instructions)}
                        </h5>
                        {exercise.hints && (
                          <div className="relative group">
                            <button className="text-accent hover:text-accent-hover transition-colors">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                              </svg>
                            </button>
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-t1 text-bg text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 w-80 max-w-xs">
                              <div className="space-y-2">
                                {(typeof exercise.hints === 'string' ? [t(exercise.hints)] : exercise.hints).map((hint, hintIndex) => (
                                  <div key={hintIndex} className="flex items-start gap-2">
                                    <span className="text-accent mt-1 text-xs flex-shrink-0">▶</span>
                                    <span className="leading-relaxed text-xs">{hint}</span>
                                  </div>
                                ))}
                              </div>
                              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-t1"></div>
                            </div>
                          </div>
                        )}
                      </div>
                      {exercise.template && (
                        <div className="bg-surface-1 rounded-lg p-4 border border-line">
                          <code className="text-sm text-t2 block">
                            {typeof exercise.template === 'string' && exercise.template.includes('.') ? t(exercise.template) : exercise.template}
                          </code>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {mode === 'playground' && currentPlaygroundItem && (
          <div className="p-8">
            {/* Playground Content Header */}
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-accent-wash rounded-xl flex items-center justify-center">
                <CodeBracketIcon className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h2 className="text-2xl font-medium text-t1 mb-2">
                  {currentPlaygroundItem.title}
                </h2>
                <p className="text-sm text-accent font-medium">{t('experimentalPlayground')}</p>
              </div>
            </div>

            {/* Playground Examples */}
            <div className="space-y-6">
              {currentPlaygroundItem.examples.map((example, exIndex) => (
                <div key={exIndex} className="mb-6">
                  <InteractivePromptEditor 
                    example={{
                      id: `${currentPlaygroundItem.id}-${exIndex}`,
                      title: example.name,
                      description: example.description,
                      systemPrompt: example.systemPrompt || '',
                      userPrompt: example.prompt,
                      expectedOutput: '',
                      hints: currentPlaygroundItem.hints || [],
                      variations: example.variations || currentPlaygroundItem.variations || [],
                      ui: example.ui || currentPlaygroundItem.ui
                    }}
                    ui={example.ui || currentPlaygroundItem.ui}
                    mode="playground"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {mode === 'practice' && currentPracticeItem && (
          <div className="p-8">
            {/* Practice Content Header */}
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-accent-wash rounded-xl flex items-center justify-center">
                <BeakerIcon className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h2 className="text-2xl font-medium text-t1 mb-2">
                  {currentPracticeItem.title}
                </h2>
                <p className="text-sm text-accent font-medium">{t('interactiveExercise')}</p>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <p className="text-t2 leading-relaxed">
                {currentPracticeItem.description}
              </p>
            </div>

            {/* Interactive Editor */}
            <InteractivePromptEditor 
              example={{
                id: currentPracticeItem.id,
                title: currentPracticeItem.title,
                description: currentPracticeItem.description,
                systemPrompt: currentPracticeItem.systemPrompt || '',
                userPrompt: currentPracticeItem.userPrompt || 'Enter your prompt here...',
                expectedOutput: currentPracticeItem.expectedOutput,
                hints: currentPracticeItem.hints || [],
                variations: (currentPracticeItem.variants || []).map(variant => ({
                  name: variant.name,
                  prompt: variant.prompt || '',
                  systemPrompt: variant.systemPrompt,
                  explanation: variant.explanation
                })),
                ui: currentPracticeItem.ui
              }}
              ui={currentPracticeItem.ui}
              mode="practice"
            />
          </div>
        )}

        {/* Navigation */}
        <div className="border-t border-line px-8 py-6">
          <div className="flex justify-between items-center">
            <button
              onClick={onPrev}
              disabled={!canGoPrev}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
 canGoPrev
 ? 'text-accent hover:bg-accent-wash'
 : 'text-t3 cursor-not-allowed'
 }`}
            >
              <ChevronLeftIcon className="h-4 w-4" />
              {t('previous')}
            </button>

            <div className="flex items-center gap-2">
              <span className="text-sm text-t2">
                {currentIndex + 1} / {totalItems}
              </span>
            </div>

            <button
              onClick={onNext}
              disabled={!canGoNext}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
 canGoNext
 ? 'text-accent hover:bg-accent-wash'
 : 'text-t3 cursor-not-allowed'
 }`}
            >
              {t('next')}
              <ChevronRightIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
