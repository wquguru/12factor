'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { 
  PlayIcon, 
  ArrowPathIcon, 
  LightBulbIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

type UIArchetype = 'basic' | 'role' | 'template' | 'structured' | 'few-shot' | 'chaining';

interface UIConfig {
  archetype?: UIArchetype;
  allowSystemPrompt?: boolean;
  allowTemplate?: boolean;
  allowPrefill?: boolean;
  allowChaining?: boolean;
  expectedFormat?: 'xml' | 'json' | null;
  showExamplesPane?: boolean;
}

interface PromptExample {
  id: string;
  title: string;
  description: string;
  systemPrompt?: string;
  userPrompt: string;
  expectedOutput: string;
  hints: string[];
  variations: {
    name: string;
    prompt: string;
    systemPrompt?: string;
    explanation: string;
  }[];
  ui?: UIConfig;
}

interface InteractivePromptEditorProps {
  example: PromptExample;
  mode?: 'playground' | 'practice';
  ui?: PromptExample['ui'];
}

export default function InteractivePromptEditor({ example, mode = 'practice', ui }: InteractivePromptEditorProps) {
  const tBase = useTranslations('promptEngineering');
  
  // Custom translation function to handle double brackets
  const t = useCallback((key: string) => {
    try {
      const translated = tBase.raw(key);
      // Check if translation contains double brackets (literal text)
      if (typeof translated === 'string' && translated.includes('{{') && translated.includes('}}')) {
        // Return the raw string without processing as template
        return translated;
      }
      // Otherwise use normal translation
      return tBase(key);
    } catch {
      // Fallback to key if translation fails
      return key;
    }
  }, [tBase]);
  const [systemPrompt, setSystemPrompt] = useState(mode === 'practice' ? '' : (example.systemPrompt || ''));
  const [userPrompt, setUserPrompt] = useState(mode === 'practice' ? '' : example.userPrompt);
  const [promptTemplate, setPromptTemplate] = useState(mode === 'practice' ? '' : example.userPrompt);
  const [templateVariables, setTemplateVariables] = useState<Record<string, string>>({});
  const [hasTemplateVariables, setHasTemplateVariables] = useState(false);
  const [prefill, setPrefill] = useState('');
  const [currentOutput, setCurrentOutput] = useState('');
  const [formatCheck, setFormatCheck] = useState<{ kind: 'xml' | 'json' | null; status: 'valid' | 'invalid' | null; message?: string }>({ kind: null, status: null });
  const [isRunning, setIsRunning] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [selectedVariation, setSelectedVariation] = useState<number | null>(null);
  const [analysisResult, setAnalysisResult] = useState<'good' | 'needs-improvement' | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [chainMode, setChainMode] = useState(false);
  const [conversation, setConversation] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([]);
  const [showAdvancedControls, setShowAdvancedControls] = useState(false);

  const providedUI: UIConfig | undefined = example.ui || ui;

  const resolvedUI = useMemo<UIConfig>(() => {
    const templateRegex = /\{\{[^}]+\}\}/;
    const containsTemplate = templateRegex.test(example.userPrompt);
    const containsXml = /<[A-Za-z][\w:-]*>/.test(example.userPrompt);
    const mentionsJson = example.userPrompt.toLowerCase().includes('json') || example.description.toLowerCase().includes('json');
    const mentionsChain = (example.title + example.description).toLowerCase().includes('chain');

    const base: UIConfig = {
      showExamplesPane: example.variations.length > 0,
      allowSystemPrompt: Boolean(example.systemPrompt || example.variations.some(v => v.systemPrompt !== undefined)),
      allowTemplate: containsTemplate,
      allowPrefill: containsXml || mentionsJson,
      expectedFormat: containsXml ? 'xml' : mentionsJson ? 'json' : null,
      allowChaining: mentionsChain
    };

    const merged: UIConfig = { ...base };

    if (providedUI) {
      if (providedUI.archetype !== undefined) merged.archetype = providedUI.archetype;
      if (providedUI.allowSystemPrompt !== undefined) merged.allowSystemPrompt = providedUI.allowSystemPrompt;
      if (providedUI.allowTemplate !== undefined) merged.allowTemplate = providedUI.allowTemplate;
      if (providedUI.allowPrefill !== undefined) merged.allowPrefill = providedUI.allowPrefill;
      if (providedUI.allowChaining !== undefined) merged.allowChaining = providedUI.allowChaining;
      if (providedUI.expectedFormat !== undefined) merged.expectedFormat = providedUI.expectedFormat;
      if (providedUI.showExamplesPane !== undefined) merged.showExamplesPane = providedUI.showExamplesPane;
    }

    return merged;
  }, [example.description, example.systemPrompt, example.title, example.userPrompt, example.variations, providedUI]);

  // Extract template variables from a prompt
  const extractTemplateVariables = (prompt: string): string[] => {
    const matches = prompt.match(/\{\{([^}]+)\}\}/g);
    return matches ? matches.map(match => match.slice(2, -2)) : [];
  };

  // Replace template variables in prompt
  const replaceTemplateVariables = (template: string, variables: Record<string, string>): string => {
    let result = template;
    Object.entries(variables).forEach(([key, value]) => {
      result = result.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), value);
    });
    return result;
  };

  // Update template variables when prompt template changes
  const updateTemplateVariables = useCallback((template: string) => {
    const variables = extractTemplateVariables(template);
    const hasVars = variables.length > 0;
    setHasTemplateVariables(hasVars);
    
    if (hasVars) {
      setTemplateVariables(prev => {
        const newVariables: Record<string, string> = {};
        variables.forEach(variable => {
          // Keep existing values if variable already exists
          newVariables[variable] = prev[variable] || '';
        });
        return newVariables;
      });
    } else {
      setTemplateVariables({});
    }
  }, []);

  // Update prompts when example changes (e.g., when navigating between cards)
  useEffect(() => {
    setSystemPrompt(mode === 'practice' ? '' : (example.systemPrompt || ''));
    setPromptTemplate(mode === 'practice' ? '' : example.userPrompt);
    setPrefill('');
    setConversation([]);
    setChainMode(resolvedUI.allowChaining ?? false);
    setFormatCheck({ kind: null, status: null });
    setShowAdvancedControls(false);

    // Check for template variables in the initial prompt
    const initialTemplate = mode === 'practice' ? '' : example.userPrompt;
    updateTemplateVariables(initialTemplate);

    // Set initial user prompt
    setUserPrompt(mode === 'practice' ? '' : example.userPrompt);
    setCurrentOutput('');
    setAnalysisResult(null);
    setSelectedVariation(null);
    setError(null);
  }, [example.id, example.systemPrompt, example.userPrompt, mode, resolvedUI.allowChaining, updateTemplateVariables]);

  // Update user prompt when template or variables change
  useEffect(() => {
    if (hasTemplateVariables) {
      const replacedPrompt = replaceTemplateVariables(promptTemplate, templateVariables);
      setUserPrompt(replacedPrompt);
    } else {
      // If no template variables, user prompt is the same as template
      setUserPrompt(promptTemplate);
    }
  }, [promptTemplate, templateVariables, hasTemplateVariables]);


  // Use LLM to evaluate prompt quality based on the actual output
  const evaluateWithLLM = async (output: string, systemPrompt: string, userPrompt: string, context?: string): Promise<'good' | 'needs-improvement'> => {
    try {
      // Truncate long content to avoid API limits
      const truncatedOutput = output.length > 800 ? output.substring(0, 800) + '...' : output;
      const truncatedUserPrompt = userPrompt.length > 200 ? userPrompt.substring(0, 200) + '...' : userPrompt;
      
      const evaluationPrompt = `评估AI输出质量。
任务: ${context || '通用任务'}
用户要求: ${truncatedUserPrompt}
AI输出: ${truncatedOutput}

输出是否符合要求? 回答 "good" 或 "needs-improvement"`;
      
      const response = await fetch('/api/llm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          systemPrompt: '',
          userPrompt: evaluationPrompt,
          mode: 'evaluation'
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to evaluate with LLM');
      }

      const evaluation = data.response.trim().toLowerCase();
      return evaluation.includes('good') ? 'good' : 'needs-improvement';
      
    } catch (error) {
      console.error('LLM evaluation failed:', error);
      throw error; // Re-throw error instead of falling back
    }
  };


  const runPrompt = async () => {
    setIsRunning(true);
    setCurrentOutput('');
    setError(null);
    
    try {
      const trimmedUserPrompt = userPrompt.trim();

      const response = await fetch('/api/llm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          systemPrompt: systemPrompt || undefined,
          userPrompt: trimmedUserPrompt,
          prefill: prefill || undefined,
          history: chainMode ? conversation : undefined,
          mode: mode
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to get response from AI');
      }
      
      setCurrentOutput(data.response);
      
      if (chainMode) {
        setConversation(prev => [...prev, { role: 'user', content: trimmedUserPrompt }, { role: 'assistant', content: data.response }]);
      }
      
      // Get context from the current example for evaluation
      const currentContext = `${example.title}: ${example.description}`;
      
      // Use LLM evaluation
      try {
        const evaluation = await evaluateWithLLM(data.response, systemPrompt, trimmedUserPrompt, currentContext);
        setAnalysisResult(evaluation);
      } catch (evaluationError) {
        console.error('Evaluation failed:', evaluationError);
        setError(t('evaluationError'));
        setAnalysisResult(null);
      }
      
    } catch (error) {
      console.error('Error calling LLM API:', error);
      
      if (error instanceof Error) {
        if (error.message.includes('Rate limit')) {
          setError(t('rateLimitError'));
        } else if (error.message.includes('Service temporarily unavailable')) {
          setError(t('serviceUnavailableError'));
        } else {
          setError(t('generalError'));
        }
      } else {
        setError(t('generalError'));
      }
      
      // No fallback - just show the error
      setCurrentOutput('');
    } finally {
      setIsRunning(false);
    }
  };

  const resetToExample = () => {
    setSystemPrompt(mode === 'practice' ? '' : (example.systemPrompt || ''));
    const initialTemplate = mode === 'practice' ? '' : example.userPrompt;
    setPromptTemplate(initialTemplate);
    updateTemplateVariables(initialTemplate);
    setUserPrompt(mode === 'practice' ? '' : example.userPrompt);
    setPrefill('');
    setConversation([]);
    setChainMode(false);
    setCurrentOutput('');
    setAnalysisResult(null);
    setFormatCheck({ kind: null, status: null });
    setSelectedVariation(null);
    setError(null);
  };

  const applyVariation = (index: number) => {
    const variation = example.variations[index];
    setSelectedVariation(index);
    
    // In practice mode, don't auto-fill inputs - let user practice from scratch
    if (mode !== 'practice') {
      setPromptTemplate(variation.prompt);
      updateTemplateVariables(variation.prompt);
      
      // Update system prompt if variation has one, otherwise keep original
      if (variation.systemPrompt !== undefined) {
        setSystemPrompt(variation.systemPrompt);
      }
    }
    setPrefill('');
    setConversation([]);
    
    setCurrentOutput('');
    setAnalysisResult(null);
    setFormatCheck({ kind: null, status: null });
  };

  // Validate output format when it changes
  useEffect(() => {
    if (!currentOutput || !resolvedUI.expectedFormat) {
      setFormatCheck(prev => ({ ...prev, status: null, kind: resolvedUI.expectedFormat || null }));
      return;
    }
    if (resolvedUI.expectedFormat === 'json') {
      try {
        JSON.parse(currentOutput);
        setFormatCheck({ kind: 'json', status: 'valid' });
      } catch (e) {
        const errorMessage = e instanceof Error ? e.message : 'JSON parse error';
        setFormatCheck({ kind: 'json', status: 'invalid', message: errorMessage });
      }
    } else if (resolvedUI.expectedFormat === 'xml') {
      try {
        if (typeof DOMParser === 'undefined') {
          setFormatCheck({ kind: 'xml', status: null });
          return;
        }
        const parser = new DOMParser();
        const doc = parser.parseFromString(currentOutput, 'application/xml');
        const parseError = doc.querySelector('parsererror');
        if (parseError) {
          setFormatCheck({ kind: 'xml', status: 'invalid', message: parseError.textContent || 'XML parse error' });
        } else {
          setFormatCheck({ kind: 'xml', status: 'valid' });
        }
      } catch (e) {
        const errorMessage = e instanceof Error ? e.message : 'XML parse error';
        setFormatCheck({ kind: 'xml', status: 'invalid', message: errorMessage });
      }
    }
  }, [currentOutput, resolvedUI.expectedFormat]);

  return (
    <div className="border border-stone-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 bg-gradient-to-r from-[#98a971]/10 to-[#98a971]/5 border-b border-stone-200 dark:border-gray-700">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              {example.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {example.description}
            </p>
          </div>
          <button
            onClick={() => setShowHints(!showHints)}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-[#98a971] hover:bg-[#98a971]/10 rounded-lg transition-colors"
          >
            <LightBulbIcon className="h-4 w-4" />
            {showHints ? t('hideHints') : t('showHints')}
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* Hints */}
        {showHints && (
          <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg">
            <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-3">
              💡 {t('learningTips')}
            </h4>
            <ul className="space-y-2">
              {example.hints.map((hint, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-yellow-700 dark:text-yellow-200">
                  <span className="text-yellow-600 dark:text-yellow-400 mt-0.5">•</span>
                  {hint}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Prompt Variations */}
        {example.variations.length > 0 && (resolvedUI.showExamplesPane ?? true) && (
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
              📝 {t('tryDifferentVariations')}
            </h4>
            <div className="grid gap-2 md:grid-cols-2">
              {example.variations.map((variation, index) => (
                <button
                  key={index}
                  onClick={() => applyVariation(index)}
                  className={`p-3 text-left border rounded-lg transition-colors ${
                    selectedVariation === index
                      ? 'border-[#98a971] bg-[#98a971]/5 text-gray-900 dark:text-gray-100'
                      : 'border-gray-200 dark:border-gray-700 hover:border-[#98a971]/50 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <div className="font-medium text-sm mb-1">{variation.name}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{variation.explanation}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Editor */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* Input */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                🎯 {t('editPrompt')}
              </h4>
              <button
                type="button"
                onClick={() => setShowAdvancedControls(prev => !prev)}
                className="text-xs text-[#98a971] hover:text-[#7a8259]"
              >
                {showAdvancedControls ? (t('hideAdvancedControls') || 'Hide advanced') : (t('showAdvancedControls') || 'Show advanced')}
              </button>
            </div>
            
            {/* System Prompt - show if exercise has one or if any variation has one */}
            {((resolvedUI.allowSystemPrompt ?? false) || showAdvancedControls || !!systemPrompt) && (
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('systemPrompt')}
                </label>
                <textarea
                  value={systemPrompt}
                  onChange={(e) => setSystemPrompt(e.target.value)}
                  placeholder={t('systemPromptPlaceholder')}
                  disabled={selectedVariation !== null && example.variations[selectedVariation]?.systemPrompt === ''}
                  className={`w-full h-20 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#98a971] focus:border-transparent resize-none ${
                    selectedVariation !== null && example.variations[selectedVariation]?.systemPrompt === ''
                      ? 'bg-gray-100 dark:bg-gray-700 cursor-not-allowed opacity-60'
                      : 'bg-white dark:bg-gray-800'
                  }`}
                />
              </div>
            )}

            {/* Prefill - Optional assistant seed to force opening tokens */}
            {((resolvedUI.allowPrefill ?? false) || showAdvancedControls || !!prefill) && (
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('prefillLabel') || 'Prefill (optional)'}
                </label>
                <textarea
                  value={prefill}
                  onChange={(e) => setPrefill(e.target.value)}
                  placeholder={t('prefillPlaceholder') || '<answer>'}
                  className="w-full h-16 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#98a971] focus:border-transparent resize-none font-mono"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {t('prefillHint') || 'Seed the assistant reply (e.g., start within XML/JSON tags).'}
                </p>
              </div>
            )}

            {/* Prompt Template - Always show, but label changes based on template variables */}
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                {hasTemplateVariables ? t('promptTemplate') : t('userPrompt')}
              </label>
              <textarea
                value={promptTemplate}
                onChange={(e) => {
                  setPromptTemplate(e.target.value);
                  updateTemplateVariables(e.target.value);
                }}
                placeholder={hasTemplateVariables ? t('promptTemplatePlaceholder') : t('userPromptPlaceholder')}
                className={`w-full h-24 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#98a971] focus:border-transparent resize-none ${
                  hasTemplateVariables ? 'font-mono' : ''
                }`}
              />
              {hasTemplateVariables && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {t('templateHint')}
                </p>
              )}
            </div>

            {/* Template Variables - Only show when template variables exist */}
            {((resolvedUI.allowTemplate ?? false) || showAdvancedControls) && hasTemplateVariables && Object.keys(templateVariables).length > 0 && (
              <div className="space-y-3">
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
                  {t('templateVariables')}
                </label>
                {Object.entries(templateVariables).map(([variable, value]) => {
                  const isLongText = /DOCUMENT|HISTORY|EMAIL|TEXT|CODE|RESEARCH|CONTEXT|DATA|ARTICLE|PASSAGE|CONTENT|MESSAGE|INPUT/i.test(variable) || value.length > 120;
                  return (
                    <div key={variable}>
                      <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
                        {variable}
                      </label>
                      {isLongText ? (
                        <textarea
                          rows={6}
                          value={value}
                          onChange={(e) => {
                            setTemplateVariables(prev => ({
                              ...prev,
                              [variable]: e.target.value
                            }));
                          }}
                          placeholder={t('enterValue')}
                          className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#98a971] focus:border-transparent resize-y"
                        />
                      ) : (
                        <input
                          type="text"
                          value={value}
                          onChange={(e) => {
                            setTemplateVariables(prev => ({
                              ...prev,
                              [variable]: e.target.value
                            }));
                          }}
                          placeholder={t('enterValue')}
                          className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#98a971] focus:border-transparent"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Final Prompt Preview - Only show when template variables exist and are filled */}
            {hasTemplateVariables && Object.keys(templateVariables).length > 0 && (
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('finalPrompt')}
                </label>
                <textarea
                  value={userPrompt}
                  readOnly
                  className="w-full h-20 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 cursor-default resize-none"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {t('finalPromptHint')}
                </p>
              </div>
            )}

            {/* Controls */}
            <div className="space-y-3">
              {/* Chain mode toggle */}
              {((resolvedUI.allowChaining ?? false) || showAdvancedControls) && (
                <>
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-xs font-medium text-gray-700 dark:text-gray-300">
                      <input
                        type="checkbox"
                        checked={chainMode}
                        onChange={(e) => {
                          setChainMode(e.target.checked);
                          if (!e.target.checked) setConversation([]);
                        }}
                        className="w-4 h-4 text-[#98a971] border-gray-300 rounded focus:ring-1 focus:ring-[#98a971]"
                      />
                      {t('chainModeLabel') || 'Chaining mode (keep conversation)'}
                    </label>
                    <button
                      onClick={() => setConversation([])}
                      disabled={!conversation.length}
                      className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 disabled:opacity-50"
                    >
                      {t('clearConversation') || 'Clear'}
                    </button>
                  </div>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400">
                    {t('chainModeHint') || 'When enabled, each run appends to the conversation and is sent along with the next prompt.'}
                  </p>
                </>
              )}

              {/* Error Display */}
              {error && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg">
                  <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
                </div>
              )}
              
              <div className="flex gap-2">
                <button
                  onClick={runPrompt}
                  disabled={isRunning || !userPrompt.trim()}
                  className="flex items-center gap-2 px-4 py-2 bg-[#98a971] text-white rounded-lg hover:bg-[#7a8259] disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
                >
                  {isRunning ? (
                    <ArrowPathIcon className="h-4 w-4 animate-spin" />
                  ) : (
                    <PlayIcon className="h-4 w-4" />
                  )}
                  {isRunning ? t('running') : t('runPrompt')}
                </button>
                
                <button
                  onClick={resetToExample}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm"
                >
                  {t('reset')}
                </button>
              </div>
            </div>

            {chainMode && (
              <div className="border border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-3">
                <h5 className="text-xs font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  {t('conversationHistory') || 'Conversation history'}
                </h5>
                <div className="max-h-48 overflow-y-auto space-y-2">
                  {conversation.length === 0 && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {t('emptyConversation') || 'No previous turns yet.'}
                    </p>
                  )}
                  {conversation.map((msg, index) => (
                    <div
                      key={`${msg.role}-${index}`}
                      className={`p-2 rounded-lg text-xs whitespace-pre-wrap ${
                        msg.role === 'user'
                          ? 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
                          : 'bg-[#f5f9f0] dark:bg-gray-700 border border-[#98a971]/40'
                      }`}
                    >
                      <div className="text-[10px] uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1">
                        {msg.role === 'user' ? t('userTurn') || 'User' : t('assistantTurn') || 'Assistant'}
                      </div>
                      {msg.content}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Output */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                🤖 {t('aiResponse')}
              </h4>
              {analysisResult && (
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                  analysisResult === 'good'
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                    : 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
                }`}>
                  {analysisResult === 'good' ? (
                    <CheckCircleIcon className="h-3 w-3" />
                  ) : (
                    <ExclamationTriangleIcon className="h-3 w-3" />
                  )}
                  {analysisResult === 'good' ? t('goodPromptQuality') : t('canImprove')}
                </div>
              )}
              {formatCheck.kind && formatCheck.status && (
                <div
                  className={`ml-2 px-2 py-1 rounded-full text-[11px] ${
                    formatCheck.status === 'valid'
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
                      : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                  }`}
                >
                  {formatCheck.status === 'valid'
                    ? `${formatCheck.kind?.toUpperCase()} ${t('formatValid') || 'format valid'}`
                    : `${formatCheck.kind?.toUpperCase()} ${t('formatInvalid') || 'format invalid'}`}
                </div>
              )}
            </div>
            {formatCheck.status === 'invalid' && formatCheck.message && (
              <p className="text-xs text-red-500 dark:text-red-300 mb-2">
                {formatCheck.message}
              </p>
            )}
            
            <div className="h-48 p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-y-auto">
              {isRunning ? (
                <div className="flex items-center justify-center h-full">
                  <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
                    <ArrowPathIcon className="h-5 w-5 animate-spin" />
                    <span className="text-sm">{t('aiThinking')}</span>
                  </div>
                </div>
              ) : currentOutput ? (
                <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {currentOutput}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400 dark:text-gray-500 text-sm">
                  {t('clickRunPrompt')}
                </div>
              )}
            </div>
            {chainMode && currentOutput && (
              <button
                onClick={() => {
                  setPromptTemplate(currentOutput);
                  updateTemplateVariables(currentOutput);
                  setUserPrompt(currentOutput);
                }}
                className="mt-3 inline-flex items-center gap-2 text-xs text-[#98a971] hover:text-[#7a8259]"
              >
                {t('useAsNextPrompt') || 'Use response as next prompt'}
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
