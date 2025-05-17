import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeHighlighterProps {
    code: string;
    language: string;
    showLineNumbers?: boolean;
    minHeight?: string;
    maxHeight?: string;
}

const CodeHighlighter: React.FC<CodeHighlighterProps> = ({
    code,
    language,
    showLineNumbers = true,
    minHeight = '60px',
    maxHeight = 'none'
}) => {
    const [copySuccess, setCopySuccess] = useState<boolean>(false);

    // Map common language names to their Prism.js identifiers
    const mapLanguage = (lang: string): string => {
        const langMap: Record<string, string> = {
            'js': 'javascript',
            'ts': 'typescript',
            'py': 'python',
            'rb': 'ruby',
            'go': 'go',
            'java': 'java',
            'c': 'c',
            'cpp': 'cpp',
            'cs': 'csharp',
            'php': 'php',
            'html': 'html',
            'css': 'css',
            'scss': 'scss',
            'jsx': 'jsx',
            'tsx': 'tsx',
            'json': 'json',
            'yaml': 'yaml',
            'md': 'markdown',
            'sql': 'sql',
            'sh': 'bash',
            'bash': 'bash',
            'shell': 'bash',
        };

        // Normalize language name
        const normalizedLang = lang.toLowerCase().trim();
        return langMap[normalizedLang] || normalizedLang;
    };

    // Count the lines to determine if we should apply a minimum height
    const lineCount = code.split('\n').length;
    const shouldApplyMinHeight = lineCount <= 2;

    const handleCopyClick = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopySuccess(true);

            // Reset the success message after 2 seconds
            setTimeout(() => {
                setCopySuccess(false);
            }, 2000);
        } catch (err) {
            console.error('Failed to copy code: ', err);
        }
    };

    return (
        <div className="code-highlighter-wrapper" style={{
            position: 'relative',
            borderRadius: '6px',
            overflow: 'hidden'
        }}>
            <button
                onClick={handleCopyClick}
                style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    zIndex: 10,
                    backgroundColor: copySuccess ? '#28a745' : '#343a40',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '4px 8px',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s ease',
                    opacity: 0.8,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.8'; }}
            >
                {copySuccess ? (
                    <>
                        <span style={{ fontSize: '1rem' }}>✓</span>
                        <span>Copied!</span>
                    </>
                ) : (
                    <>
                        <span style={{ fontSize: '1rem' }}>📋</span>
                        <span>Copy</span>
                    </>
                )}
            </button>

            <SyntaxHighlighter
                language={mapLanguage(language)}
                style={vscDarkPlus}
                showLineNumbers={showLineNumbers}
                wrapLines={true}
                customStyle={{
                    borderRadius: '6px',
                    fontSize: '0.95rem',
                    overflow: 'auto',
                    marginBottom: 0,
                    padding: '1rem',
                    minHeight: shouldApplyMinHeight ? minHeight : 'auto',
                    maxHeight: maxHeight !== 'none' ? maxHeight : 'none',
                    display: 'flex',
                    alignItems: shouldApplyMinHeight ? 'center' : 'flex-start',
                }}
                codeTagProps={{
                    style: {
                        display: 'block',
                        width: '100%'
                    }
                }}
            >
                {code}
            </SyntaxHighlighter>
        </div>
    );
};

export default CodeHighlighter;
