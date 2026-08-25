'use client';

import { useState } from 'react';
import { DocumentDuplicateIcon, CheckIcon } from '@heroicons/react/24/outline';

interface CodeExampleProps {
  title: string;
  code: string;
  explanation?: string;
  language?: string;
}

export default function CodeExample({ title, code, explanation, language = 'python' }: CodeExampleProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="border border-line rounded-lg bg-surface-1 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 bg-surface-2 border-b border-line">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium text-t1">
            {title}
          </h4>
          <button
            onClick={copyToClipboard}
            className="inline-flex items-center gap-1.5 px-2 py-1 text-xs text-t2 hover:text-t1 transition-colors"
          >
            {copied ? (
              <>
                <CheckIcon className="h-3 w-3" />
                已复制
              </>
            ) : (
              <>
                <DocumentDuplicateIcon className="h-3 w-3" />
                复制
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Block */}
      <div className="relative">
        <pre className="p-4 overflow-x-auto text-sm">
          <code className={`language-${language} text-t1 `}>
            {code}
          </code>
        </pre>
      </div>

      {/* Explanation */}
      {explanation && (
        <div className="px-4 py-3 bg-surface-2 border-t border-line">
          <p className="text-sm text-t2 leading-relaxed">
            {explanation}
          </p>
        </div>
      )}
    </div>
  );
}