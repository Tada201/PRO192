import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import vscDarkPlus from 'react-syntax-highlighter/dist/esm/styles/prism/vsc-dark-plus';
import { Clipboard, CheckCheck, X } from 'lucide-react';

interface CopyableCodeBlockProps {
  language: string;
  children: string;
}

const CopyableCodeBlock: React.FC<CopyableCodeBlockProps> = ({ language, children }) => {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCopy = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      setError(true);
      setTimeout(() => setError(false), 2000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCopy();
    }
  };

  return (
    <div className="relative group" role="region" aria-label="Code block">
      <div 
        className="absolute right-4 top-4 flex items-center gap-2"
        role="toolbar" 
        aria-label="Code actions"
      >
        {copied && (
          <span 
            role="status"
            className="text-sm bg-green-600 text-white px-3 py-1.5 rounded-md shadow-lg
                      animate-fade-in-out flex items-center gap-1.5"
          >
            <CheckCheck className="w-4 h-4" />
            Copied!
          </span>
        )}
        {error && (
          <span 
            role="alert"
            className="text-sm bg-red-600 text-white px-3 py-1.5 rounded-md shadow-lg
                      animate-fade-in-out flex items-center gap-1.5"
          >
            <X className="w-4 h-4" />
            Failed to copy
          </span>
        )}
        <button
          onClick={handleCopy}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          className="p-2 rounded-md bg-gray-700/90 hover:bg-gray-600 focus:bg-gray-600 
                     transition-all duration-200 outline-none focus:ring-2 
                     focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800
                     disabled:opacity-50 disabled:cursor-not-allowed
                     shadow-sm hover:shadow-md active:shadow-inner"
          title={copied ? 'Copied!' : 'Copy code to clipboard'}
          aria-label={copied ? 'Code copied to clipboard' : 'Copy code to clipboard'}
          aria-live="polite"
        >
          {copied ? (
            <CheckCheck className="w-5 h-5 text-green-400" />
          ) : (
            <Clipboard className="w-5 h-5 text-gray-200" />
          )}
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{
          borderRadius: '0.5rem',
          padding: '1.25rem',
          paddingRight: '4.5rem',
          margin: '1rem 0',
          backgroundColor: '#1e1e1e',
        }}
        className="text-sm shadow-lg focus-within:ring-2 focus-within:ring-blue-500 
                   overflow-x-auto"
        role="textbox"
        aria-label={`Code example in ${language}`}
        aria-readonly="true"
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
};

export default CopyableCodeBlock;
