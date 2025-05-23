import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import vscDarkPlus from 'react-syntax-highlighter/dist/esm/styles/prism/vsc-dark-plus';

interface CopyableCodeBlockProps {
  language: string;
  children: string;
}

const CopyableCodeBlock: React.FC<CopyableCodeBlockProps> = ({ language, children }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(children).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }).catch(() => {
      setCopied(false);
    });
  };

  return (
    <div style={{ position: 'relative' }}>
      <div style={{
        position: 'absolute',
        top: '8px',
        right: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        zIndex: 10,
      }}>        {copied && (
          <span style={{
            backgroundColor: '#1e1e1e',
            color: '#fff',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '12px',
            animation: 'fadeIn 0.2s ease-in-out',
            border: '1px solid #333',
          }}>
            Copied code
          </span>
        )}
        <button
          onClick={handleCopy}
          title={copied ? 'Copied!' : 'Copy code'}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            margin: 0,
          }}
        >
          <img src="/copy.ico" alt="Copy" style={{ width: 20, height: 20 }} />
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{ borderRadius: '0.375rem', padding: '1rem', margin: '1rem 0' }}
        className="text-sm shadow-md max-w-full overflow-x-auto"
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
};

export default CopyableCodeBlock;
