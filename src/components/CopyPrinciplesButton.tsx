'use client';

import { useState, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { DocumentDuplicateIcon, CheckIcon } from '@heroicons/react/24/outline';
import { generatePrinciplesMarkdown } from '@/utils/generatePrinciplesMarkdown';

interface CopyPrinciplesButtonProps {
  /** Whether to show only icon (for mobile) or icon + text (for desktop) */
  iconOnly?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * A button component that copies all 12 principles as Markdown to clipboard.
 * Features:
 * - Responsive design (icon-only on mobile, icon + text on desktop)
 * - Visual feedback on copy success/failure
 * - Bilingual support (EN/ZH)
 * - Smooth animations
 */
export default function CopyPrinciplesButton({
  iconOnly = false,
  className = ''
}: CopyPrinciplesButtonProps) {
  const t = useTranslations('common');
  const locale = useLocale();
  const [copyStatus, setCopyStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [messages, setMessages] = useState<Record<string, unknown> | null>(null);

  // Load all messages for markdown generation
  useEffect(() => {
    async function loadMessages() {
      try {
        const loadedMessages = await import(`@/messages/${locale}/core.json`);
        setMessages(loadedMessages.default || loadedMessages);
      } catch (error) {
        console.error('Failed to load messages:', error);
      }
    }
    loadMessages();
  }, [locale]);

  const handleCopy = async () => {
    if (!messages) {
      setCopyStatus('error');
      setTimeout(() => setCopyStatus('idle'), 2000);
      return;
    }

    try {
      const markdown = generatePrinciplesMarkdown(messages, locale);
      await navigator.clipboard.writeText(markdown);

      // Success feedback
      setCopyStatus('success');
      setTimeout(() => setCopyStatus('idle'), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);

      // Error feedback
      setCopyStatus('error');
      setTimeout(() => setCopyStatus('idle'), 2000);
    }
  };

  // Determine button label based on status
  const getButtonLabel = () => {
    if (copyStatus === 'success') return t('copied');
    if (copyStatus === 'error') return t('copyFailed');
    return iconOnly ? t('copyPrinciplesShort') : t('copyPrinciples');
  };

  // Determine button styles based on status
  const getButtonStyles = () => {
    const baseStyles = 'flex items-center text-sm font-medium transition-all duration-200';

    if (copyStatus === 'success') {
      return `${baseStyles} text-green-600 dark:text-green-400`;
    }
    if (copyStatus === 'error') {
      return `${baseStyles} text-red-600 dark:text-red-400`;
    }
    return `${baseStyles} text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100`;
  };

  return (
    <button
      onClick={handleCopy}
      disabled={copyStatus !== 'idle' || !messages}
      className={`${getButtonStyles()} ${className} disabled:opacity-50 disabled:cursor-not-allowed`}
      aria-label={t('copyPrinciples')}
      title={t('copyPrinciples')}
    >
      {copyStatus === 'success' ? (
        <CheckIcon className="h-4 w-4 animate-scale-in" />
      ) : (
        <DocumentDuplicateIcon className="h-4 w-4" />
      )}
      {!iconOnly && (
        <span className={`ml-2 ${copyStatus !== 'idle' ? 'animate-fade-in' : ''}`}>
          {getButtonLabel()}
        </span>
      )}
    </button>
  );
}
